const shortid = require('shortid')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});

const db = require("../lowdb")

const saltRounds = 5

module.exports.index =  (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.getCreate =  (req, res) => {
    res.render('users/create')
}
module.exports.postCreate =  (req, res) => {
    const user = {
        id : shortid.generate(),
        name : req.body.name,
        email : req.body.email,
        avatar : req.body.avatar,
        password : bcrypt.hashSync(req.body.password, saltRounds),
        isAdmin : false
    }
    
    db.get('users').push(user).write()
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
        // console.log(result, error)
        req.body.avatar = result.url
    })
    
    db.get('users').find({ id: id }).assign(req.body).write()
    res.redirect('back')
}