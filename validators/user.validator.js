const User = require("../models/user.model");

module.exports.postCreate = (req, res, next) => {
    const errors = []
    if(req.body.name.length > 30)
        errors.push('User name is too long')
    let user = User.findOne({email: req.body.email }).exec()

    if (user) {
        errors.push("User already exists.")
    }
    
    if(errors.length){
        res.render('users/create', {
            errors : errors
        })
        return
    }
    next()
}

module.exports.requireAdmin = (req, res, next) => {
    if(!res.locals.isAdmin){
        res.redirect(`users/${req.signedCookies.userId}/profile`)
        return
    }
    next()
}