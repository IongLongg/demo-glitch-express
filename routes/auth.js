var express = require('express')

var authController = require('../controllers/auth')
var authValidator = require('../middlewares/auth-validator')

var router = express.Router()

router.get('/login', authController.login)

router.post('/login', authValidator.postLogin ,authController.postLogin)

module.exports = router
