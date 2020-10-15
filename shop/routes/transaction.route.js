const express = require('express')

const controller = require('../controllers/transaction.controller')

const router = express.Router()

router.get('/' ,controller.index)

router.get('/:id/complete', controller.isComplete)

module.exports = router