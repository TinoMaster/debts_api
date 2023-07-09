const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConfig = require('../configs/db_mongo')

const DebtsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  creador: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  deudor: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  acreedor: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  deuda: Number,
  fecha: Date,
  pagada: { isDone: Boolean, fecha: Date },
  pagos: [{ fecha: Date, cantidad: Number }],
  comentario: Array
})

const DebtsModel = mongoose.model('Debt', DebtsSchema)
mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`)

module.exports = DebtsModel
