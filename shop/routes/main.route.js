const express = require('express')

const controller = require('../controllers/main.controller')
const middleware = require('../../middlewares/auth.middleware')

const router = express.Router()

router.get('', (req, res) => {
    res.redirect(`/shop/${req.signedCookies.shopId}`)
})

router.get('/:id', middleware.requiredShopAuth ,controller.index)

router.get('/:id/books', middleware.requiredShopAuth , (req, res) => {
    res.send('book')
})


module.exports = router
