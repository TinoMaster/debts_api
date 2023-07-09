const UserController = require('../controllers/user.controllers')
const hashPassword = require('../helpers/password.hash')
const UserService = () => {}

UserService.get_all = (req, res, next) => {
  UserController.get_all((err, docs) => {
    err ? next(err) : res.json({ succes: true, data: docs })
  })
}

UserService.createUser = async (req, res, next) => {
  const passwordHash = await hashPassword(req.body.password)
  const user = {
    ...req.body,
    password: passwordHash
  }
  UserController.createUser(user, (err, docs) => {
    err ? next(err) : res.json({ succes: true, data: docs })
  })
}

module.exports = UserService
