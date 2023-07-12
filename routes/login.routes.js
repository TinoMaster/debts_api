const LoginServices = require('../services/login.services')
const router = require('express').Router()

router.post('/users/login', LoginServices.login)

module.exports = router
