const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    isAdmin : Boolean,
    avatar : String,
    wrongLoginCount : Number
})

const User = mongoose.model('User', schema, 'users')

module.exports = User