const express = require('express')
const debtsRoutes = require('./debts.routes')
const userRoutes = require('./users.routes')
const loginRoutes = require('./login.routes')

/* Funcion para agregar las rutas */
const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use(debtsRoutes)
  router.use(userRoutes)
  router.use(loginRoutes)
}

module.exports = routerApi
