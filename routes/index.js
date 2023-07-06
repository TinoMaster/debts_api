const express = require('express');
/* const digitalRoutes = require('./digitals.routes');
const usersRoutes = require('./users.routes');
const rolesRoutes = require('./roles.routes'); */

/* Funcion para agregar las rutas */
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

 /*  router.use(digitalRoutes);
  router.use(usersRoutes);
  router.use(rolesRoutes); */
}

module.exports = routerApi;