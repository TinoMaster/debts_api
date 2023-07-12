const jwt = require('jsonwebtoken')
const { secret } = require('../configs/jwt_secret')

const signToken = (payload) => {
  return jwt.sign(payload, secret)
}

module.exports = signToken
