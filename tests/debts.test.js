const mongoose = require('mongoose')
const DebtsModel = require('../models/debts.model')
const UsersModel = require('../models/users.model')
/* Helpers */
const {
  initialDebts,
  server,
  getAllDebts,
  createOneDebt,
  getMyDebts,
  deleteDebt,
  addPayToDebt
} = require('./helpers/debts')
const { initialUsers, createTrueToken } = require('./helpers/users')

let token = ''
let id1
let id2

beforeAll(async () => {
  await DebtsModel.deleteMany({})
  await UsersModel.deleteMany({})
  for (const user of initialUsers) {
    await UsersModel.create(user)
  }
  token = await createTrueToken()
  const allUsers = await UsersModel.find()
  id1 = allUsers[0]._id
  id2 = allUsers[1]._id
  for (const note of initialDebts) {
    note.creador = id1
    note.acreedor = id2
    note.deudor = id1
    await DebtsModel.create(note)
  }
})

describe('All DEBTS', () => {
  let allDebts = []
  beforeAll(async () => {
    allDebts = await getAllDebts(token)
  })

  test(`Me devuelve los ${initialDebts.length} elementos de inicio`, async () => {
    expect(allDebts.body.data.length).toBe(initialDebts.length)
  })

  test(`Crea una debt y ahora son ${initialDebts.length + 1}`, async () => {
    const newNote = {
      name: 'Oscar con Javier',
      description: 'Moto',
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
          comentario: 'Este es el nuevo'
        }
      ],
      comentario: []
    }
    const resNewNote = await createOneDebt(token, newNote)
    const allDebts = await getAllDebts(token)
    expect(resNewNote.body.success).toBe(true)
    expect(allDebts.body.data.length).toBe(initialDebts.length + 1)
  })

  test('Me devuelve solo las debts segun el id', async () => {
    const myDebts = await getMyDebts(token, id1)
    expect(myDebts.body.success).toBe(true)
  })

  test(`Elimina una debt y  ahora son ${initialDebts.length} elementos`, async () => {
    const idDelete = allDebts.body.data[0]._id
    const delDebt = await deleteDebt(token, idDelete)
    expect(delDebt.body.success).toBe(true)
  })

  test('Agrega un pago a una deuda', async () => {
    const fecha = new Date()
    const id = allDebts.body.data[1]._id
    const data = {
      cantidad: 1500,
      fecha,
      comentario: 'Hola esto es una prueba'
    }
    const res = await addPayToDebt(token, id, data)
    expect(res.body.success).toBe(true)
    expect(res.body.data.pagos.length).toBe(2)
  })

  test('Agrega un pago a una deuda que sobrepasa el limite', async () => {
    const fecha = new Date()
    const id = allDebts.body.data[1]._id
    const data = {
      cantidad: 5001,
      fecha,
      comentario: 'Hola esto es una prueba'
    }
    const res = await addPayToDebt(token, id, data)
    expect(res.body.error).toBe(true)
  })
})

afterAll(() => {
  server.close()
  mongoose.mongoose.connection.close()
})
