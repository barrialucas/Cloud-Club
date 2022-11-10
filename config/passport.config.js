const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const Users = require("../services/DB/models/users")

const bcryptjs = require("bcryptjs")
const sendEmail=require('./ethereal')

require('dotenv').config();

const initPassport = () => {
  passport.use('login', new LocalStrategy(
    async (username, password, done) => {
      const user = await Users.findOne({
        username
      });
      if (!user) {
        return done(null, false);
      }
      const validPass = bcryptjs.compareSync(password, user.password);
      if (!validPass) {
        return done(null, false);
      }

      return done(null, user);
    }
  ))


  passport.use('signup', new LocalStrategy({passReqToCallback: true,},

    async (req, username, password, done) => {
      try {
        if (await Users.exists({ username })) {
          console.log('email existente');
          return done(null, false, {
            message: "This mail already exists, login"
          });
        }

          const user = await Users.create ({
            username,
            password,
            adress:req.body.adress,
            age:req.body.age,
            name:req.body.name,
            phone:req.body.phone,
            avatar:req.body.avatar,
            date: Date.now().toString(),
          })
          done(null,{
            ...user,
            id: user._id
          })


          sendEmail.enviarEthereal(
            process.env.EMAIL_ADMIN,
            'Nuevo Registro',
            JSON.stringify(user)
      )
                   
      }
      catch(err){
        console.log(err);
      } 
}))
    
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    Users.findById(id, done)
  })

}


module.exports = {
  initPassport
}