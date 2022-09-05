//login

function getLogin(req, res) {
    if(req.isAuthenticated()) {
        res.render("index",{user:req.body.username })
        res.send('USUARIO LOGEADO')
    } else {
        res.render("login")
    }
}
function postLogin(req, res) {
    res.render("index",{user:req.body.username})
}
//signup
function getSignup(req, res) {
    res.render("signup")
}
function postSignup(req, res) {
    res.render("login")
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
    if(req.isAuthenticated()) next()
    else res.redirect("/login")
}






module.exports = {checkAuthentication,getLogin,postLogin,getSignup,postSignup,getLogout,loginError,signupError}
