var express = require('express')

var controllerBook = require('../controllers/books')

var router = express.Router()

router.get('/', controllerBook.index)

router.get('/create', controllerBook.getCreate)
router.post('/create', controllerBook.postCreate)

router.get('/search?', controllerBook.search)

router.get('/:id', controllerBook.view)

router.get('/:id/delete', controllerBook.delete)

module.exports = router