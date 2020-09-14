module.exports.index = function (req, res, next) {
    res.render('home', {
        content: 'Hello Coder Tokyo'
    })
}