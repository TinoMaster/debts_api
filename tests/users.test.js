const mongoose = require('mongoose')
const UserModel = require('../models/users.model')
/* Helpers */
const { initialUsers, server, getAllUsers, createOneUser, loginUser } = require('./helpers/users')

let token = ''

beforeAll(async () => {
  await UserModel.deleteMany({})
  for (const user of initialUsers) {
    await UserModel.create(user)
  }
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
    const dataLogin = {
      email: 'karla@gmail.com',
      password: 'karla1234'
    }
    const login = await loginUser(dataLogin)
    token = login.body.data.token
    const responseUsers = await getAllUsers(token)
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

describe('Login User', () => {
  test('Me logeo correctamente', async () => {
    const dataLogin = {
      email: 'karla@gmail.com',
      password: 'karla1234'
    }
    const response = await loginUser(dataLogin)
    expect(response.status).toBe(201)
  })
  test('Campo email no valido o vacio', async () => {
    const dataLogin = {
      email: 'karlos@gmail.com',
      password: 'karla1234'
    }
    const response = await loginUser(dataLogin)
    expect(response.status).toBe(401)
  })
  test('Campo password no valido o vacio', async () => {
    const dataLogin = {
      email: 'karlos@gmail.com',
      password: ''
    }
    const response = await loginUser(dataLogin)
    expect(response.status).toBe(401)
  })
})

describe('GET Users', () => {
  test(`Me devuelve los ${initialUsers.length} elementos de inicio + 1 que cree`, async () => {
    const allUsers = await getAllUsers(token)
    const users = allUsers.body.data
    expect(users.length).toBe(initialUsers.length + 1)
  })
})

/* describe('REQUEST CONTACT', () => {
  test('should ', async () => { 
  });
}) */

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
