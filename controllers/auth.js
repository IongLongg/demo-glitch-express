var db = require('../lowdb')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    var email = req.body.email
    var password = req.body.password

    var user = db.get('users').find({ email : email}).value()
    
    res.cookie("userId", user.id)
    res.redirect('/')
}