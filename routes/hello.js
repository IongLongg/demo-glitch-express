var express = require('express')

var controllerIndex = require('../controllers/hello')

var router = express.Router()

router.get('/', controllerIndex.index)

module.exports = router