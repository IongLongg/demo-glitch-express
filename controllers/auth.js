const db = require('../lowdb')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let user = db.get('users').find({ email : email}).value()
    
    res.cookie("userId", user.id)
    res.redirect('/')
}