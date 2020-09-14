var express = require('express')

var controllerTransactions = require('../controllers/transactions')

var router = express.Router()

router.get('/', controllerTransactions.index)

router.get('/create', controllerTransactions.getCreate)
router.post('/create', controllerTransactions.postCreate)

router.get('/search?', controllerTransactions.search)

router.get('/:id/complete', controllerTransactions.isComplete)

module.exports = router