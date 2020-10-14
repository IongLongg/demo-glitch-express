const Shop = require("../models/shop.model")
const User = require("../models/user.model")

module.exports.requiredAuth = async (req,res,next) => {
    if(!req.signedCookies.userId){
        res.redirect('/auth/login')
        return
    }
    const user = await User.findById(req.signedCookies.userId).exec()
    if(!user){
        res.redirect('/auth/login')
        return
    }
    next()
}

module.exports.requiredShopAuth = async (req, res, next) => {
    if(!req.signedCookies.shopId){
        res.redirect('/shop/auth/login')
        return
    }
    const shop = await Shop.findById(req.signedCookies.shopId).exec()
    if(!shop){
        res.redirect('/shop/auth/login')
        return
    }
    next()
}
