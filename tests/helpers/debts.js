const { app, server } = require('../../index')
const supertest = require('supertest')
const api = supertest(app)

const initialDebts = [
  {
    name: 'Oscar con Javier',
    description: 'Split',
    creador: '64ab2209388e4e4a26f41e03',
    deudor: '64ab2209388e4e4a26f41e04',
    acreedor: '64ab2209388e4e4a26f41e03',
    deuda: 5000,
    fecha: '2023-07-05T00:00:00.000Z',
    pagada: {
      isDone: false,
      fecha: ''
    },
    pagos: [
      {
        fecha: '2023-07-06T00:00:00.000Z',
        cantidad: 3000,
        comentario: 'Esto es una prueba'
      }
    ],
    comentario: []
  },
  {
    name: 'Oscar con Javier',
    description: 'TV',
    creador: '64ab2209388e4e4a26f41e03',
    deudor: '64ab2209388e4e4a26f41e04',
    acreedor: '64ab2209388e4e4a26f41e03',
    deuda: 8000,
    fecha: '2023-06-05T00:00:00.000Z',
    pagada: {
      isDone: false,
      fecha: ''
    },
    pagos: [
      {
        fecha: '2023-06-06T00:00:00.000Z',
        cantidad: 1500,
        comentario: 'Esto es una prueba'
      }
    ],
    comentario: []
  },
  {
    name: 'Oscar con Javier',
    description: 'Moto',
    creador: '64ab2209388e4e4a26f41e03',
    deudor: '64ab2209388e4e4a26f41e04',
    acreedor: '64ab2209388e4e4a26f41e03',
    deuda: 8000,
    fecha: '2023-06-05T00:00:00.000Z',
    pagada: {
      isDone: false,
      fecha: ''
    },
    pagos: [
      {
        fecha: '2023-06-06T00:00:00.000Z',
        cantidad: 1500,
        comentario: 'Esto es una prueba'
      }
    ],
    comentario: []
  }
]

const getAllDebts = async (token) => await api.get('/api/v1/debts').set('Authorization', `Bearer ${token}`)

const getMyDebts = async (token, id) => await api.get(`/api/v1/debts/${id}`).set('Authorization', `Bearer ${token}`)

const createOneDebt = async (token, note) =>
  await api.post('/api/v1/debts').send(note).set('Authorization', `Bearer ${token}`)

const deleteDebt = async (token, id) => await api.delete(`/api/v1/debts/${id}`).set('Authorization', `Bearer ${token}`)

const addPayToDebt = async (token, id, data) =>
  await api.put(`/api/v1/debts/${id}`).send(data).set('Authorization', `Bearer ${token}`)

const deletePayToDebt = async (token, idUser, idPaid) =>
  await api.put(`/api/v1/debts/delete_paid/${idUser}`).send({ idPaid }).set('Authorization', `Bearer ${token}`)

module.exports = {
  initialDebts,
  server,
  getAllDebts,
  createOneDebt,
  getMyDebts,
  deleteDebt,
  addPayToDebt,
  deletePayToDebt
}
