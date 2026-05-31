const { aiService } = require('../services/aiService')
const { profileService } = require('../services/profileService')

async function chat(req, res, next) {
  try {
    const { message } = req.body || {}
    const profile = await profileService.getProfile()
    const response = await aiService.chatWithCoach({ message, profile })
    res.json(response)
  } catch (error) {
    next(error)
  }
}

async function workout(req, res, next) {
  try {
    const profile = await profileService.getProfile()
    const response = await aiService.generateWorkoutPlan({ ...req.body, profile })
    res.json(response)
  } catch (error) {
    next(error)
  }
}

async function mealPlan(req, res, next) {
  try {
    const profile = await profileService.getProfile()
    const response = await aiService.generateMealPlan({ ...req.body, profile })
    res.json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = { chat, workout, mealPlan }