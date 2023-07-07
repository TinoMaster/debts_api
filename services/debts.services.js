const DebtsController = require('../controllers/debts.controllers')
const DebtsServices = () => {}

DebtsServices.get_all_debts = (req, res, next) => {
  DebtsController.get_all_debts((err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

DebtsServices.get_my_debts = (req, res, next) => {
  const { id } = req.params
  DebtsController.get_my_debts(id, (err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

DebtsServices.create_debt = (req, res, next) => {
  const data = req.body
  console.log(data)
  DebtsController.create_debt(data, (err, docs) => {
    if (err) next(err)
    else res.status(200).json({ success: true, data: docs })
  })
}

module.exports = DebtsServices
