const mongoose = require('mongoose');
const Msg='Msg';


const userSchema = 
mongoose.Schema({
   
    name:{type:String,required: true},
    text:{type:String,required: true},
    
    date:{type: String}
})

module.exports = mongoose.model(Msg, userSchema);