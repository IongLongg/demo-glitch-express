const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    shopId : {
        id : String,
        name : String
    },
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

const ShopTransaction = mongoose.model('ShopTransaction', schema, 'shopTransactions')

module.exports = ShopTransaction