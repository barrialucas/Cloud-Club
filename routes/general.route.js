const express =require("express");
const router = express.Router();
const generalController=require("../controllers/general.controller")
const auth=require('../controllers/auth')

router.get('/', generalController.getHome)
router.get('/msg',auth, generalController.msg)
router.get('/api/account',auth, generalController.account)


module.exports= router;