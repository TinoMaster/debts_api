const UserModel = require('../models/users.model')
const UserController = () => {}

UserController.get_all = (cb) => {
  UserModel.find()
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

UserController.getContacts = async (id, cb) => {
  try {
    const user = await UserModel.findOne({ _id: id })
      .populate('contactRequestsSent.user', 'username name')
      .populate('contactRequestsReceived.user', 'username name')
      .populate('contacts.friend', 'username name')
    const contacts = user.contacts
    const contactRequestsSent = user.contactRequestsSent
    const contactRequestsReceived = user.contactRequestsReceived
    const docs = { contacts, contactRequestsReceived, contactRequestsSent }
    cb(null, docs)
  } catch (error) {
    cb(error, null)
  }
}

UserController.createUser = (user, cb) => {
  UserModel.create(user)
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

UserController.contactRequest = async (idRequester, username, cb) => {
  try {
    const existUser1 = await UserModel.findOne({ _id: idRequester })
    const existUser2 = await UserModel.findOne({ username })
    const isAlreadyARequest = existUser2?.contactRequestsReceived?.some((el) => el.user._id.toString() === idRequester)

    if (existUser1 && existUser2 && existUser1._id.toString() !== existUser2._id.toString() && !isAlreadyARequest) {
      const idReciever = existUser2._id
      const userRequester = await UserModel.findOneAndUpdate(
        { _id: idRequester },
        { $push: { contactRequestsSent: { user: idReciever } } },
        { new: true }
      )
      const userReciever = await UserModel.findOneAndUpdate(
        { _id: idReciever },
        { $push: { contactRequestsReceived: { user: idRequester } } },
        { new: true }
      )
      const docs = { userReciever, userRequester }
      cb(null, docs)
    } else throw new Error('bad requestttttttt')
  } catch (error) {
    cb(error, null)
  }
}

UserController.responseFriendRequest = async (idRequester, idReciever, response, cb) => {
  try {
    const existUser1 = await UserModel.findOne({ _id: idRequester })
    const existUser2 = await UserModel.findOne({ _id: idReciever })
    const existPet1 = existUser1.contactRequestsSent.some((obj) => obj.user.toString() === idReciever)
    const existPet2 = existUser2.contactRequestsReceived.some((obj) => obj.user.toString() === idRequester)
    if (existPet1 && existPet2) {
      if (response) {
        const userRequester = await UserModel.findOneAndUpdate(
          { _id: idRequester },
          { $pull: { contactRequestsSent: { user: idReciever } }, $push: { contacts: { friend: idReciever } } },
          { new: true }
        )
        const userReciever = await UserModel.findOneAndUpdate(
          { _id: idReciever },
          { $pull: { contactRequestsReceived: { user: idRequester } }, $push: { contacts: { friend: idRequester } } },
          { new: true }
        )
        const docs = { userRequester, userReciever }
        cb(null, docs)
      } else {
        const userRequester = await UserModel.findOneAndUpdate(
          { _id: idRequester },
          { $pull: { contactRequestsSent: { user: idReciever } } },
          { new: true }
        )
        const userReciever = await UserModel.findOneAndUpdate(
          { _id: idReciever },
          { $pull: { contactRequestsReceived: { user: idRequester } } },
          { new: true }
        )
        const docs = { userRequester, userReciever }
        cb(null, docs)
      }
    } else {
      const error = true
      cb(error, null)
    }
  } catch (error) {
    cb(error, null)
  }
}

UserController.deleteFriendRequest = async (idRequester, idReciever, cb) => {
  try {
    const existUser1 = await UserModel.findOne({ _id: idRequester })
    const existUser2 = await UserModel.findOne({ _id: idReciever })
    if (existUser1 && existUser2) {
      const userRequester = await UserModel.findOneAndUpdate(
        { _id: idRequester },
        { $pull: { contactRequestsSent: { user: idReciever } } },
        { new: true }
      )
      const userReciever = await UserModel.findOneAndUpdate(
        { _id: idReciever },
        { $pull: { contactRequestsReceived: { user: idRequester } } },
        { new: true }
      )
      const docs = { userRequester, userReciever }
      cb(null, docs)
    } else throw new Error('Bad request')
  } catch (error) {
    console.log(error)
    cb(error, null)
  }
}

UserController.deleteFriend = async (idRequester, idReciever, cb) => {
  try {
    const existUser1 = await UserModel.findOne({ _id: idRequester })
    const existUser2 = await UserModel.findOne({ _id: idReciever })
    const existPet1 = existUser1.contacts.some((obj) => obj.friend.toString() === idReciever)
    const existPet2 = existUser2.contacts.some((obj) => obj.friend.toString() === idRequester)
    if (existPet1 && existPet2) {
      const userRequester = await UserModel.findOneAndUpdate(
        { _id: idRequester },
        { $pull: { contacts: { friend: idReciever } } },
        { new: true }
      )
      const userReciever = await UserModel.findOneAndUpdate(
        { _id: idReciever },
        { $pull: { contacts: { friend: idRequester } } },
        { new: true }
      )
      const docs = { userRequester, userReciever }
      cb(null, docs)
    } else throw new Error('bad request')
  } catch (error) {
    cb(error, null)
  }
}

module.exports = UserController
