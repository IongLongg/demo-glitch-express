const Book = require("../models/book.model")
const Transaction = require("../models/transaction.model")
const User = require("../models/user.model")

module.exports.index = async (req, res) => {
    let reqId = req.signedCookies.userId || req.signedCookies.sessionId

    const transactions = await Transaction.find().exec()

    res.render('transactions/index', {
        transactions: transactions.filter(tran => tran.user.id === reqId)
    })
}

module.exports.getCreate = async (req, res) => {
    const users = await User.find().exec()
    const books = await Book.find().exec()

    res.render('transactions/create', {
        books : books,
        users : users.filter(user => user._id.toString() === req.signedCookies.userId)
    })
}

module.exports.postCreate = async (req, res) => {
    const user = await User.findById(req.body.userId).exec()
    const book = await Book.findById(req.body.bookId).exec()
    const transaction = {
        user : {
            id : user._id,
            name : user.name
        },
        book : {
            id : book._id,
            title : book.title
        },
        isComplete : false
    }
    await Transaction.create(transaction)
    res.redirect('/transactions')
}

module.exports.search =  (req, res) => {
    // TODO: search
}

module.exports.isComplete = async (req, res) => {
    await Transaction.findByIdAndUpdate(req.params.id, {isComplete : true}, {new : true})
    res.redirect('back')
}