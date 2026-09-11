const { buildRecommendationList } = require('../utils/fitness')
const { readState, updateState } = require('./storageService')

const defaultModel = process.env.AI_MODEL || 'gpt-4o-mini'
const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
const apiKey = process.env.AI_API_KEY || ''
const siteUrl = process.env.AI_SITE_URL || 'http://localhost:5173'
const siteName = process.env.AI_SITE_NAME || 'AI Fitness Coach'

async function callProvider(messages) {
  if (!apiKey) {
    const error = new Error('AI_API_KEY is not configured')
    error.statusCode = 500
    throw error
  }

  const controller = new AbortController()
  const timeoutMs = Number(process.env.AI_TIMEOUT_MS || 15000)
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Required by OpenRouter for attribution; harmless for other OpenAI-compatible providers
        'HTTP-Referer': siteUrl,
        'X-Title': siteName,
      },
      body: JSON.stringify({
        model: defaultModel,
        messages,
        temperature: Number(process.env.AI_TEMPERATURE || 0.7),
        max_tokens: Number(process.env.AI_MAX_TOKENS || 4000),
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const details = await response.text()
      throw new Error(`AI provider request failed: ${response.status} ${details}`)
    }

    const payload = await response.json()
    const content = payload?.choices?.[0]?.message?.content

    return typeof content === 'string' && content.trim() ? content.trim() : null
  } finally {
    clearTimeout(timeoutId)
  }
}

async function retryProvider(messages, attempts = 2) {
  let lastError = null

  for (let attempt = 0; attempt <= attempts; attempt += 1) {
    try {
      const content = await callProvider(messages)
      if (content) {
        return content
      }
    } catch (error) {
      lastError = error
    }
  }

  const error = lastError || new Error('AI provider returned an empty response')
  error.statusCode = error.statusCode || 502
  throw error
}

function buildSystemPrompt(profile) {
  const profileSummary = profile
    ? `User profile: ${profile.name}, ${profile.age} years old, ${profile.gender}, ${profile.height} cm, ${profile.weight} kg, goal ${profile.goal}, activity level ${profile.activityLevel}.`
    : 'No user profile has been saved yet.'

  return [
    'You are AI Fitness Coach, a concise and practical fitness assistant.',
    'Return helpful, safe, actionable advice in a friendly tone.',
    'Prefer short sections and bullet points when appropriate.',
    profileSummary,
  ].join(' ')
}

async function chatWithCoach({ message, profile }) {
  const prompt = String(message || '').trim()

  if (!prompt) {
    const error = new Error('Message is required')
    error.statusCode = 400
    throw error
  }

  const reply = await retryProvider([
    { role: 'system', content: buildSystemPrompt(profile) },
    { role: 'user', content: prompt },
  ])

  const state = await updateState((currentState) => ({
    ...currentState,
    chatHistory: [
      ...currentState.chatHistory,
      { role: 'user', content: prompt, createdAt: new Date().toISOString() },
      { role: 'assistant', content: reply, createdAt: new Date().toISOString() },
    ].slice(-40),
  }))

  return { reply, history: state.chatHistory }
}

async function generateWorkoutPlan(input = {}) {
  const profile = input.profile
  const prompt = [
    `Goal: ${input.goal || profile?.goal || 'General Fitness'}`,
    `Experience: ${input.workoutExperience || 'Beginner'}`,
    `Available days: ${input.availableDays || 4}`,
    `Equipment: ${input.availableEquipment || 'Bodyweight'}`,
    `Age: ${profile?.age || 'unknown'}`,
    `Gender: ${profile?.gender || 'unknown'}`,
    `Height: ${profile?.height || 'unknown'} cm`,
    `Weight: ${profile?.weight || 'unknown'} kg`,
    `Activity level: ${profile?.activityLevel || 'unknown'}`,
  ].join('\n')

  const plan = await retryProvider([
    { role: 'system', content: `${buildSystemPrompt(profile)} Generate a structured workout plan with headings, weekly split, and coaching notes tailored to the user's age, height, and weight.` },
    { role: 'user', content: prompt },
  ])

  await updateState((currentState) => ({
    ...currentState,
    workoutPlans: [
      ...currentState.workoutPlans,
      { ...input, plan, createdAt: new Date().toISOString() },
    ].slice(-20),
  }))

  return { plan, goal: input.goal || input.profile?.goal || 'General Fitness' }
}

async function generateMealPlan(input = {}) {
  const profile = input.profile
  const prompt = [
    `Weight: ${input.weight || profile?.weight || 'unknown'} kg`,
    `Goal: ${input.goal || profile?.goal || 'General Fitness'}`,
    `Dietary preference: ${input.dietaryPreference || 'Balanced'}`,
    `Calories target: ${input.caloriesTarget || 'calculate for me'}`,
    `Age: ${profile?.age || 'unknown'}`,
    `Gender: ${profile?.gender || 'unknown'}`,
    `Height: ${profile?.height || 'unknown'} cm`,
    `Activity level: ${profile?.activityLevel || 'unknown'}`,
  ].join('\n')

  const plan = await retryProvider([
    { role: 'system', content: `${buildSystemPrompt(profile)} Generate a practical meal plan with breakfast, lunch, snack, dinner, and nutrition notes tailored to the user's age, height, and weight.` },
    { role: 'user', content: prompt },
  ])

  await updateState((currentState) => ({
    ...currentState,
    mealPlans: [
      ...currentState.mealPlans,
      { ...input, plan, createdAt: new Date().toISOString() },
    ].slice(-20),
  }))

  return { plan, goal: input.goal || input.profile?.goal || 'General Fitness' }
}

async function generateFitnessAdvice(profile) {
  const recommendations = buildRecommendationList(profile)

  return {
    reply: [
      'Fitness advice summary',
      ...recommendations.map((item) => `- ${item}`),
    ].join('\n'),
  }
}

async function getLatestPlans() {
  const state = await readState()
  return {
    workoutPlan: state.workoutPlans[state.workoutPlans.length - 1] || null,
    mealPlan: state.mealPlans[state.mealPlans.length - 1] || null,
  }
}

module.exports = {
  aiService: {
    chatWithCoach,
    generateWorkoutPlan,
    generateMealPlan,
    generateFitnessAdvice,
    getLatestPlans,
  },
}