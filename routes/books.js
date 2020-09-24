const express = require('express')
const multer = require('multer')

const controllerBook = require('../controllers/books')

const router = express.Router()
const upload = multer({ dest : './public/uploads/'})

router.get('/', controllerBook.index)

router.get('/create', controllerBook.getCreate)
router.post('/create', upload.single('cover') ,controllerBook.postCreate)

router.get('/search?', controllerBook.search)

router.get('/:id/update', controllerBook.getUpdate)
router.post('/:id/update', upload.single('cover') ,controllerBook.postUpdate) 

router.get('/:id/delete', controllerBook.delete)

module.exports = router