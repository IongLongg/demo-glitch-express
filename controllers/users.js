var shortid = require('shortid')

var db = require("../lowdb")

module.exports.index = function (req, res, next) {
    var users = db.get('users').value()
    res.render('users/index', {
        users: users
    })
}

module.exports.getCreate = function (req, res, next) {
    res.render('users/create')
}
module.exports.postCreate = function (req, res, next) {
    var name = req.body.name
    db.get('users').push({
        id: shortid.generate(),
        name: name
    }).write()
    res.redirect('/users')
}

module.exports.search = function (req, res, next) {
    var name = req.query.name
    name ? name = name.toLowerCase() : name = ''
    var users = db.get('users').value()
    var resultSearch = users.filter(function (user) {
        user = user.name.toLowerCase()
        return user.includes(name) === true
    })
    res.render('users/index', {
        users: resultSearch,
        inputSearch: req.query.name
    })
}

module.exports.view = function (req, res, next) {
    var id = req.params.id
    var user = db.get('users').find({ id: id }).value()
    res.render('users/info-user', {
        user: user
    })
}

module.exports.delete = function (req, res, next) {
    var id = req.params.id
    db.get('users').remove({ id: id }).write()
    res.redirect('/users')
}

module.exports.getEdit = function (req, res, next) {
    var id = req.params.id
    var user = db.get('users').find({ id: id }).value()
    res.render('users/edit-user', {
        user: user
    })
}
module.exports.postEdit = function (req, res, next) {
    var id = req.params.id
    var name = req.body.name
    db.get('users').find({ id: id }).assign({ name: name }).write()
    res.redirect('/users')
}