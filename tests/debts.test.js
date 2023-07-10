const mongoose = require('mongoose')
const DebtsModel = require('../models/debts.model')
const UsersModel = require('../models/users.model')
/* Helpers */
const { initialDebts, server, getAllDebts, createOneDebt } = require('./helpers/debts')
const { initialUsers } = require('./helpers/users')

beforeAll(async () => {
  await DebtsModel.deleteMany({})
  await UsersModel.deleteMany({})
  for (const note of initialDebts) {
    await DebtsModel.create(note)
  }
  for (const user of initialUsers) {
    await UsersModel.create(user)
  }
})

describe('GET Notes', () => {
  test(`Me devuelve los ${initialDebts.length} elementos de inicio`, async () => {
    const allDebts = await getAllDebts()
    expect(allDebts.length).toBe(initialDebts.length)
  })
})

describe('POST Notes', () => {
  test(`Crea una nota y ahora son ${initialDebts.length + 1}`, async () => {
    await createOneDebt()
    const allDebts = await getAllDebts()

    expect(allDebts.length).toBe(initialDebts.length + 1)
  })
})

afterAll(() => {
  server.close()
  mongoose.mongoose.connection.close()
})
