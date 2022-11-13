const Users=require('../services/DB/models/users')
const Order=require('../services/DB/models/order')
const sendEmail=require('../config/ethereal')

async function getCart(req,res){
   const user=await req.user  
   res.render('cart',{user}) 
}

async function getOrder(req,res){ 
   res.render('order') 
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

//order
const shortid = require('shortid');
async function postOrder(req,res){
   const user= await req.user
   const order= await Order.create({
      _id: shortid.generate(),
      name:user.name,
      user:user.username,
      phone:user.phone,
      adress:user.adress,
      userId:user._id,
      order:user.cart,
      precio:req.body,
    })
    //pedido al admin
    sendEmail.enviarEthereal(
      process.env.EMAIL_ADMIN,
      'Nuevo pedido de: '+ order.name +' / '+order.user +' / orden: '+order._id,
      JSON.stringify(order)
    )
   //pedido al usuario
    sendEmail.enviarEthereal(
      order.user,
      'Cloud-Club | Pedido recibido',
      '<h1>Gracias por su compra</h1><p>Estamos procesando su pedido</p><h3>Su número de orden es: '+order._id+'</h3>'
    )

}

module.exports={getCart,postCart,deleteProdCart,deleteCart,postOrder,getOrder}