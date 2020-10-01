const shortid = require('shortid')
const cloudinary = require('cloudinary').v2

const db = require("../lowdb")

module.exports.index =  (req, res, next) => {
    const books = db.get('books').value()
    let page = parseInt(req.query.page) || 1
    let perPage = 10
    let start = (page-1) * perPage
    let end = page * perPage

    res.render('books/index', {
        books: books.slice(start, end),
        page : page
    })
}

module.exports.getCreate =  (req, res, next) => {
    res.render('books/create')
}
module.exports.postCreate = async (req, res, next) => {
    req.body.id = shortid.generate()
    await cloudinary.uploader.upload(`./${req.file.path}`, (error, result) => {
        if(!error){
            req.body.cover = result.url
        } else {
            console.log(error)
        }
    })
    db.get('books').push(req.body).write()
    res.redirect('/books')
}

module.exports.search =  (req, res, next) => {
    let title = req.query.title
    title ? title = title.toLowerCase() : title = ''
    let books = db.get('books').value()
    let resultFind = books.filter( (book) => {
        book = book.title.toLowerCase()
        return book.includes(title) === true
    })
    res.render('books/index', {
        books: resultFind,
        value: req.query.title
    })
}

module.exports.getUpdate =  (req, res) => {
    let id = req.params.id
    let book = db.get('books').find({ id: id }).value()
    res.render('books/update', {
        book: book
    })
}

module.exports.postUpdate = async (req, res) => {
    await cloudinary.uploader.upload(`./${req.file.path}`, {
        width : 1429,
        height : 2048,
        crop : 'fill'
    },(error, result) => {
        if(!error){
            req.body.cover = result.url
        } else {
            console.log(error)
        }
    })
    db.get('books').find({ id: req.params.id }).assign(req.body).write()
    res.redirect('/books')
}

module.exports.delete =  (req, res, next) => {
    let id = req.params.id
    db.get('books').remove({ id: id }).write()
    res.redirect('/books')
}