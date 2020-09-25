const express = require('express')

const authController = require('../controllers/auth')
const authValidator = require('../validators/auth-validator')

const router = express.Router()

router.get('/login', authController.login)
router.post('/login', authValidator.postLogin ,authController.postLogin)

router.get('/logout', authController.logout)

module.exports = router
