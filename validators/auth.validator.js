const db = require('../lowdb')
const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.postLogin = async (req, res, next) => {
    let email = req.body.email
    res.locals.email = email
    let errors = []

    let user = db.get('users').find({ email : email}).value()
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
    if(user.wrongLoginCount >= 4){
        const msg = {
            to: user.email,
            from: 'longhn.B18AT138@stu.ptit.edu.vn',
            subject: 'Your account was blocked for security',
            html: '<strong>You need to check out your account</strong>',
        }
        
        sgMail.send(msg)
            .then(() => {}, err => {
                console.log(err)
                if(err.response)
                    console.log(err.response.body);
            })

        db.get('users').find({ id : user.id }).assign({ wrongLoginCount : 0 }).write()
        res.render('auth/login', {
            errors : [
                'Wrong too much'
            ],
            email : ''
        })
        return
    } else{
        if(bcrypt.compareSync(req.body.password, user.password) === false){
            errors.push('Wrong password')
            user.wrongLoginCount++;
        }
    }

    if(errors.length){
        res.render('auth/login', {
            errors : errors,
        })
        return
    }
    next();
}