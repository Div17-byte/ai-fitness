const express = require('express')
const { getProfile, saveProfile } = require('../controllers/profileController')

const profileRouter = express.Router()

profileRouter.get('/', getProfile)
profileRouter.post('/', saveProfile)

module.exports = { profileRouter }