const shortid = require('shortid')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2


const db = require("../lowdb")

const saltRounds = 10

module.exports.index =  (req, res) => {
    let users = db.get('users').value()
    if(!res.locals.isAdmin){
        users = users.filter(user => user.id === req.signedCookies.userId)
    }
    res.render('users/index', {
        users: users
    })
}

module.exports.getCreate =  (req, res) => {
    res.render('users/create')
}
module.exports.postCreate = async (req, res) => {
    req.body.id = shortid.generate()
    await cloudinary.uploader.upload(`./${req.file.path}`, (error, result) => {
        if(!error){
            req.body.avatar = result.url
        } else {
            console.log(error)
        }
    })
    let hashPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashPassword
    db.get('users').push(req.body).write()
    res.redirect('/users')
}

module.exports.delete =  (req, res) => {
    let id = req.params.id
    db.get('users').remove({ id: id }).write()
    res.redirect('/users')
}

module.exports.getProfile =  (req, res) => {
    let id = req.params.id
    let user = db.get('users').find({ id: id }).value()
    res.render('users/profile', {
        user: user
    })
}

module.exports.postProfile = async (req, res) => {
    let id = req.params.id
    await cloudinary.uploader.upload(`./${req.file.path}`, (error, result) => {
        if(!error){
            req.body.avatar = result.url
        } else {
            console.log(error)
        }
    })
    
    db.get('users').find({ id: id }).assign(req.body).write()
    res.redirect('back')
}