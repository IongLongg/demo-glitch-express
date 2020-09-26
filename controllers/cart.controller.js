const { write } = require("lowdb/adapters/FileSync")
const shortid = require("shortid")
const { value } = require("../lowdb")
const db = require("../lowdb")

module.exports.add = (req, res) => {
    const bookId = req.params.bookId
    const sessionId = req.signedCookies.sessionId
    let cart = db.get('sessions')
                    .find({ id: sessionId })
                    .get('cart')
                    .value()
    if(cart.find(id => id === bookId)){
        res.redirect('/books')
        return
    }
    cart.push(bookId)
    db.get('sessions')
        .find({ id : sessionId })
        .assign({cart})
        .write()
    res.locals.alert = 'success'
    res.redirect('/books')
}