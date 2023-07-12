const checkApiKey = (error, req, res, next) => {
  const apiKey = req.headers.api
  if (apiKey === '123') {
    next()
  } else next(error)
}

module.exports = { checkApiKey }
