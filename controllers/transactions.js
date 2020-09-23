const db = require('../lowdb')
const shortid = require('shortid')

module.exports.index =  (req, res, next) => {
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

module.exports.getCreate =  (req, res, next) => {
    const user = db.get('users').find({ id : req.signedCookies.userId}).value()
    
    const dbBooks = db.get('books').value()
    const dbUsers = db.get('users').value()
    res.render('transactions/create', {
        books: dbBooks,
        users: dbUsers,
        isAdmin: user.isAdmin
    })
}
module.exports.postCreate =  (req, res, next) => {
    let reqUser = req.body.user || ''
    let reqBook = req.body.book
    let idUser = reqUser==='' ? req.signedCookies.userId : reqUser.slice(0, reqUser.indexOf('|'))
    let nameUser = reqUser==='' ? db.get('users').find({ id : req.signedCookies.userId}).value().name 
                                : reqUser.slice(reqUser.indexOf('|') + 1)
    let idBook = reqBook.slice(0, reqBook.indexOf('|'))
    let nameBook = reqBook.slice(reqBook.indexOf('|') + 1)

    let dataTransaction = {
        id: shortid.generate(),
        user: { id: idUser, name: nameUser },
        book: { id: idBook, name: nameBook },
        isComplete: false
    }
    db.get('transactions').push(dataTransaction).write()
    res.redirect('/transactions')
}

module.exports.search =  (req, res, next) => {
    let reqName = req.query.name
    reqName ? reqName = reqName.toLowerCase() : ''
    let dbTransactions = db.get('transactions').value()
    let resultSearch = dbTransactions.filter( (transaction) => {
        let nameUser = transaction.user.name.toLowerCase()
        return nameUser.includes(reqName) === true
    })
    res.render('transactions/index', {
        transactions: resultSearch,
        inputSearch: req.query.name
    })
}

module.exports.isComplete =  (req, res, next) => {
    let idTransaction = req.params.id
    
    const transactions = db.get('transactions').value();
    if(transactions.find(tran => tran.id === idTransaction))
        db.get('transactions').find({ id: idTransaction }).assign({ isComplete : true}).write()
    else
        console.log('Cant find');
    res.redirect('/transactions')
}