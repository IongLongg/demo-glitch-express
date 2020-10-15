const express = require('express')
const multer = require('multer')

const controller = require('../controllers/book.controller')

const router = express.Router()
const upload = multer({dest : './public/uploads/'})

router.get('', controller.index)

router.get('/search?', controller.search)

router.get('/create', controller.create)
router.post('/create', upload.single('cover'), controller.postCreate)

module.exports = router
