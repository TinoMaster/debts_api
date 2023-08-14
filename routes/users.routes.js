const { checkIsUser /* , checkIsAdmin */ } = require('../middlewares/auth.handlers')
const UserServices = require('../services/user.services')
const router = require('express').Router()

/* Pendiente usar los protectores de rutas */
router.get('/users', /* checkIsAdmin */ checkIsUser, UserServices.get_all)
router.get('/users/contacts/:id', checkIsUser, UserServices.getContacts)
router.post('/users/register', UserServices.createUser)
router.get('/users/isLogin', checkIsUser, (req, res) => {
  res.json({ success: true })
})
router.post('/users/contactrequest', checkIsUser, UserServices.contactRequest)
router.post('/users/response_friend_request', checkIsUser, UserServices.responseFriendRequest)
router.post('/users/delete_friend', checkIsUser, UserServices.deleteFriend)

module.exports = router
