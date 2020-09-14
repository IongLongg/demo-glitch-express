var shortid = require('shortid')

var db = require("../lowdb")

module.exports.index = function (req, res, next) {
    var books = db.get('books').value()
    res.render('books/index', {
        books: books
    })
}

module.exports.getCreate = function (req, res, next) {
    res.render('books/create')
}
module.exports.postCreate = function (req, res, next) {
    var reqBook = req.body.nameBook
    db.get('books').push({
        id: shortid.generate(),
        name: reqBook
    }).write()
    res.redirect('/books')
}

module.exports.search = function (req, res, next) {
    var name = req.query.name
    name ? name = name.toLowerCase() : name = ''
    var books = db.get('books').value()
    var resultFind = books.filter(function (book) {
        book = book.name.toLowerCase()
        return book.includes(name) === true
    })
    res.render('books/index', {
        books: resultFind,
        value: req.query.name
    })
}

module.exports.view = function (req, res, next) {
    var id = req.params.id
    var book = db.get('books').find({ id: id }).value()
    res.render('books/info', {
        id: id,
        name: book.name
    })
}

module.exports.delete = function (req, res, next) {
    var id = req.params.id
    db.get('books').remove({ id: id }).write()
    res.redirect('/books')
}