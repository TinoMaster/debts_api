const LoginController = require('../controllers/login.controllers')
const LoginService = () => {}

LoginService.login = (req, res, next) => {
  const data = req.body
  LoginController.login(data, (error, docs) => {
    if (!docs || error !== null) return res.status(401).json({ error: true, message: 'Error Data' })
    else res.status(201).json({ success: true, data: docs })
  })
}

module.exports = LoginService
