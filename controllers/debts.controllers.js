const DebtsModel = require('../models/debts.model')
const DebtsController = () => {}

DebtsController.get_all_debts = (cb) => {
  DebtsModel.find()
    .populate('creador', { username: 1, name: 1 })
    .populate('deudor', { username: 1, name: 1 })
    .populate('acreedor', { username: 1, name: 1 })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

DebtsController.get_my_debts = (id, cb) => {
  DebtsModel.find({ $or: [{ acreedor: id }, { deudor: id }] })
    .populate('creador', { username: 1, name: 1 })
    .populate('deudor', { username: 1, name: 1 })
    .populate('acreedor', { username: 1, name: 1 })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

DebtsController.create_debt = (data, cb) => {
  DebtsModel.create(data)
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

DebtsController.deleteDebt = (id, cb) => {
  DebtsModel.deleteOne({ _id: id })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

DebtsController.addPayToDebt = async (_id, data, cb) => {
  try {
    const user = await DebtsModel.find({ _id })
    const restopagos = user.pagos.reduce((rest, value) => (rest += value.cantidad), 0)
    const restoTotal = user.deuda - restopagos - data.cantidad
    if (restoTotal >= 0) {
      const userUpdate = await DebtsModel.findOneAndUpdate({ _id }, { $push: { pagos: { data } } })
      cb(null, userUpdate)
    } else throw new Error('Bad request')
  } catch (error) {
    cb(error, null)
  }
}

module.exports = DebtsController
