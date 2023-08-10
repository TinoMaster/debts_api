const UserController = require('../controllers/user.controllers')
const hashPassword = require('../helpers/password.hash')
const UserService = () => {}

UserService.get_all = (req, res, next) => {
  UserController.get_all((err, docs) => {
    if (err) {
      res.status(400).json({ error: true, message: 'bad request' })
      next(err)
    } else res.json({ succes: true, data: docs })
  })
}

UserService.createUser = async (req, res, next) => {
  const passwordHash = await hashPassword(req.body.password)
  const user = {
    ...req.body,
    password: passwordHash
  }
  UserController.createUser(user, (err, docs) => {
    if (err) {
      res.status(422).json({ error: true, message: 'bad request' })
      next(err)
    } else res.status(201).json({ succes: true, data: docs })
  })
}

UserService.contactRequest = (req, res, next) => {
  const { idRequester, idReciever } = req.body
  if (!idRequester || !idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else if (idRequester === idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else {
    UserController.contactRequest(idRequester, idReciever, (err, docs) => {
      if (err) {
        res.status(422).json({ error: true, message: 'bad request' })
        next(err)
      } else res.status(201).json({ success: true, message: 'peticion enviada', data: docs })
    })
  }
}

UserService.acceptFriendRequest = (req, res, next) => {
  const { idRequester, idReciever, response } = req.body
  if (!idRequester || !idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else if (idRequester === idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else {
    UserController.acceptFriendRequest(idRequester, idReciever, response, (err, docs) => {
      if (err) {
        res.status(422).json({ error: true, message: 'bad request' })
        next(err)
      } else res.status(201).json({ success: true, message: 'Amistad aceptada', data: docs })
    })
  }
}

module.exports = UserService
