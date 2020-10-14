const Shop = require("../../models/shop.model")

module.exports.index = async (req, res) => {
    const shop = await Shop.findById(req.signedCookies.shopId).exec()
    res.render('shop/index', {
        shop : shop
    })
}