var db = require('../lowdb')
var bcrypt = require('bcrypt')

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
    if(!user.wrongLoginCount){
        db.get('users').find({ id : user.id }).assign({ wrongLoginCount : 0 }).write()
    } 
    if(user.wrongLoginCount > 4){
        db.get('users').find({ id : user.id }).assign({ wrongLoginCount : 0 }).write()
        res.render('auth/login', {
            errors : [
                'Wrong too much'
            ]
        })
        return
    } else{
        const saltRounds = 10;
        var hashPassword = bcrypt.hashSync(user.password, saltRounds)
        if(bcrypt.compareSync(password, hashPassword) === false){
            errors.push('Wrong password')
            user.wrongLoginCount++;
        }
    }

    if(errors.length){
        res.render('auth/login', {
            errors : errors
        })
        return
    }
    next();
}