module.exports.index = function (req, res, next) {
    res.render('home', {
        content : 'Welcome to your book list'
    })
}