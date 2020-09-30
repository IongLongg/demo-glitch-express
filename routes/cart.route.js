const express = require('express')

const controller = require('../controllers/cart.controller')

const router = express.Router()

router.get('/add/:bookId', controller.add)

router.get('/view/:sessionId', controller.view)


module.exports = router
