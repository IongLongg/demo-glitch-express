const Session = require('../models/session.model')
const Book = require('../models/book.model')
const User = require('../models/user.model')
const Transaction = require('../models/transaction.model')

module.exports.add = async (req, res) => {
    const bookId = req.params.bookId
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    const book = await Book.findById(bookId).exec()
    session.cart.push(book)
    await session.save() 
    res.redirect('/books')
}

module.exports.delete = async (req, res) => {
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    const cart = session.cart.filter(book => book._id.toString() !== req.params.bookId)
    session.cart = cart
    await session.save()
    res.redirect('back')
}

module.exports.view = async (req, res) => {
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    res.render('cart/view',{
        session : session
    })
}

module.exports.save = async (req, res) => {
    const session = await Session.findById(req.signedCookies.sessionId).exec()

    let user = await User.findById(req.signedCookies.userId).exec()
    if(!user){
        user = {
            _id : req.signedCookies.sessionId,
            name : `Session ${req.signedCookies.sessionId}`
        }
    }
    const transactions = await session.cart.map(book => {
        return {
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
    })
    await Transaction.create(transactions)
    session.cart = []
    await session.save()
        
    res.redirect('/transactions')
}
