const express =require("express");
const sneakerController = require('../controllers/sneakersAll.controller.js')
const auth=require('../controllers/auth')

const router = express.Router();

router.get('/', auth, sneakerController.getAll);
router.get('/:id', auth, sneakerController.getById);


module.exports= router;