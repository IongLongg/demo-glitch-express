const express = require('express')

const controller = require('../controllers/transactions')
const validator = require('../validators/transactions-validator')

const router = express.Router()

router.get('/', controller.index)

router.get('/create', controller.getCreate)
router.post('/create', controller.postCreate)

router.get('/search?', controller.search)

router.get('/:id/complete', validator.isComplete ,controller.isComplete)

module.exports = router