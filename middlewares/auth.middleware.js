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

