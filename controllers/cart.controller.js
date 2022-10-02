const Users=require('../services/DB/models/users')
const Order=require('../services/DB/models/prod')

async function getCart(req,res){
   const user=await req.user  
   res.render('cart',{user}) 
}

async function postCart(req,res){
   Users.findByIdAndUpdate(
      {_id: req.user._id},
      {$push: {cart: req.body}},
      (error, success) => {
         if(error) console.log(error)
         else (success)
     }
   )
}

async function deleteCart(req,res){
   const userID = await req.user._id
    await Users.updateOne(
        {_id: userID},
        {$set: {cart: []}}
    )
}

async function deleteProdCart(req,res){
   const userID = await req.user._id
   const prod = await req.params.prod

   await Users.findByIdAndUpdate(
       {_id: userID},
       {$pull: {cart: {id: prod}}}
   )
   
}
const sendEmail=require('../email/ethereal')

//order
async function order(req,res){
   const user= await req.user
   const order= await Order.create({
      name:user.name,
      user:user.username,
      phone:user.phone,
      userId:user._id,
      order:user.cart,
      precio:req.body,
    })
    //pedido al admin
    sendEmail.enviarEthereal(
      process.env.EMAIL_ADMIN,
      'Nuevo pedido de: '+ order.name +' / '+order.user,
      JSON.stringify(order)
    )
   //pedido al usuario
    sendEmail.enviarEthereal(
      order.user,
      'Pedido recibido',
      JSON.stringify(order)
    )

}

module.exports={getCart,postCart,deleteProdCart,deleteCart,order}