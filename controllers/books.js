const shortid = require('shortid')

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
module.exports.postCreate =  (req, res, next) => {
    let reqTitle = req.body.title
    let reqDescription = req.body.description
    db.get('books').push({
        id: shortid.generate(),
        title: reqTitle,
        description: reqDescription
    }).write()
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

module.exports.postUpdate =  (req, res) => {
    let id = req.params.id
    let title = req.body.title
    let description = req.body.description
    db.get('books').find({ id: id }).assign({ title: title, description: description }).write()
    res.redirect('/books')
}

module.exports.delete =  (req, res, next) => {
    let id = req.params.id
    db.get('books').remove({ id: id }).write()
    res.redirect('/books')
}