const mongoose = require('mongoose');

const userSchema = 
mongoose.Schema({
    title: {type:String, required:true},
    price: {type:Number, required:true},
    img: {type:String, required:true},
    desc: {type:String, required:true},
    stock: {type:Number, required:true},
    
    date:{type: Date, default: Date.now}
})

module.exports = mongoose.model("Prods", userSchema);