require('dotenv').config()
require('cloudinary').v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const homeRouter = require('./routes/home.router')
const authRouter = require('./routes/auth.router')
const bookRouter = require('./routes/book.router')
const userRouter = require('./routes/user.router')
const transactionRouter = require('./routes/transaction.router')
const cartRouter = require('./routes/cart.router')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware');

const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware)

app.use('',homeRouter);
app.use('/auth', authRouter)
app.use('/books', bookRouter)
app.use('/users', authMiddleware.requiredAuth, userRouter)
app.use('/transactions', transactionRouter)
app.use('/cart', cartRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))