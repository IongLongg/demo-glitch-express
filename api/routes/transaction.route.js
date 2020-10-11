const express = require('express')

const controller = require('../controllers/transaction.controller')

const router  = express.Router()

router.get('/', controller.index)

module.exports = router

