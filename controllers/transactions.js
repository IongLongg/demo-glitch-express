var db = require('../lowdb')
var shortid = require('shortid')

module.exports.index = function (req, res, next) {
    var dbTransactions = db.get('transactions').value()
    res.render('transactions/index', {
        transactions: dbTransactions
    })
}

module.exports.getCreate = function (req, res, next) {
    var dbBooks = db.get('books').value()
    var dbUsers = db.get('users').value()
    res.render('transactions/create', {
        books: dbBooks,
        users: dbUsers
    })
}
module.exports.postCreate = function (req, res, next) {
    var reqUser = req.body.user
    var reqBook = req.body.book
    var idUser = reqUser.slice(0, reqUser.indexOf('|'))
    var nameUser = reqUser.slice(reqUser.indexOf('|') + 1)
    var idBook = reqBook.slice(0, reqBook.indexOf('|'))
    var nameBook = reqBook.slice(reqBook.indexOf('|') + 1)

    var dataTransaction = {
        id: shortid.generate(),
        user: { id: idUser, name: nameUser },
        book: { id: idBook, name: nameBook },
        isComplete: false
    }
    db.get('transactions').push(dataTransaction).write()
    res.redirect('/transactions')
}

module.exports.search = function (req, res, next) {
    var reqName = req.query.name
    reqName ? reqName = reqName.toLowerCase() : ''
    var dbTransactions = db.get('transactions').value()
    var resultSearch = dbTransactions.filter(function (transaction) {
        var nameUser = transaction.user.name.toLowerCase()
        return nameUser.includes(reqName) === true
    })
    res.render('transactions/index', {
        transactions: resultSearch,
        inputSearch: req.query.name
    })
}

module.exports.isComplete = function (req, res, next) {
    var idTransaction = req.params.id
    db.get('transactions').find({ id: idTransaction }).assign({ isComplete : true}).write()
    res.redirect('/transactions')
}