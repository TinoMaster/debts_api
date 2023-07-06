require('dotenv').config();

const config = {
  mongoHost: process.env.HOST,
  mongoDb: process.env.DB,
};

module.exports = config;