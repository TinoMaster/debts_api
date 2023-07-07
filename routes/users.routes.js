const UserServices = require('../services/user.services')
const router = require('express').Router()

router.get('/users', UserServices.get_all)

module.exports = router
