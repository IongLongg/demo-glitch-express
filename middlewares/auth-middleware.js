var db = require('../lowdb')

module.exports.requiredAuth = (req,res,next) => {
    if(!req.signedCookies.userId){
        res.redirect('/auth/login')
        return
    }
    var user = db.get('users').find({ id : req.signedCookies.userId }).value()
    if(!user){
        res.redirect('/auth/login')
        return
    }
    next()
}

module.exports.requiredAdmin = (req, res, next) => {
    var user = db.get('users').find({ id : req.signedCookies.userId}).value()
    if(!user.isAdmin){
        res.redirect('/transactions')
        return
    }
    next()  
}