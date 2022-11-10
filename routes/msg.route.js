const express =require("express");
const router = express.Router();
const msgController=require("../controllers/msg.controller");

router.get('/', msgController.msg);

module.exports= router;