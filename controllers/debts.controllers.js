const DebtsModel = require('../models/debts.model')
const DebtsController = () => {}

DebtsController.get_all_debts = (cb) => {
  DebtsModel.find()
    .populate('creador')
    .populate('deudor')
    .populate('acreedor')
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

DebtsController.get_my_debts = (id, cb) => {
  DebtsModel.find({ _id: id })
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

DebtsController.create_debt = (data, cb) => {
  DebtsModel.create(data)
    .then((res) => cb(null, res))
    .catch((err) => cb(err, null))
}

module.exports = DebtsController
