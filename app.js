const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
require("dotenv").config()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { initPassport } = require('./config/passport.config.js');
const routesLogin = require('./routes/login')
const routesHome =require('./routes/home')
const routeProd=require('./routes/prod_carga')
const routeShoes=require('./routes/shoes')
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

app.use('/public', express.static('public'));



/////////////////////////////End Config///////////////////////////////////////////


//ROUTES

//info
app.get('/info', routesHome.info)
//home
app.get('/', routesHome.getRoot)
//login
app.get('/login', routesLogin.getLogin)
app.post('/login',
passport.authenticate('login',{failureRedirect: '/loginError'}),
routesLogin.postLogin
)
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

//verify
app.get("/index", routesLogin.checkAuthentication)

//prod admin
app.get('/admin',routeProd.getProd)
app.post('/admin', routeProd.postProd)
app.delete('/admin/:id', routeProd.deleteProd)

//vistas producto especifico
app.get('/shoes/:id',routeShoes.getShoesProd)





module.exports = httpServer,io;