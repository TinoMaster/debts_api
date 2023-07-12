/* const { checkIsUser } = require('../middlewares/auth.handlers') */
const DebtsServices = require('../services/debts.services')
const router = require('express').Router()

/* Pendiente usar los protectores de rutas */
router.get('/debts', DebtsServices.get_all_debts)
router.get('/debts/:id', DebtsServices.get_my_debts)
router.post('/debts', DebtsServices.create_debt)

module.exports = router
