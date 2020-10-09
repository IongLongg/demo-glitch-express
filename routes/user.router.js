const express = require('express')
const multer = require('multer')

const controller = require('../controllers/user.controller')
const validator = require('../validators/user.validator')

const router = express.Router()
const upload = multer({ dest : './public/uploads/' })

router.get('/', validator.requireAdmin ,controller.index)

router.get('/create', validator.requireAdmin ,controller.getCreate)
router.post('/create', upload.single('avatar'), validator.postCreate, controller.postCreate)

router.get('/:id/delete', validator.requireAdmin ,controller.delete)

router.get('/:id/profile', controller.getProfile)
router.post('/:id/profile', upload.single('avatar') ,controller.postProfile)

module.exports = router