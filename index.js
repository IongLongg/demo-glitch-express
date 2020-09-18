var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var routeHello = require('./routes/hello')
var routeAuth = require('./routes/auth')
var routeBooks = require('./routes/books')
var routerUsers = require('./routes/users')
var routerTransactions = require('./routes/transactions')

var authMiddleware = require('./middlewares/auth-middleware')

var app = express()
var port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/', routeHello)
app.use('/auth', routeAuth)
app.use('/books', authMiddleware.requiredAuth ,routeBooks)
app.use('/users', authMiddleware.requiredAuth, authMiddleware.requiredAdmin ,routerUsers)
app.use('/transactions', authMiddleware.requiredAuth, routerTransactions)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))