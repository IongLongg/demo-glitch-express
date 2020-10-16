const shortid = require('shortid')

const Session = require('../models/session.model')
const Shop = require('../models/shop.model')
const User = require('../models/user.model')

module.exports = async (req,res, next) => {
    if(!req.signedCookies.sessionId){
        const sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, { signed : true})
        const creation = await Session.create({_id : sessionId, cart : []})
        creation.save()
    } else {
        const session = await Session.findById(req.signedCookies.sessionId).exec()
        res.locals.session = session
    }

    if(req.signedCookies.userId){
        const user = await User.findById(req.signedCookies.userId).exec()
        res.locals.mainUser = user
        res.locals.isAdmin = user.isAdmin
    }

    if(req.signedCookies.shoppingId){
        const shop = await Shop.findById(req.signedCookies.shoppingId).exec()
        res.locals.shop = shop 
    }

    if(req.signedCookies.shopId){
        const shop = await Shop.findById(req.signedCookies.shopId).exec()
        res.locals.shopAdmin = true 
    }
    next()
}