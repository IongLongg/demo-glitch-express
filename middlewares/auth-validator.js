var db = require('../lowdb')

module.exports.postLogin = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    var errors = []

    var user = db.get('users').find({ email : email}).value()
    if(!user){
        errors.push('User does not exist')
        res.render('auth/login', {
            errors : errors
        })
        return
    }
    if(user.password !== password){
        errors.push('Wrong password')
    }
    if(errors.length){
        res.render('auth/login', {
            errors : errors
        })
        return
    }
    next();
}