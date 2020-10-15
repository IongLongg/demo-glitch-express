const cloudinary = require('cloudinary').v2
const shortid = require('shortid')
const Shop = require("../../models/shop.model")

module.exports.index = async (req, res) => {
    const shop = await Shop.findById(req.signedCookies.shoppingId).exec()
    res.render('shop/book/index', {
        books : shop.books
    })
}

module.exports.create = (req, res) => {
    res.render('shop/book/create')
}

module.exports.postCreate = async (req, res) => {
    await cloudinary.uploader.upload(`./${req.file.path}`, {
        width : 1429,
        height : 2048,
        crop : 'fill'
    },(error, result) => {
        if(!error){
            req.body.cover = result.url
        } else {
            console.log(error)
        }
    })
    req.body.id = shortid.generate()

    const shop = await Shop.findById(req.signedCookies.shopId).exec()
    shop.books.push(req.body)
    await shop.save()

    res.redirect('/shop/books')
}

module.exports.search = async (req, res) => {
    const queryTitle = req.query.title.toLowerCase()
    const shop = await Shop.findById(req.signedCookies.shopId).exec()
    const books = shop.books.filter(book => book.title.toLowerCase().indexOf(queryTitle) !== -1)
                            
    res.render('shop/book/index', {
        books: books,
        searchValue: req.query.title
    })
}