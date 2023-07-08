const { app, server } = require('../../index')
const supertest = require('supertest')
const api = supertest(app)

const initialDebts = [
  {
    name: 'Oscar con Javier',
    creador: 'Oscar',
    deudor: 'Javier',
    acreedor: 'Oscar',
    deuda: 5000,
    fecha: '2023-07-05T00:00:00.000Z',
    pagada: {
      isDone: false,
      fecha: ''
    },
    pagos: [
      {
        fecha: '2023-07-06T00:00:00.000Z',
        cantidad: 3000
      }
    ],
    comentario: []
  },
  {
    name: 'Oscar con Javier',
    creador: 'Oscar',
    deudor: 'Javier',
    acreedor: 'Oscar',
    deuda: 8000,
    fecha: '2023-06-05T00:00:00.000Z',
    pagada: {
      isDone: false,
      fecha: ''
    },
    pagos: [
      {
        fecha: '2023-06-06T00:00:00.000Z',
        cantidad: 1500
      }
    ],
    comentario: []
  }
]

const getAllDebts = async () => {
  const response = await api.get('/api/v1/debts')
  return response.body.data
}

const createOneDebt = async () => {
  const newNote = {
    name: 'Oscar con Javier',
    creador: 'Oscar',
    deudor: 'Javier',
    acreedor: 'Oscar',
    deuda: 5000,
    fecha: '2023-07-05T00:00:00.000Z',
    pagada: {
      isDone: false,
      fecha: ''
    },
    pagos: [
      {
        fecha: '2023-07-06T00:00:00.000Z',
        cantidad: 3000
      }
    ],
    comentario: []
  }
  const response = await api.post('/api/v1/debts').send(newNote)
  return response.body.data
}

module.exports = { initialDebts, server, getAllDebts, createOneDebt }
