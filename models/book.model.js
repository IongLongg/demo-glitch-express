const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title : String,
    cover : String,
    description : String
})

const Book = mongoose.model('Book', schema, 'books')

module.exports = Book