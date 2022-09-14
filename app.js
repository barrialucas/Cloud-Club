const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
require("dotenv").config()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { initPassport } = require('./config/passport.config.js');
/////////////////
const routesLogin = require('./routes/login')
const routesHome =require('./routes/home')
const routeProd=require('./routes/prod_carga')
const routeShoes=require('./routes/shoes')
const routeSneak=require('./routes/sneakers')
const routeCart=require('./routes/cart')

const auth= require('./controllers/auth')
const path = require('path');


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

//info
app.get('/info', routesHome.info)
//home
app.get('/', routesHome.getRoot)
//login
app.get('/login', routesLogin.getLogin)
app.post('/login', passport.authenticate('login',{
  failureRedirect: '/loginError',
  successRedirect: "/account",
  failureFlash: true
}),routesLogin.postLogin
)
//account

app.get('/account',auth,routesLogin.account)


//register
app.get('/signup', routesLogin.getSignup)
app.post('/signup',
passport.authenticate('signup', {failureRedirect: '/signupError'}),
routesLogin.postSignup
)
//error
app.get('/loginError', routesLogin.loginError)
app.get('/signupError', routesLogin.signupError)

//logout
app.get('/logout',routesLogin.getLogout)



//prod admin
app.get('/admin',routeProd.getProd)
app.post('/admin', routeProd.postProd)
app.delete('/delete/:id', routeProd.deleteProd)


//sneakers
app.get('/sneakers',auth,routeSneak.getSneakers)
//vistas producto especifico
app.get('/sneakers/:id',auth, routeShoes.getShoesProd)


//cart
app.get('/cart',auth,routeCart.getCart)
app.post('/cart',auth,routeCart.postCart)
app.delete('/cart',auth, routeCart.deleteCart)
app.delete('/cart/:prod',auth, routeCart.deleteProdCart)


app.post('/order',auth,routeCart.order)




module.exports = httpServer,io;