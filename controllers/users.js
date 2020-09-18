const shortid = require('shortid')
const bcrypt = require('bcrypt')

const db = require("../lowdb")

const saltRounds = 5

module.exports.index = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.getCreate = function (req, res) {
    res.render('users/create')
}
module.exports.postCreate = function (req, res) {
    const user = {
        id : shortid.generate(),
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, saltRounds),
        isAdmin : false
    }
    
    db.get('users').push(user).write()
    res.redirect('/users')
}

module.exports.delete = function (req, res) {
    let id = req.params.id
    db.get('users').remove({ id: id }).write()
    res.redirect('/users')
}

module.exports.getUpdate = function (req, res) {
    let id = req.params.id
    let user = db.get('users').find({ id: id }).value()
    res.render('users/update', {
        user: user
    })
}

module.exports.postUpdate = function (req, res) {
    var id = req.params.id
    var name = req.body.name
    db.get('users').find({ id: id }).assign({ name: name }).write()
    res.redirect('/users')
}