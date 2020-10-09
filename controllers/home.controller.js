const User = require("../models/user.model")

module.exports.home = async (req, res) => {
    const user = await User.findById(req.signedCookies.userId).exec()
    res.render('home', {
        user : user
    })
}