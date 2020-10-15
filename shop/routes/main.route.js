const express = require('express')

const controller = require('../controllers/main.controller')

const router = express.Router()

router.get('/', controller.index)

router.get('/:id', controller.profile)

module.exports = router
