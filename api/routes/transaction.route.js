const express = require('express')

const controller = require('../controllers/transaction.controller')

const router  = express.Router()

router.get('/', controller.index)

router.get('/:id', controller.getById)

router.get('/:id/delete', controller.delete)

router.post('/create', controller.create)

module.exports = router

