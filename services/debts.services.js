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
  DebtsController.create_debt(data, (err, docs) => {
    if (err) {
      res.status(422).json({ error: true, message: 'Bad request' })
      next(err)
    } else res.status(200).json({ success: true, data: docs })
  })
}

DebtsServices.deleteDebt = (req, res, next) => {
  const { id } = req.params
  DebtsController.deleteDebt(id, (error, docs) => {
    if (error) {
      res.status(422).json({ error: true, message: 'Bad request' })
    } else res.status(201).json({ success: true, message: 'Debt Removed' })
  })
}

module.exports = DebtsServices
