const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConfig = require("../configs/db_mongo");

const DebtsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creador: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  deudor: {
    type: Array,
    required: true,
  },
  acreedor: {
    type: String,
    required: true,
  },
  deuda: Number,
  fecha: String,
  pagada: {
    isDone: Boolean,
    fecha: String,
  },
  pagos: [
    {
      fecha: String,
      cantidad: Number,
    },
  ],
  comentario: Array,
});

const DeudasModel = mongoose.model("Debts", DebtsSchema);
mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`);

module.exports = DeudasModel;
