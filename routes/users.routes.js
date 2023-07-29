const { checkIsUser /* , checkIsAdmin */ } = require('../middlewares/auth.handlers')
const UserServices = require('../services/user.services')
const router = require('express').Router()

/* Pendiente usar los protectores de rutas */
router.get('/users', /* checkIsAdmin */ checkIsUser, UserServices.get_all)
router.post('/users/register', UserServices.createUser)
router.get('/users/isLogin', checkIsUser, (req, res) => {
  res.json({ success: true })
})

module.exports = router
