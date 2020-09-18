const express = require('express')

const controllerUsers = require('../controllers/users')
const validatorUser = require('../validators/users-validator')

const router = express.Router()

router.get('/', controllerUsers.index)

router.get('/create', controllerUsers.getCreate)
router.post('/create', validatorUser.postCreate ,controllerUsers.postCreate)

router.get('/:id/delete', controllerUsers.delete)

router.get('/:id/update', controllerUsers.getUpdate)
router.post('/:id/update', controllerUsers.postUpdate)

module.exports = router