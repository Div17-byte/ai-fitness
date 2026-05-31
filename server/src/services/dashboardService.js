const { buildRecommendationList, calculateDailyCalories, describeGoal } = require('../utils/fitness')
const { readState } = require('./storageService')
const { aiService } = require('./aiService')

function summarizeProfile(profile) {
  if (!profile) {
    return null
  }

  return {
    name: profile.name,
    age: profile.age,
    gender: profile.gender,
    height: profile.height,
    weight: profile.weight,
    goal: profile.goal,
    activityLevel: profile.activityLevel,
  }
}

async function getDashboard() {
  const state = await readState()
  const profile = state.profile
  const latestPlans = await aiService.getLatestPlans()

  const calorieEstimate = calculateDailyCalories(profile || {})
  const recommendations = profile ? buildRecommendationList(profile) : ['Add your profile to generate personalized recommendations.']

  return {
    profile: summarizeProfile(profile),
    currentGoal: profile ? describeGoal(profile.goal) : 'General Fitness',
    dailyCalorieEstimate: calorieEstimate,
    aiRecommendations: recommendations,
    workoutPlan: latestPlans.workoutPlan ? latestPlans.workoutPlan.plan : 'Generate a workout plan to see it here.',
    mealPlan: latestPlans.mealPlan ? latestPlans.mealPlan.plan : 'Generate a meal plan to see it here.',
    recentActivity: {
      profileUpdatedAt: state.profile ? new Date().toISOString() : null,
      workoutPlanCount: state.workoutPlans.length,
      mealPlanCount: state.mealPlans.length,
      chatCount: state.chatHistory.length,
    },
  }
}

module.exports = { dashboardService: { getDashboard } }