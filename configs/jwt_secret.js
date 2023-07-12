require('dotenv').config()

const { JWT_KEY } = process.env

const config = {
  secret: JWT_KEY
}

module.exports = config
