const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user : {
        id : String,
        name : String
    },
    book : {
        id : String,
        title : String
    },
    isComplete : Boolean
})

const Transaction = mongoose.model('Transaction', schema, 'transactions')

module.exports = Transaction