const express = require('express')

const controller = require('../controllers/auth.controller')
const validator = require('../validators/auth.validator')

const router = express.Router()

router.get('/login', controller.login)
router.post('/login', validator.postLogin ,controller.postLogin)

router.get('/logout', controller.logout)

module.exports = router
