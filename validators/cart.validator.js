const Book = require("../models/book.model")
const Session = require("../models/session.model")
const Shop = require("../models/shop.model")

module.exports.isExisted = async (req, res, next) => {
    const bookId = req.params.bookId
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    
    if(session.cart.find(book => book._id.toString() === bookId)){
        res.render('books/index', {
            books : await Book.find().exec(),
            error : 'This book is already in your cart !'
        })
        return 
    }
    next()
}

module.exports.isExistedShop = async (req, res, next) => {
    const bookId = req.params.bookId
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    const shop = await Shop.findById(req.signedCookies.shoppingId).exec()
    
    if(session.cart.find(book => book.id === bookId)){
        res.render('shop/book/index', {
            books : shop.books,
            error : 'This book is already in your cart !'
        })
        return 
    }
    next()
}