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

const getAllUsers = async (token) => await api.get('/api/v1/users').set('Authorization', `Bearer ${token}`)

const getContacts = async (id, token) =>
  await api.get(`/api/v1/users/contacts/${id}`).set('Authorization', `Bearer ${token}`)

const createOneUser = async (newUser) => await api.post('/api/v1/users/register').send(newUser)

const loginUser = async (dataLogin) => await api.post('/api/v1/users/login').send(dataLogin)

const requestContact = async (dataContact, token) =>
  await api.post('/api/v1/users/contactrequest').send(dataContact).set('Authorization', `Bearer ${token}`)

const responseFriendRequest = async (dataContact, token) =>
  await api.post('/api/v1/users/response_friend_request').send(dataContact).set('Authorization', `Bearer ${token}`)

const createTrueToken = async () => {
  const newUser = {
    username: 'Karla2348873433',
    name: 'Karla',
    password: 'karla1234',
    email: 'karla@gmail.com',
    role: 'user',
    active: true
  }

  await createOneUser(newUser)
  const dataLogin = {
    email: 'karla@gmail.com',
    password: 'karla1234'
  }
  const login = await loginUser(dataLogin)
  return login.body.data.token
}
module.exports = {
  initialUsers,
  server,
  getAllUsers,
  getContacts,
  createOneUser,
  loginUser,
  createTrueToken,
  requestContact,
  responseFriendRequest
}
