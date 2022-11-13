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
const logger=require('./utils/loggers/logger')
/////////////////

//RUTAS//
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

//////////////////////////////////End Config//////////////////////////////////

/*--------CHAT--------*/
const Msg=require("./services/DB/models/msg.model.js")
io.on(`connection`, (socket)=>{
  
    Msg.find({}, function (err, docs) {
      socket.emit (`message`, docs)
    })

    socket.on("new-msg", (data) => {
      const msg= new Msg({
        name:data.name,
        text:data.text,
        date:data.fecha
      })

      msg.save()
      .then(()=>{io.emit('message', msg)})
      .catch((err) => logger.error(err))
    });
})

/*--------------------------------------*/

//ROUTES

app.use('/', generalRouter)
app.use('/api', userRouter)
app.use('/admin', productRouter)
app.use('/sneakers', sneakersRouter)
app.use('/cart', cartRouter)

app.use('/*',(req,res)=>{
  res.render('notfound')
})



module.exports = httpServer,io;