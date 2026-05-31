const {
  calculateDailyCalories,
  buildRecommendationList,
  buildWorkoutFocus,
  describeGoal,
} = require('../utils/fitness')
const { readState, updateState } = require('./storageService')

const defaultModel = process.env.AI_MODEL || 'gpt-4o-mini'
const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
const apiKey = process.env.AI_API_KEY || ''

async function callProvider(messages) {
  if (!apiKey) {
    return null
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
      },
      body: JSON.stringify({
        model: defaultModel,
        messages,
        temperature: Number(process.env.AI_TEMPERATURE || 0.7),
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

  if (lastError) {
    console.warn(lastError.message)
  }

  return null
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

function buildWorkoutFallback(input) {
  const goal = describeGoal(input.goal || input.profile?.goal)
  const focus = buildWorkoutFocus(input.goal || input.profile?.goal)
  const days = Number(input.availableDays || 4)
  const equipment = String(input.availableEquipment || 'Bodyweight and dumbbells')

  return [
    `Workout Plan for ${goal}`,
    `Primary focus: ${focus}.`,
    `Training days: ${days}.`,
    `Equipment: ${equipment}.`,
    '',
    'Weekly outline:',
    `1. Day 1 - Lower body strength and core`,
    `2. Day 2 - Upper body push/pull`,
    `3. Day 3 - Conditioning and mobility`,
    `4. Day 4 - Full-body hypertrophy`,
    '',
    'Coaching notes:',
    '- Progress load by 2-5% when sets feel controlled.',
    '- Keep 1-2 reps in reserve on compound lifts.',
    '- Finish every session with 5-10 minutes of mobility.',
  ].join('\n')
}

function buildMealFallback(input) {
  const calories = Number(input.caloriesTarget || calculateDailyCalories(input.profile))
  const goal = describeGoal(input.goal || input.profile?.goal)
  const preference = String(input.dietaryPreference || 'Balanced').trim()

  return [
    `Meal Plan for ${goal}`,
    `Daily calorie target: ${calories} kcal.`,
    `Dietary preference: ${preference}.`,
    '',
    'Suggested structure:',
    '- Breakfast: protein-rich oats with fruit and seeds.',
    '- Lunch: lean protein bowl with grains and vegetables.',
    '- Snack: Greek yogurt or a plant-based alternative with berries.',
    '- Dinner: salmon, chicken, tofu, or beans with vegetables and carbs.',
    '',
    'Nutrition reminders:',
    '- Protein at each meal helps preserve muscle.',
    '- Hydrate throughout the day and adjust intake around training.',
  ].join('\n')
}

async function chatWithCoach({ message, profile }) {
  const prompt = String(message || '').trim()

  if (!prompt) {
    const error = new Error('Message is required')
    error.statusCode = 400
    throw error
  }

  const response = await retryProvider([
    { role: 'system', content: buildSystemPrompt(profile) },
    { role: 'user', content: prompt },
  ])

  const reply = response || [
    'Here is a practical coaching answer based on your profile and request.',
    '',
    `Estimated daily calories: ${calculateDailyCalories(profile)} kcal.`,
    `Goal focus: ${describeGoal(profile?.goal)}.`,
    '',
    'Recommended next step: keep your next training session simple, repeatable, and measurable.',
  ].join('\n')

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
  const prompt = [
    `Goal: ${input.goal || input.profile?.goal || 'General Fitness'}`,
    `Experience: ${input.workoutExperience || 'Beginner'}`,
    `Available days: ${input.availableDays || 4}`,
    `Equipment: ${input.availableEquipment || 'Bodyweight'}`,
  ].join('\n')

  const response = await retryProvider([
    { role: 'system', content: 'Generate a structured workout plan with headings, weekly split, and coaching notes.' },
    { role: 'user', content: prompt },
  ])

  const plan = response || buildWorkoutFallback(input)

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
  const prompt = [
    `Weight: ${input.weight || input.profile?.weight || 'unknown'}`,
    `Goal: ${input.goal || input.profile?.goal || 'General Fitness'}`,
    `Dietary preference: ${input.dietaryPreference || 'Balanced'}`,
    `Calories target: ${input.caloriesTarget || 'calculate for me'}`,
  ].join('\n')

  const response = await retryProvider([
    { role: 'system', content: 'Generate a practical meal plan with breakfast, lunch, snack, dinner, and nutrition notes.' },
    { role: 'user', content: prompt },
  ])

  const plan = response || buildMealFallback(input)

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