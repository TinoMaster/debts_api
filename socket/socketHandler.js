const { Server: SocketServer } = require('socket.io')

let io

const setupSocketServer = (httpServer) => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    console.log(`${socket.id} is connected`)
    // Agrega la lógica de manejo de eventos de sockets aquí
  })
}

const emitContactRequest = (id) => {
  io.emit('friendRequest', id)
}

module.exports = { setupSocketServer, emitContactRequest }
