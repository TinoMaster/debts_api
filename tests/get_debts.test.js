const mongoose = require('mongoose')
const DebtsModel = require('../models/debts.model')
/* Helpers */
const { initialDebts, server, getAllDebts, createOneDebt } = require('./helpers/debts')

beforeAll(async () => {
  await DebtsModel.deleteMany({})
  await DebtsModel.create(initialDebts[0])
  await DebtsModel.create(initialDebts[1])
})

test('debts most be returned 2 debts', async () => {
  const allDebts = await getAllDebts()
  expect(allDebts.length).toBe(2)
})

test('debts most be returned 3 debts', async () => {
  await createOneDebt()
  const allDebts = await getAllDebts()

  expect(allDebts.length).toBe(3)
})

afterAll(() => {
  server.close()
  mongoose.mongoose.connection.close()
})
