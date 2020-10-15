const Session = require("../../models/session.model")
const Shop = require("../../models/shop.model")
const User = require('../../models/user.model')
const ShopTransaction = require("../../models/shop.transaction.model")

module.exports.add = async (req, res) => {
    const bookId = req.params.bookId
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    const shop = await Shop.findById(req.signedCookies.shoppingId).exec()
    const book = shop.books.find(book => book.id === bookId)
    session.cart.push(book)
    await session.save() 
    res.redirect('/shop/books')
}

module.exports.view = async (req, res) => {
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    res.render('shop/cart/view',{
        session : session
    })
}

module.exports.delete = async (req, res) => {
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    const cart = session.cart.filter(book => book.id !== req.params.bookId)
    session.cart = cart
    await session.save()
    res.redirect('back')
}

module.exports.save = async (req, res) => {
    const session = await Session.findById(req.signedCookies.sessionId).exec()
    const shop = await Shop.findById(req.signedCookies.shoppingId).exec()

    let user = await User.findById(req.signedCookies.userId).exec()
    if(!user){
        user = {
            _id : req.signedCookies.sessionId,
            name : `Session ${req.signedCookies.sessionId}`
        }
    }
    const shopTransactions = await session.cart.map(book => {
        return {
            shop : {
                id : shop._id,
                name : shop.name
            },
            user : {
                id : user._id,
                name : user.name
            },
            book : {
                id : book.id,
                title : book.title
            },
            isComplete : false
        }
    })
    await ShopTransaction.create(shopTransactions)
    session.cart = []
    await session.save()
        
    res.redirect('/shop/transactions')
}
