const Shop = require("../../models/shop.model")

module.exports.index = async (req, res) => {
    const shops = await Shop.find().exec()
    res.render('shop/index', {
        shops : shops
    })
}

module.exports.profile = async (req, res) => {
    const shop = await Shop.findById(req.params.id).exec()
    res.cookie('shoppingId', req.params.id, {
        signed : true
    })
    res.render('shop/profile', {
        shop : shop
    })
}
