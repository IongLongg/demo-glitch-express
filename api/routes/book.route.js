const express = require('express')
const cors = require('cors')

const controller = require('../controllers/book.controller')
const schema = require('../validators/book.schema')

const router  = express.Router()

router.get('/', cors(), controller.index)

router.get('/:id', cors(), controller.getById)

router.post('/create', schema.createBookSchema ,controller.create)

router.put('/:id/update', schema.createBookSchema ,controller.update)

router.get('/:id/delete', controller.delete)

module.exports = router

