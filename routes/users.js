var express = require('express')

var controllerUsers = require('../controllers/users')
var middlewareUsers = require('../middlewares/users-validator')

var router = express.Router()

router.get('/', controllerUsers.index)

router.get('/create', controllerUsers.getCreate)
router.post('/create', middlewareUsers.postCreate ,controllerUsers.postCreate)

router.get('/search?', controllerUsers.search)

router.get('/:id', controllerUsers.view)

router.get('/:id/delete', controllerUsers.delete)

router.get('/:id/edit', controllerUsers.getEdit)
router.post('/:id/edit', controllerUsers.postEdit)

module.exports = router