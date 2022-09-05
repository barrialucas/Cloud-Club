const passport = require('passport')
const LocalStrategy= require("passport-local").Strategy
const Users=require("../models/users")
const bcryptjs=require("bcryptjs")

const initPassport = () => {
passport.use('login', new LocalStrategy(
    async ( username, password, done ) => {
      const user = await Users.findOne({ username });
      if( !user ) {
        return done( null, false);
      }
      const validPass = bcryptjs.compareSync( password, user.password );
      if( !validPass ){
        return done( null, false);
      }
  
      return done( null, user );
    }
  ) )
  
  
  passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password,done) => {
        Users.findOne({username}, (err, user) => {
            if(err) return done(err)
            if (user) {
              return done(null, false)
            }
            const newUser = { username, password,date: Date.now().toString() }
            const userss=Users(req.body)
            userss.save(newUser, (err, userWithID) => {
                  if(err) return done(err)
                  return done(null, userWithID)
            })
        })
  
    }
  ))


  
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    Users.findById(id, done)
  })

  
}


module.exports = {initPassport}