const db = require('../lowdb')
const shortid = require('shortid')

module.exports.index =  (req, res, next) => {
    // TODO: session transaction
    let transactions = db.get('transactions').value()

    let reqId = req.signedCookies.userId || req.signedCookies.sessionId
    if(!res.locals.isAdmin){
        transactions = transactions.filter(tran => tran.user.id === reqId)
    } 
    
    res.render('transactions/index', {
        transactions: transactions
    })
}

module.exports.getCreate =  (req, res, next) => {
    let users = db.get('users').value()
    let books = db.get('books').value()
    if(!res.locals.isAdmin){
        users = users.find(user => user.id === req.signedCookies.userId)
    }

    res.render('transactions/create', {
        books : books,
        users : users
    })
}

module.exports.postCreate =  (req, res, next) => {
    const user = db.get('users').find({ id : req.body.userId }).value()
    const book = db.get('books').find({ id : req.body.bookId }).value()
    const transaction = {
        id : shortid.generate(),
        user : {
            id : user.id,
            name : user.name
        },
        book : {
            id : book.id,
            title : book.title
        },
        isComplete : false
    }
    db.get('transactions').push(transaction).write()
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