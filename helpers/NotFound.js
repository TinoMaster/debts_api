const notFound = (err, req, res, next) => {
  console.log(err.name)
  res.status(err.status).send({ error: err })
}

module.exports = notFound
