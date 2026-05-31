function notFound(_req, res) {
  res.status(404).json({ message: 'Route not found' })
}

function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || error.status || 500
  res.status(status).json({
    message: error.message || 'Unexpected server error',
    details: process.env.NODE_ENV === 'production' ? undefined : error.details,
  })
}

module.exports = { notFound, errorHandler }