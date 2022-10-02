const express =require("express");
const productController = require('../controllers/prod.controller.js')

const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.create);
router.delete('/delete/:id', productController.remove);

module.exports= router;