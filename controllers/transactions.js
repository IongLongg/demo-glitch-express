const db = require('../lowdb')
const shortid = require('shortid')

module.exports.index = function (req, res, next) {
    let userId = req.signedCookies.userId
    let user = db.get('users').find({ id : userId }).value()
    let transactions
    
    if(user.isAdmin){
        transactions = db.get('transactions').value()
    } else{
        transactions = db.get('transactions').filter(tran => tran.user.id === userId).value()
    }
    
    res.render('transactions/index', {
        transactions: transactions
    })
}

module.exports.getCreate = function (req, res, next) {
    var user = db.get('users').find({ id : req.signedCookies.userId}).value()
    
    var dbBooks = db.get('books').value()
    var dbUsers = db.get('users').value()
    res.render('transactions/create', {
        books: dbBooks,
        users: dbUsers,
        isAdmin: user.isAdmin
    })
}
module.exports.postCreate = function (req, res, next) {
    var reqUser = req.body.user || ''
    var reqBook = req.body.book
    var idUser = reqUser==='' ? req.signedCookies.userId : reqUser.slice(0, reqUser.indexOf('|'))
    var nameUser = reqUser==='' ? db.get('users').find({ id : req.signedCookies.userId}).value().name 
                                : reqUser.slice(reqUser.indexOf('|') + 1)
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
    
    var transactions = db.get('transactions').value();
    if(transactions.find(tran => tran.id === idTransaction))
        db.get('transactions').find({ id: idTransaction }).assign({ isComplete : true}).write()
    else
        console.log('Cant find');
    res.redirect('/transactions')
}