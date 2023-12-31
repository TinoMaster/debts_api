const LoginController = require('../controllers/login.controllers')
const LoginService = () => {}

LoginService.login = (req, res) => {
  const data = req.body
  LoginController.login(data, (error, docs) => {
    if (error?.error || error) res.json({ error: true, message: 'Usuario o contraseña incorrecta' })
    else res.status(201).json({ success: true, data: docs })
  })
}

module.exports = LoginService
