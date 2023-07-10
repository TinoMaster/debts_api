const { app, server } = require('../../index')
const supertest = require('supertest')
const api = supertest(app)

const initialUsers = [
  {
    username: 'Javier2348873433',
    name: 'Javier',
    password: 'javier1234',
    email: 'javier@gmail.com',
    role: 'user',
    active: true
  },
  {
    username: 'Oscar2348873433',
    name: 'Oscar',
    password: 'oscar1234',
    email: 'oscar@gmail.com',
    role: 'user',
    active: true
  },
  {
    username: 'Ronald2348873433',
    name: 'Ronald',
    password: 'ronald1234',
    email: 'ronald@gmail.com',
    role: 'user',
    active: false
  },
  {
    username: 'Jeniffer2348873433',
    name: 'Jeniffer',
    password: 'jeniffer1234',
    email: 'jeniffer@gmail.com',
    role: 'user',
    active: true
  },
  {
    username: 'Marcos2348873433',
    name: 'Marcos',
    password: 'Marcos1234',
    email: 'marcos@gmail.com',
    role: 'user',
    active: true
  },
  {
    username: 'Bryam2348873433',
    name: 'Bryam',
    password: 'bryam1234',
    email: 'bryam@gmail.com',
    role: 'user',
    active: true
  },
  {
    username: 'Jorge2348873433',
    name: 'Jorge',
    password: 'jorge1234',
    email: 'jorge@gmail.com',
    role: 'user',
    active: true
  },
  {
    username: 'Jose2348873433',
    name: 'Jose',
    password: 'jose1234',
    email: 'jose@gmail.com',
    role: 'user',
    active: true
  }
]

const getAllUsers = async () => await api.get('/api/v1/users')

const createOneUser = async (newUser) => await api.post('/api/v1/users').send(newUser)

module.exports = { initialUsers, server, getAllUsers, createOneUser }
