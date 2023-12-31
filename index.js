require('dotenv').config()
const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const notFound = require('./helpers/NotFound')
const http = require('http')
const { setupSocketServer } = require('./socket/socketHandler')

const app = express()
const PORT = process.env.PORT || 5000

/* Este middleware se usa para poder recibir archivos json */
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

routerApi(app)
const httpServer = http.createServer(app)
setupSocketServer(httpServer)

app.use(notFound)

const server = httpServer.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT)
})

module.exports = { app, server }
