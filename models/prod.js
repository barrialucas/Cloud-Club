const mongoose = require('mongoose');

const Prods='Prods';

const userSchema = 
mongoose.Schema({
    title: {type:String, required:true},
    price: {type:Number, required:true},
    img: {type:String, required:true},
    img2: {type:String,},
    img3: {type:String,},
    img4: {type:String,},
    desc: {type:String, required:true},
    stock: {type:Number, required:true},
    
    date:{type: Date, default: Date.now}
})

module.exports = mongoose.model(Prods, userSchema);