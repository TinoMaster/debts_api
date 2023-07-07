const express = require('express')
const debtsRoutes = require('./debts.routes')
const userRoutes = require('./users.routes')

/* Funcion para agregar las rutas */
const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use(debtsRoutes)
  router.use(userRoutes)
}

module.exports = routerApi
