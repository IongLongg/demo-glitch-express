const Book = require('../../models/book.model')

const errorMessage = (opt) =>  {
    return {
        message : `Endpoint/${opt} does not exist`
    }
}

module.exports.index = async (req, res) => {
    const queryTitle = req.query.title ? req.query.title.toLowerCase() : ''
    const books = (await Book.find().exec()).filter(book => book.title.toLowerCase().indexOf(queryTitle) !== -1)
    if(!books){
        res.json(errorMessage(req.query.title))
        return
    }
    res.json(books)
}

module.exports.getById = async (req, res) => {
    const bookId = req.params.id
    console.log(bookId);
    const book = await Book.findById(bookId).exec()
    if(!book){
        res.json(errorMessage(bookId))
        return
    }
    res.json(book)
}

module.exports.delete = async (req, res) => {
    const bookId = req.params.id
    const book = await Book.findByIdAndDelete(bookId).exec()
    if(!book){
        res.json(errorMessage(bookId))
        return
    }
    res.json({
        message : 'Deleted !'
    })
}

module.exports.create = (req, res, next) => {
    Book.create(req.body)
        .then(book => res.json(book))
        .catch(next)
}

module.exports.update = (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then(book => res.json(book))
        .catch(next => res.json({
            message : `Not found user ${next.value}`
        }))
}

