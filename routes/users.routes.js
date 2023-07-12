/* const { checkIsUser } = require('../middlewares/auth.handlers') */
const UserServices = require('../services/user.services')
const router = require('express').Router()

/* Pendiente usar los protectores de rutas */
router.get('/users', UserServices.get_all)
router.post('/users/register', UserServices.createUser)

module.exports = router
