const UserModel = require('../models/users.model')
const ContactsUser = () => {}

ContactsUser.sentContactRequest = async (idReq, username, cb) => {
  try {
    const reciever = await UserModel.find({ username })
    const sender = await UserModel.find({ _id: idReq })
    console.log(reciever, sender)
  } catch (error) {
    cb(error, null)
  }
}

module.exports = ContactsUser
