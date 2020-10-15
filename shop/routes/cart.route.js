const express = require('express')

const controller = require('../controllers/cart.controller')
const validator = require('../../validators/cart.validator')

const router = express.Router()

router.get('/add/:bookId', validator.isExistedShop ,controller.add)

router.get('/:bookId/delete', controller.delete)

router.get('/view/:sessionId', controller.view)

router.get('/save/:sessionId' ,controller.save)


module.exports = router
