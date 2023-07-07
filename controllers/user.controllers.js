const UserModel = require('../models/users.model')
const UserController = () => {}

UserController.get_all = (cb) => {
  UserModel.find()
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

module.exports = UserController
