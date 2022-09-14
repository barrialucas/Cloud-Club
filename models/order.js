const mongoose = require('mongoose');

const Order='Order';

const userSchema = 
mongoose.Schema({
    name:{type:String, required:true},
    user: {type:String, required:true},
    phone: {type:Number, required:true},
    userId: {type:String, required:true},
    order:[Object],
    precio: {type:Object},
    
    date:{type: Date, default: Date.now}
})

module.exports = mongoose.model(Order, userSchema);