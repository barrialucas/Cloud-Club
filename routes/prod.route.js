const express =require("express");
const productController = require('../controllers/prod.controller.js')

const router = express.Router();

const auth=require('../controllers/auth')

router.get('/',auth, productController.getAll);
router.post('/',auth, productController.create);
router.delete('/delete/:id',auth, productController.remove);

module.exports= router;