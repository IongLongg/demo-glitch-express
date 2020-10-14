const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')

const Session = require('../../models/session.model')
const Shop = require("../../models/shop.model")

module.exports.getLogin = (req,res) => {
    res.render('shop/auth/login')
}

module.exports.postLogin = async (req, res) => {
    const shop = await Shop.findOne({email : req.body.email}).exec()
    
    res.cookie("shopId", shop.id, {
        signed : true
    })
    res.redirect(`/shop/${shop.id}`)
}

module.exports.logout = async (req, res) => {
    res.clearCookie('sessionId')
    res.clearCookie('shopId')
    await Session.findByIdAndDelete(req.signedCookies.sessionId)
    res.redirect('back')
}

module.exports.getSignup = (req, res) => {
    res.render('shop/auth/signup')
}

module.exports.postSignup = async (req, res) => {
    await cloudinary.uploader.upload(`./${req.file.path}`, (error, result) => {
        if(!error){
            req.body.logo = result.url
        } else {
            console.log(error)
        }
    })
    let hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    await Shop.create(req.body)
    res.redirect('/shop/auth/login')
}