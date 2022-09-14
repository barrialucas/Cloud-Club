const Users=require('../models/users')
const Order=require('../models/order')

const getCart=async (req,res)=>{
   const user=await req.user  
   res.render('cart',{user}) 
}

const postCart=(req,res)=>{
   Users.findByIdAndUpdate(
      {_id: req.user._id},
      {$push: {cart: req.body}},
      (error, success) => {
         if(error) console.log(error)
         else console.log(success)
     }
   )
}

const deleteCart=async(req,res)=>{
   const userID = await req.user._id
    await Users.updateOne(
        {_id: userID},
        {$set: {cart: []}}
    )
}

const deleteProdCart= async(req,res)=>{
   const userID = await req.user._id
   const prod = await req.params.prod

   await Users.findByIdAndUpdate(
       {_id: userID},
       {$pull: {cart: {id: prod}}}
   )
   
}


const order=async(req,res)=>{
   const user= req.user
   const order= await Order.create({
      user:user.username,
      userId:user._id,
      order:[],
      precio:req.body
    })
}






module.exports={getCart,postCart,deleteProdCart,deleteCart,order}