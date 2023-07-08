require('dotenv').config()

const { DB, DB_TEST, NODE_ENV } = process.env

const config = {
  mongoHost: process.env.HOST,
  mongoDb: NODE_ENV === 'test' ? DB_TEST : DB
}

module.exports = config
