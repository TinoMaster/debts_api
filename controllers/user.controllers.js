const UserModel = require('../models/users.model')
const UserController = () => {}

UserController.get_all = (cb) => {
  UserModel.find()
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

UserController.createUser = (user, cb) => {
  UserModel.create(user)
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

UserController.contactRequest = async (idRequester, idReciever, cb) => {
  try {
    const existUser1 = await UserModel.findOne({ _id: idRequester })
    const existUser2 = await UserModel.findOne({ _id: idReciever })
    if (existUser1 && existUser2) {
      const userRequester = await UserModel.findOneAndUpdate(
        { _id: idRequester },
        { $push: { contactRequestsSent: { user: idRequester } } },
        { new: true }
      )
      const userReciever = await UserModel.findOneAndUpdate(
        { _id: idReciever },
        { $push: { contactRequestsReceived: { user: idReciever } } },
        { new: true }
      )
      const docs = { userReciever, userRequester }
      cb(null, docs)
    }
  } catch (error) {
    cb(error, null)
  }
}

module.exports = UserController
