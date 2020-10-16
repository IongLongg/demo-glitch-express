const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')

const Session = require('../models/session.model')
const User = require('../models/user.model')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = async (req, res) => {
    const user = await User.findOne({email : req.body.email}).exec()
    
    res.cookie("userId", user.id, {
        signed : true
    })
    res.redirect('/')
}

module.exports.logout = async (req,res) => {
    res.clearCookie('userId')
    res.clearCookie('sessionId')
    await Session.findByIdAndDelete(req.signedCookies.sessionId)
    res.redirect('/login')
}

module.exports.signup =  (req, res) => {
    res.render('users/create')
}
module.exports.postSignup = async (req, res) => {
    await cloudinary.uploader.upload(`./${req.file.path}`, (error, result) => {
        if(!error){
            req.body.avatar = result.url
        } else {
            console.log(error)
        }
    })
    let hashPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashPassword
    await User.create(req.body)
    res.redirect('/auth/login')
}