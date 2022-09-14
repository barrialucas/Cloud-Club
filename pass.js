passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
  },
  (req, username, password, done) => {
      Users.findOne({username}, (err, user) => {
        if (err) return done(err)
        if (user) {
          return done(null, false)
        }


        const newUser = {
          username,
          password,
          adress:req.body.adress,
          age:req.body.age,
          name:req.body.name,
          phone:req.body.phone,
          date: Date.now().toString(),
        }

        const userss = Users(req.body)

        userss
            .save(newUser, (err, userWithID) => {
              if (err) return done(err)
              return done(null, userWithID)
            })

            const cart= Cart.create({ user:_id.toString() })
            console.log('Carro creado '+ cart);

        
        
            
        sendEmail.enviarEthereal(
              process.env.EMAIL_ADMIN,
              'Nuevo Registro',
              JSON.stringify(newUser)
        )              
      })
  }
))