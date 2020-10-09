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

module.exports.logout = (req,res) => {
    res.clearCookie('userId')
    res.clearCookie('sessionId')
    res.redirect('/')
}