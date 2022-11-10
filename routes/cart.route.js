const express =require("express");
const cartController=require('../controllers/cart.controller')
const router = express.Router();
const auth=require('../controllers/auth')

router.get('/',auth,cartController.getCart)
router.post('/',auth,cartController.postCart)

router.delete('/',auth, cartController.deleteCart)
router.delete('/:prod',auth, cartController.deleteProdCart)

router.get('/order',auth,cartController.getOrder)
router.post('/order',cartController.postOrder)

module.exports= router;