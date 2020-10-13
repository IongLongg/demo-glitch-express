const User = require("../models/user.model")

module.exports.home = (req, res) => {
    User.findById(req.signedCookies.userId)
        .then(user => res.render('home', {
            user : user
        }))
        .catch(err => {throw new Error(err)})   
}