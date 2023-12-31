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

UserService.getContacts = (req, res, next) => {
  const { id } = req.params
  UserController.getContacts(id, (error, docs) => {
    if (error) {
      res.status(401).json({ error: true, message: 'bad request' })
      next(error)
    } else res.status(201).json({ success: true, data: docs })
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

UserService.contactRequest = (req, res) => {
  const { idRequester, username } = req.body
  if (!idRequester || !username) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else {
    UserController.contactRequest(idRequester, username, (err, docs) => {
      if (err) {
        res.json({ error: true, message: 'bad request' })
      } else {
        res.status(201).json({ success: true, message: 'peticion enviada', data: docs })
      }
    })
  }
}

UserService.responseFriendRequest = (req, res, next) => {
  const { idRequester, idReciever, response } = req.body
  if (!idRequester || !idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else if (idRequester === idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else {
    UserController.responseFriendRequest(idRequester, idReciever, response, (err, docs) => {
      if (err) {
        res.status(422).json({ error: true, message: 'bad request' })
        next(err)
      } else {
        res.status(201).json({
          success: true,
          message: `Amistad ${response ? 'aceptada' : 'rechasada'}`,
          accept: response,
          data: docs
        })
      }
    })
  }
}

UserService.deleteFriendRequest = (req, res, next) => {
  const { idRequester, idReciever } = req.body
  if (!idRequester || !idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else if (idRequester === idReciever) {
    res.status(422).json({ error: true, message: 'bad request' })
  } else {
    UserController.deleteFriendRequest(idRequester, idReciever, (err, docs) => {
      if (err) {
        res.status(422).json({ error: true, message: 'bad request' })
        next(err)
      } else {
        res.status(201).json({
          success: true,
          message: 'Solicitud eliminada',
          data: docs
        })
      }
    })
  }
}

UserService.deleteFriend = (req, res) => {
  const { idRequester, idReciever } = req.body
  UserController.deleteFriend(idRequester, idReciever, (error, docs) => {
    if (error) {
      res.status(401).json({ error: true, message: 'bad request' })
    } else res.status(201).json({ success: true, data: docs })
  })
}

module.exports = UserService
