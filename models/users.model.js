const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConfig = require('../configs/db_mongo')

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
)

UserSchema.set('toJSON', {
  // Definir opciones para toJSON
  transform: (doc, ret) => {
    delete ret.password // Excluir el campo "password"
  }
})

const UserModel = mongoose.model('Users', UserSchema)
mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`)

module.exports = UserModel
