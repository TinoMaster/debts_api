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

DebtsController.addPayToDebt = async (id, data, cb) => {
  try {
    const user = await DebtsModel.find({ _id: id })
    const restopagos = user[0].pagos.reduce((rest, value) => (rest += value.cantidad), 0)
    const restoTotal = user[0].deuda - restopagos - data.cantidad

    if (restoTotal >= 0) {
      const userUpdate = await DebtsModel.findOneAndUpdate({ _id: id }, { $push: { pagos: data } }, { new: true })
      const newPaid = userUpdate.pagos.filter((el) => el.fecha.toString() === data.fecha.toString())
      const docs = { userUpdate, newPaid }
      cb(null, docs)
    } else throw new Error('Bad request')
  } catch (error) {
    cb(error, null)
  }
}

DebtsController.removePaidToDebt = async (idUser, idPaid, cb) => {
  try {
    const user = await DebtsModel.findOneAndUpdate(
      { _id: idUser },
      { $pull: { pagos: { _id: idPaid } } },
      { new: true }
    )
    if (user) {
      cb(null, user)
    } else throw new Error('Bad request')
  } catch (error) {
    cb(error, null)
  }
}

module.exports = DebtsController
