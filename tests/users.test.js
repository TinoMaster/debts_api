const mongoose = require('mongoose')
const UserModel = require('../models/users.model')
/* Helpers */
const { initialUsers, server, getAllUsers, createOneUser } = require('./helpers/users')

beforeAll(async () => {
  await UserModel.deleteMany({})
  for (const note of initialUsers) {
    await UserModel.create(note)
  }
})

describe('GET Users', () => {
  test(`Me devuelve los ${initialUsers.length} elementos de inicio`, async () => {
    const allUsers = await getAllUsers()
    const users = allUsers.body.data
    expect(users.length).toBe(initialUsers.length)
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
    const response = await createOneUser(newUser)
    const responseUsers = await getAllUsers()
    const allUsers = responseUsers.body.data

    const dataResponse = response.body.data

    expect(dataResponse.username).toBe('Karla2348873433')
    expect(response.status).toBe(201)
    expect(response.created).toBe(true)
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
    const response = await createOneUser(newUser)
    expect(response.status).toBe(422)
    expect(response.created).toBe(false)
  })

  test('Crea un usuario con el mismo userName', async () => {
    const repeatUser = {
      username: 'Karla2348873433',
      name: 'Karla',
      password: 'karla1234',
      email: 'karla2@gmail.com',
      role: 'user',
      active: true
    }
    const response = await createOneUser(repeatUser)
    expect(response.status).toBe(422)
    expect(response.created).toBe(false)
  })

  test('Crea un usuario con el mismo email', async () => {
    const repeatUser = {
      username: 'Karla2348873435',
      name: 'Karla',
      password: 'karla1234',
      email: 'karla@gmail.com',
      role: 'user',
      active: true
    }
    const response = await createOneUser(repeatUser)
    expect(response.status).toBe(422)
    expect(response.created).toBe(false)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})