require('dotenv').config()

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY_CUBBIT, BUCKECT_NAME, BUCKECT_NAME_KEY } = process.env

const cubbitConfig = {
  bucketName: BUCKECT_NAME,
  bucketNameKey: BUCKECT_NAME_KEY,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY_CUBBIT
}

module.exports = cubbitConfig
