const express = require('express')

const controller = require('../controllers/transaction.controller')
const validator = require('../validators/transaction.validator')
const middleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', validator.transactionForAdmin ,controller.index)

router.get('/create', middleware.requiredAuth, validator.createTransactionForAdmin ,controller.getCreate)
router.post('/create', middleware.requiredAuth,controller.postCreate)

router.get('/search?', middleware.requiredAuth,controller.search)

router.get('/:id/complete', validator.isTransaction ,controller.isComplete)

module.exports = router