const UserModel = require('../models/users.model')
const verifyPassword = require('../helpers/password.verify')
const tokenSign = require('../helpers/token-sign')
const LoginController = () => {}

LoginController.login = async (data, cb) => {
  const { email, password } = data
  const error = { error: true, message: 'Este no cuenta' }
  if (!email || !password) return cb(error, null)
  try {
    const user = await UserModel.find({ email })
    const isMatch = await verifyPassword(password, user[0].password)
    if (isMatch) {
      const dataToSign = {
        _id: user[0]._id,
        name: user[0].name
      }
      const token = tokenSign(dataToSign)
      cb(null, { user, token })
    } else cb(error, null)
  } catch (err) {
    cb(err, null)
  }
}

module.exports = LoginController
