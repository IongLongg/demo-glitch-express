const express = require('express')

const controller = require('../controllers/book.controller')
const schema = require('../validators/book.schema')

const router  = express.Router()

router.get('/', controller.index)

router.get('/:id', controller.getById)

router.post('/create', schema.createBookSchema ,controller.create)

router.put('/update/:id', schema.createBookSchema ,controller.update)

router.get('/:id/delete', controller.delete)

module.exports = router

