const DebtsModel = require('../models/debts.model')
const DebtsController = () => {}

DebtsController.get_all_debts = (cb) => {
  DebtsModel.find()
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

module.exports = DebtsController
