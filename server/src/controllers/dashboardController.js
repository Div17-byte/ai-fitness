const { dashboardService } = require('../services/dashboardService')

async function getDashboard(req, res, next) {
  try {
    const dashboard = await dashboardService.getDashboard()
    res.json(dashboard)
  } catch (error) {
    next(error)
  }
}

module.exports = { getDashboard }