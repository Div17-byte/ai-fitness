const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')

const { aiRouter } = require('./routes/aiRoutes')
const { dashboardRouter } = require('./routes/dashboardRoutes')
const { profileRouter } = require('./routes/profileRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

dotenv.config()

function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '1mb' }))

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'ai-fitness-api' })
  })

  app.use('/api/profile', profileRouter)
  app.use('/api/ai', aiRouter)
  app.use('/api', dashboardRouter)

  app.use(notFound)
  app.use(errorHandler)

  return app
}

module.exports = { createApp }