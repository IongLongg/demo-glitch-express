var express = require('express')
var bodyParser = require('body-parser')

var routeHello = require('./routes/hello')
var routeBooks = require('./routes/books')
var routerUsers = require('./routes/users')
var routerTransactions = require('./routes/transactions')

var app = express()
var port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routeHello)
app.use('/books', routeBooks)
app.use('/users', routerUsers)
app.use('/transactions', routerTransactions)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))