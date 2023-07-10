const mongoose = require('mongoose')
const UserModel = require('../models/users.model')
/* Helpers */
const { initialUsers, server, getAllUsers, createOneUser, createOneUserWhitError } = require('./helpers/users')

beforeAll(async () => {
  await UserModel.deleteMany({})
  for (const note of initialUsers) {
    await UserModel.create(note)
  }
})

describe('GET Users', () => {
  test(`Me devuelve los ${initialUsers.length} elementos de inicio`, async () => {
    const allUsers = await getAllUsers()
    expect(allUsers.length).toBe(initialUsers.length)
  })
})

describe('POST Users', () => {
  test(`Crea un usuario y ahora son ${initialUsers.length + 1}`, async () => {
    const newUser = {
      username: 'Karla2348873433',
      name: 'Karla',
      password: 'karla1234',
      email: 'karla@gmail.com',
      role: 'user',
      active: true
    }
    await createOneUser(newUser)
    const allUsers = await getAllUsers()

    expect(allUsers.length).toBe(initialUsers.length + 1)
  })
  test('Crea un usuario con campo vacio', async () => {
    const newUser = {
      username: '',
      name: 'Karla',
      password: 'karla1234',
      email: 'karla@gmail.com',
      role: 'user',
      active: true
    }
    const response = await createOneUserWhitError(newUser)

    expect(response.status).toBe(422)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
