const UserController = require('../controllers/user.controllers')
const UserService = () => {}

UserService.get_all = (req, res, next) => {
  UserController.get_all((err, docs) => {
    err ? next(err) : res.json({ succes: true, data: docs })
  })
}

module.exports = UserService
