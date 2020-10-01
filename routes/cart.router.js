const express = require('express')

const controller = require('../controllers/cart.controller')

const router = express.Router()

router.get('/add/:bookId', controller.add)

router.get('/:bookId/delete', controller.delete)

router.get('/view/:sessionId', controller.view)

router.get('/save/:sessionId' ,controller.save)


module.exports = router
