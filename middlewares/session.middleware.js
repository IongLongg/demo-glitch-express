const shortid = require("shortid")
const db = require("../lowdb")

module.exports = (req,res, next) => {
    if(!req.signedCookies.sessionId){
        const sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, { signed : true})
        console.log('create');
        db.get('sessions').push({
            id : sessionId,
            cart : []
        }).write()
    } else {
        const session = db.get('sessions').find({ id : req.signedCookies.sessionId }).value()
        res.locals.sessionId = req.signedCookies.sessionId
        res.locals.inCart = session.cart.length
    }
    next()
}