const express = require('express')

const controllerTransactions = require('../controllers/transactions')
const validatorTransaction = require('../validators/transactions-validator')

const router = express.Router()

router.get('/', controllerTransactions.index)

router.get('/create', controllerTransactions.getCreate)
router.post('/create', controllerTransactions.postCreate)

router.get('/search?', controllerTransactions.search)

router.get('/:id/complete', validatorTransaction.isComplete ,controllerTransactions.isComplete)

module.exports = router