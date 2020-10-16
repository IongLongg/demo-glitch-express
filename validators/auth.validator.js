const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const User = require('../models/user.model')
const Shop = require('../models/shop.model')

module.exports.postLogin = async (req, res, next) => {
    const reqEmail = req.body.email
    // res.locals.email = email
    const errors = []

    const user = await User.findOne({email : reqEmail}).exec()
    console.log(await User.find());
    if(!user){
        errors.push('User does not exist')
        res.render('auth/login', {
            errors : errors
        })
        return
    }
    if(user.wrongLoginCount > 3){
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

        user.wrongLoginCount = 0
        await user.save()
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
            user.wrongLoginCount++
            await user.save()
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

module.exports.postShopLogin = async (req, res, next) => {
    const reqEmail = req.body.email
    const errors = []

    const shop = await Shop.findOne({email : reqEmail}).exec()
    if(!shop){
        errors.push('Shop does not exist')
        res.render('shop/auth/login', {
            errors : errors
        })
        return
    }

    if(bcrypt.compareSync(req.body.password, shop.password) === false){
        errors.push('Wrong password')
    }

    if(errors.length){
        res.render('shop/auth/login', {
            errors : errors,
        })
        return
    }
    next();
} 