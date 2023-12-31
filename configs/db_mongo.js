require('dotenv').config()

const { DB, DB_TEST, NODE_ENV, /* HOSTLOCAL */ HOSTPRODUCTION } = process.env

const config = {
  mongoHost: HOSTPRODUCTION,
  mongoDb: NODE_ENV === 'test' ? DB_TEST : DB
}

module.exports = config
