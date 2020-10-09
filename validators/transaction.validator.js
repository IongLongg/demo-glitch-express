const Book = require("../models/book.model")
const Transaction = require("../models/transaction.model")
const User = require("../models/user.model")

module.exports.isTransaction = async (req, res, next) => {
    const errors = []
    const transaction = await Transaction.findById(req.params.id).exec()
    if(!transaction)
        errors.push('Transaction is not exist')

    if(errors.length){
        res.render('transactions/index', {
            errors : errors,
            transactions : transactions
        })
        return
    }   
    
    next()
}


module.exports.transactionForAdmin = async (req, res, next) => {
    if(res.locals.isAdmin){
        res.render('transactions/index', {
            transactions: await Transaction.find().exec()
        })
        return
    }
    next()
}

module.exports.createTransactionForAdmin = async (req, res, next) => {
    if(res.locals.isAdmin){
        res.render('transactions/create', {
            books : await Book.find().exec(),
            users : await User.find().exec()
        })
        return
    }
    next()
}