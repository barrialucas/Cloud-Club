const UsersModel=require('../models/users')
//login
function getLogin(req, res) {
    if(req.isAuthenticated()) {
        UsersModel
            .find({username:postLogin.email})
            .then((users) => res.render('account', {users}))
            .catch((err) => res.send(err));
    } else {
        res.render("login")
    }
}
function postLogin(req, res) {
    const email =req.body.username
    UsersModel
            .find({ username:email})
            .then((users) => res.render('account', {users}))
            .catch((err) => res.send(err));
}

//signup
function getSignup(req, res) {
    res.render("signup")
}
function postSignup(req, res) {
    res.render("login")
    //enviar mail indicando quien se registro
}
//logout
function getLogout(req, res,next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.render("logout",{user:req.body.username},)
      });
}


//error
function loginError(req,res){
    res.send("USUARIO Y/O CONTRASEÑA INCORRECTOS")
}
function signupError(req,res){
    res.status("USUARIO YA REGISTRADO")
}
//verify
function checkAuthentication(req, res, next) {
    if( req.isAuthenticated() )next()
    else res.redirect("/login")
}




module.exports = {checkAuthentication,getLogin,postLogin,getSignup,postSignup,getLogout,loginError,signupError}
