const verifyToken = require('../helpers/token-verify')
const UserModel = require('../models/users.model')

const checkIsUser = async (req, res, next) => {
  const apiKey = req.get('authorization')
  let token = ''
  let decodedToken = ''
  if (apiKey && apiKey.toLowerCase().startsWith('bearer')) {
    token = apiKey.substring(7)

    try {
      decodedToken = verifyToken(token)
    } catch (error) {
      res.json({ error: true, message: 'unauthorized' })
      return false
    }

    if (!token || !decodedToken._id) {
      res.json({ error: true, message: 'unauthorized' })
    }

    const { _id: userId } = decodedToken

    try {
      const user = await UserModel.find({ _id: userId })
      if (user[0].role === 'user' || user[0].role === 'admin') {
        next()
      } else res.json({ error: true, message: 'unauthorized' })
    } catch (error) {
      next(error)
    }
  } else res.json({ error: true, message: 'unauthorized' })
}

const checkIsAdmin = async (req, res, next) => {
  const apiKey = req.get('authorization')
  let token = ''
  if (apiKey && apiKey.toLowerCase().startsWith('bearer')) {
    token = apiKey.substring(7)
    const decodedToken = verifyToken(token)

    if (!token || !decodedToken._id) {
      res.status(401).json({ error: true, message: 'unauthorized' })
    }

    const { _id: userId } = decodedToken

    try {
      const user = await UserModel.find({ _id: userId })
      if (user[0].role === 'admin') {
        next()
      } else res.status(401).json({ error: true, message: 'unauthorized' })
    } catch (error) {
      next(error)
    }
  } else res.status(401).json({ error: true, message: 'unauthorized' })
}

module.exports = { checkIsUser, checkIsAdmin }
