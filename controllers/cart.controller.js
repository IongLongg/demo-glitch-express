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
    const book = db.get('books').find({ id : bookId }).value()
    cart.push(book)
    db.get('sessions')
        .find({ id : sessionId })
        .assign({cart})
        .write()
    res.redirect('/books')
}

module.exports.view = (req, res) => {
    const session = db.get('sessions').find({ id : req.signedCookies.sessionId }).value()
    
    res.render('cart/view',{
        session : session
    })
}