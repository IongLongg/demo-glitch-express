const db = require('../lowdb')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    let email = req.body.email

    let user = db.get('users').find({ email : email}).value()
    
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