const { readState, updateState } = require('./storageService')

function normalizeProfile(profile = {}) {
  return {
    name: String(profile.name || '').trim(),
    age: Number(profile.age || 0),
    gender: String(profile.gender || '').trim(),
    height: Number(profile.height || 0),
    weight: Number(profile.weight || 0),
    goal: String(profile.goal || 'General Fitness').trim(),
    activityLevel: String(profile.activityLevel || 'Moderately active').trim(),
  }
}

async function getProfile() {
  const state = await readState()
  return state.profile
}

async function saveProfile(profile) {
  const normalizedProfile = normalizeProfile(profile)

  if (!normalizedProfile.name) {
    const error = new Error('Name is required')
    error.statusCode = 400
    throw error
  }

  const state = await updateState((currentState) => ({
    ...currentState,
    profile: normalizedProfile,
  }))

  return state.profile
}

module.exports = { profileService: { getProfile, saveProfile }, normalizeProfile }