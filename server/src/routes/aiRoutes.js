const express = require('express')
const { chat, workout, mealPlan } = require('../controllers/aiController')

const aiRouter = express.Router()

aiRouter.post('/chat', chat)
aiRouter.post('/workout', workout)
aiRouter.post('/meal-plan', mealPlan)

module.exports = { aiRouter }