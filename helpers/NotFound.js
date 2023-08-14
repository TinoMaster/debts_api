const notFound = (err, req, res, next) => {
  res.status(err.status).json({ error: true, message: err.message })
}

module.exports = notFound
