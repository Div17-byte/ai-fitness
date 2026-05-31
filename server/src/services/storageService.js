const fs = require('fs/promises')
const path = require('path')

const stateFilePath = path.join(__dirname, '..', 'data', 'state.json')

async function ensureStateFile() {
  try {
    await fs.access(stateFilePath)
  } catch (_error) {
    const initialState = {
      profile: null,
      chatHistory: [],
      workoutPlans: [],
      mealPlans: [],
    }

    await fs.mkdir(path.dirname(stateFilePath), { recursive: true })
    await fs.writeFile(stateFilePath, JSON.stringify(initialState, null, 2), 'utf8')
  }
}

async function readState() {
  await ensureStateFile()
  const raw = await fs.readFile(stateFilePath, 'utf8')
  return JSON.parse(raw)
}

async function writeState(nextState) {
  await ensureStateFile()
  await fs.writeFile(stateFilePath, JSON.stringify(nextState, null, 2), 'utf8')
  return nextState
}

async function updateState(updater) {
  const currentState = await readState()
  const nextState = await updater(currentState)
  return writeState(nextState)
}

module.exports = { readState, writeState, updateState }