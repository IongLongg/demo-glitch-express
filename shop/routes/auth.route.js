const express = require('express')
const multer = require('multer')

const controller = require('../controllers/auth.controller')
const validator = require('../../validators/auth.validator')

const router = express.Router()
const upload = multer({dest : './public/uploads/'})

router.get('/login', controller.getLogin)
router.post('/login', validator.postShopLogin ,controller.postLogin)

router.get('/logout', controller.logout)

router.get('/signup', controller.getSignup)
router.post('/signup', upload.single('logo') ,controller.postSignup)

module.exports = router
