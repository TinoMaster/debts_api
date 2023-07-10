const notFound = (err, req, res, next) => {
  res.status(err.status).send({ error: err })
}

module.exports = notFound
