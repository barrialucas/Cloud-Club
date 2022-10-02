const express =require("express");
const userController =require('../controllers/user.controller.js');
const passport = require('passport')
const router = express.Router();

router.get('/login', userController.logInView);
router.get('/signup', userController.signUpView);
router.get('/logout', userController.logOutView);

router.post('/login',passport.authenticate('login',{
    failureRedirect: '/api/login',
    successRedirect: "/api/account",
    failureFlash: true
}), userController.logIn);


router.post('/signup',passport.authenticate('signup',{
    failureRedirect: '/api/signup'
}), userController.signUp);

module.exports= router;