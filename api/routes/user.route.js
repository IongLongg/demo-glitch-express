const express = require('express')

const controller = require('../controllers/user.controller')

const router  = express.Router()

router.post('/login', controller.login)

router.post('/:id/logout', controller.logout)

router.get('/', controller.index)

router.get('/:id', controller.getById)

module.exports = router

