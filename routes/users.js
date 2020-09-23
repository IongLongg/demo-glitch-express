const express = require('express')
const multer = require('multer')

const controllerUsers = require('../controllers/users')
const validatorUser = require('../validators/users-validator')

const router = express.Router()
const upload = multer({ dest : './public/uploads/' })

router.get('/', controllerUsers.index)

router.get('/create', controllerUsers.getCreate)
router.post('/create', validatorUser.postCreate ,controllerUsers.postCreate)

router.get('/:id/delete', controllerUsers.delete)

router.get('/:id/profile', controllerUsers.getProfile)
router.post('/:id/profile', upload.single('avatar') ,controllerUsers.postProfile)

module.exports = router