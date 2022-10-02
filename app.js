const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
require("dotenv").config()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { initPassport } = require('./config/passport.config.js');
const path = require('path');

/////////////////

//const RUTAS//
const generalRouter=require("./routes/general.route")
const userRouter=require("./routes/login2.route")
const productRouter =require('./routes/prod.route.js');
const sneakersRouter =require('./routes/sneakersAll.route.js')
const cartRouter=require('./routes/cart.route')

//settings
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 50000*10,
    secure: false,
    httpOnly: true
  }
}))
initPassport();
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//views
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

app.use('/src', express.static(path.join(__dirname,'src')));

/////////////////////////////End Config///////////////////////////////////////////


//ROUTES

//home y account
app.use('/', generalRouter)
//login 
app.use('/api', userRouter)
//prod admin 
app.use('/admin', productRouter)
//sneakers 
app.use('/sneakers', sneakersRouter)
//cart
app.use('/cart', cartRouter )



module.exports = httpServer,io;