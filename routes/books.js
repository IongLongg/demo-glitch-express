const express = require('express')
const multer = require('multer')

const controller = require('../controllers/books')

const router = express.Router()
const upload = multer({ dest : './public/uploads/'})

router.get('/', controller.index)

router.get('/create', controller.getCreate)
router.post('/create', upload.single('cover') ,controller.postCreate)

router.get('/search?', controller.search)

router.get('/:id/update', controller.getUpdate)
router.post('/:id/update', upload.single('cover') ,controller.postUpdate) 

router.get('/:id/delete', controller.delete)

module.exports = router