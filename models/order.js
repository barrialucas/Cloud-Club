const mongoose = require('mongoose');

const Order='Order';

const userSchema = 
mongoose.Schema({
    user: {type:String, required:true},
    userId: {type:String, required:true},
    order:[Object],
    precio:{type:Number, required:true},
    
    date:{type: Date, default: Date.now}
})

module.exports = mongoose.model(Order, userSchema);