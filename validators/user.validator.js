const db = require('../lowdb')

module.exports.postCreate = (req, res, next) => {
    var errors = []
    if(req.body.name.length > 30)
        errors.push('User name is too long')
    let user = db.get('users').find({email: req.body.email }).value();

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