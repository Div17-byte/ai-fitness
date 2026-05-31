const { profileService } = require('../services/profileService')

async function getProfile(req, res, next) {
  try {
    const profile = await profileService.getProfile()
    res.json({ profile })
  } catch (error) {
    next(error)
  }
}

async function saveProfile(req, res, next) {
  try {
    const profile = await profileService.saveProfile(req.body)
    res.status(201).json({ profile })
  } catch (error) {
    next(error)
  }
}

module.exports = { getProfile, saveProfile }