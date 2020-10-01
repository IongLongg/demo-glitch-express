const db = require('../lowdb')

module.exports.home = (req, res) => {
    const user = db.get('users').find({ id : req.signedCookies.userId }).value()
    res.render('home', {
        user : user
    })
}