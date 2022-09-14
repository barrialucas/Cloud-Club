const UsersModel=require('../models/users')
//login
function getLogin(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/account")
    }else{
        res.render('login')
    }
}
function postLogin (req, res) {
    res.render('account')
}


const account=async (req,res)=>{
    const user=req.user
    try {
        UsersModel
        .find({username: user.username})
        .then((users) => res.status(200).render("account",{users}))
        .catch((err) => res.send(err));
        
      } catch (error) {
        res.status(500).send(error)
      }
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




module.exports = {account,postLogin,getLogin,getSignup,postSignup,getLogout,loginError,signupError}
