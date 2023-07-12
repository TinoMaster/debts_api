const UserServices = require('../services/user.services')
const router = require('express').Router()

router.get('/users', UserServices.get_all)
router.post('/users/register', UserServices.createUser)

module.exports = router
