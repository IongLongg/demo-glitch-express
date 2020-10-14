const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : Number,
    logo : String,
    books : [Object]
})

const Shop = mongoose.model('Shop', schema, 'shops')

module.exports = Shop