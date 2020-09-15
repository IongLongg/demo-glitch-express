var express = require('express')

var controllerTransactions = require('../controllers/transactions')
var middlewareTransactions = require('../middlewares/transactions-validator')

var router = express.Router()

router.get('/', controllerTransactions.index)

router.get('/create', controllerTransactions.getCreate)
router.post('/create', controllerTransactions.postCreate)

router.get('/search?', controllerTransactions.search)

router.get('/:id/complete', middlewareTransactions.isComplete ,controllerTransactions.isComplete)

module.exports = router