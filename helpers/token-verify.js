const jwt = require('jsonwebtoken')
const { secret } = require('../configs/jwt_secret')

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

module.exports = verifyToken
