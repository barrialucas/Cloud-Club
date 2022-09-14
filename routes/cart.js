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
         else (success)
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
const sendEmail=require('../email/ethereal')

//order

const accountSID = 'AC11d7b7ab9f72df9663d32f2e11c0101d'
const authToken = '517f5389c5994eaa45870c6dd6f403cd'
const client = require('twilio')(accountSID, authToken)

const order=async(req,res)=>{
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

    //agregar celular wsp NO ANDA
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+',
      body: ''
   })
      .then(message => console.log(message))
      .catch(e => console.log(e))
}








module.exports={getCart,postCart,deleteProdCart,deleteCart,order}