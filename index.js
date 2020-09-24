require('dotenv').config()
require('cloudinary').v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const homeRoute = require('./routes/home')
const routeAuth = require('./routes/auth')
const routeBooks = require('./routes/books')
const routerUsers = require('./routes/users')
const routerTransactions = require('./routes/transactions')

const authMiddleware = require('./middlewares/auth-middleware')

const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(process.env.SESSION_SECRET))

app.use('', homeRoute);
app.use('/auth', routeAuth)
app.use('/books',routeBooks)
app.use('/users', authMiddleware.requiredAuth, routerUsers)
app.use('/transactions', authMiddleware.requiredAuth, routerTransactions)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))