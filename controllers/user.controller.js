const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const cloudinary = require('cloudinary').v2

const saltRounds = 10

module.exports.index = async (req, res) => {
    const users = await User.find().exec()
    
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

module.exports.getProfile = async (req, res) => {
    res.render('users/profile', {
        user: await User.findById(req.params.id).exec()
    })
}

module.exports.postProfile = async (req, res) => {
    await cloudinary.uploader.upload(`./${req.file.path}`, (error, result) => {
        if(!error){
            req.body.avatar = result.url
        } else {
            console.log(error)
        }
    })
    
    await User.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.redirect('back')
}