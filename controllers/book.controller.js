const cloudinary = require('cloudinary').v2
const Book = require('../models/book.model')

module.exports.index = async (req, res) => {
    const books = await Book.find()
    res.render('books/index', {
        books: books
    })
}

module.exports.getCreate =  (req, res) => {
    res.render('books/create')
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
    await Book.create(req.body)
    res.redirect('/books')
}

module.exports.search = async (req, res) => {
    const queryTitle = req.query.title.toLowerCase()
    const books = (await Book.find().exec()).filter(book => book.title.toLowerCase().indexOf(queryTitle) !== -1)
                            
    res.render('books/index', {
        books: books,
        searchValue: req.query.title
    })
}

module.exports.getUpdate = async (req, res) => {
    const book = await Book.findOne({_id : req.params.id}).exec()
    res.render('books/update', {
        book: book
    })
}

module.exports.postUpdate = async (req, res) => {
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
    await Book.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.redirect('/books')
}

module.exports.delete = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)
    res.redirect('/books')
}