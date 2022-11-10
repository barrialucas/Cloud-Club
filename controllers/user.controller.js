//get
async function logInView(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/api/account")
    }else{
        res.render('login')
    }
}
async function signUpView(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/api/account")
    }else{
        res.render('signup')
    }
}
async function logOutView(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.render("logout",{user:req.body.username},)
      });
}


//post
async function signUp(req, res) {
    res.render('account')
}

async function logIn(req, res) {
    res.render('account')
}


module.exports={logInView,signUpView,signUp,logIn,logOutView}