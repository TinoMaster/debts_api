const mongoose = require('mongoose')
const DebtsModel = require('../models/debts.model')
const UsersModel = require('../models/users.model')
/* Helpers */
const { initialDebts, server, getAllDebts, createOneDebt } = require('./helpers/debts')
const { initialUsers, createTrueToken } = require('./helpers/users')

let token = ''
/* createTrueToken().then((res) => (token = res)) */

beforeAll(async () => {
  await DebtsModel.deleteMany({})
  await UsersModel.deleteMany({})
  for (const user of initialUsers) {
    await UsersModel.create(user)
  }
  token = await createTrueToken()
  const allUsers = await UsersModel.find()
  const id1 = allUsers[0]._id
  const id2 = allUsers[1]._id
  for (const note of initialDebts) {
    note.creador = id1
    note.acreedor = id2
    note.deudor = id1
    await DebtsModel.create(note)
  }
})

describe('GET DEBTS', () => {
  test(`Me devuelve los ${initialDebts.length} elementos de inicio`, async () => {
    const allDebts = await getAllDebts(token)
    expect(allDebts.length).toBe(initialDebts.length)
  })
})

describe('POST DEBTS', () => {
  test(`Crea una debt y ahora son ${initialDebts.length + 1}`, async () => {
    await createOneDebt(token)
    const allDebts = await getAllDebts(token)
    expect(allDebts.length).toBe(initialDebts.length + 1)
  })
})

afterAll(() => {
  server.close()
  mongoose.mongoose.connection.close()
})
