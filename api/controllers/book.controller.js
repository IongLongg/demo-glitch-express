const Book = require('../../models/book.model')

const message = (opt) =>  {
    return {
        message : `Endpoint/${opt} does not exist`
    }
}

module.exports.index = async (req, res) => {
    const queryTitle = req.query.title ? req.query.title.toLowerCase() : ''
    const books = (await Book.find().exec()).filter(book => book.title.toLowerCase().indexOf(queryTitle) !== -1)
    if(!books){
        res.json(message(req.query.title))
        return
    }
    res.json(books)
}

module.exports.getById = (req, res) => {
    const bookId = req.params.id
    Book.findById(bookId).then(book => {
        res.status(200).json(book)
    }).catch(err => res.status(404).json(message(bookId)))
}

module.exports.delete = async (req, res) => {
    const bookId = req.params.id
    Book.findByIdAndDelete(bookId)
        .then(status => res.status(200).json({message : 'Deleted !'}))
        .catch(err => res.status(404).json(message(bookId))) 
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

