const express = require('express')
const multer = require('multer')

const controller = require('../controllers/auth.controller')
const validator = require('../validators/auth.validator')

const router = express.Router()
const upload = multer({dest : './public/uploads/'})

router.get('/login', controller.login)
router.post('/login', validator.postLogin ,controller.postLogin)

router.get('/logout', controller.logout)

router.get('/signup', controller.signup)
router.post('/signup', upload.single('avatar') ,controller.postSignup)

module.exports = router
