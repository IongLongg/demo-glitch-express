const shortid = require("shortid")
const db = require("../lowdb")

module.exports.add = (req, res) => {
    const bookId = req.params.bookId
    const sessionId = req.signedCookies.sessionId
    let cart = db.get('sessions')
                    .find({ id: sessionId })
                    .get('cart')
                    .value()
    if(cart.find(book => book.id === bookId)){
        res.redirect('back')
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

module.exports.delete = (req, res) => {
    db.get('sessions')
        .find({ id : req.signedCookies.sessionId })
        .get('cart')
        .remove({ id : req.params.bookId })
        .write()
    res.redirect('back')
}

module.exports.view = (req, res) => {
    const session = db.get('sessions').find({ id : req.signedCookies.sessionId }).value()
    
    res.render('cart/view',{
        session : session
    })
}

module.exports.save = (req, res) => {
    const session = db.get('sessions').find({ id : req.signedCookies.sessionId }).value()

    let user = db.get('users').find({ id : req.signedCookies.userId}).value()
    if(!user){
        user = {
            id : req.signedCookies.sessionId,
            name : `Session ${req.signedCookies.sessionId}`
        }
    }
    session.cart.map(book => {
        const newTransaction = {
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
        db.get('transactions').push(newTransaction).write()
    })
    res.redirect('/transactions')
}
