const { Server: SocketServer } = require('socket.io')

let io
const usersConnected = {}

const setupSocketServer = (httpServer) => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    socket.on('connected', (data) => {
      usersConnected[data.userId] = socket.id
    })

    socket.on('friendRequest', (data) => {
      const { applicant, receptorId } = data
      const receptor = usersConnected[receptorId]
      if (receptor) {
        io.to(receptor).emit('friendReqEmit', applicant)
      }
    })

    socket.on('disconnect', () => {
      // Remover la conexión del usuario del registro
      const userId = Object.keys(usersConnected).find((key) => usersConnected[key] === socket.id)
      if (userId) {
        delete usersConnected[userId]
      }
    })
  })
}

module.exports = { setupSocketServer }
