function getActivityMultiplier(activityLevel = 'moderately active') {
  const normalized = String(activityLevel).toLowerCase()

  if (normalized.includes('sedentary')) return 1.2
  if (normalized.includes('light')) return 1.375
  if (normalized.includes('very')) return 1.725
  if (normalized.includes('athlete')) return 1.9

  return 1.55
}

function calculateDailyCalories(profile = {}) {
  const weight = Number(profile.weight || 70)
  const height = Number(profile.height || 170)
  const age = Number(profile.age || 30)
  const gender = String(profile.gender || 'male').toLowerCase()

  const baseMetabolism = gender.includes('female')
    ? 10 * weight + 6.25 * height - 5 * age - 161
    : 10 * weight + 6.25 * height - 5 * age + 5

  const calories = Math.round(baseMetabolism * getActivityMultiplier(profile.activityLevel))

  return calories > 0 ? calories : 2000
}

function describeGoal(goal = 'General Fitness') {
  const normalized = String(goal).toLowerCase()

  if (normalized.includes('loss')) return 'Weight loss'
  if (normalized.includes('muscle')) return 'Muscle gain'

  return 'General fitness'
}

function buildRecommendationList(profile = {}) {
  const goal = describeGoal(profile.goal)
  const calories = calculateDailyCalories(profile)

  return [
    `${goal} focus: aim for ${goal === 'Weight loss' ? 'a modest calorie deficit' : 'consistent progressive overload'}.`,
    `Daily calorie estimate: about ${calories} kcal based on your profile.`,
    `Activity level: ${profile.activityLevel || 'moderately active'}; keep recovery aligned with your training load.`,
  ]
}

function buildWorkoutFocus(goal = 'General Fitness') {
  const normalized = String(goal).toLowerCase()

  if (normalized.includes('loss')) return 'Circuit training with conditioning finishers'
  if (normalized.includes('muscle')) return 'Upper/lower split with hypertrophy volume'

  return 'Balanced full-body training with mobility work'
}

module.exports = {
  calculateDailyCalories,
  buildRecommendationList,
  buildWorkoutFocus,
  describeGoal,
}