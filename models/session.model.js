const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id : String,
    cart : [Object]
})

const Session = mongoose.model('Session', schema, 'sessions')

module.exports = Session