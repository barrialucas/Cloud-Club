const mongoose=require("mongoose")
require('dotenv').config()
const httpServer = require('./app.js')



async function server(){
    try{
        mongoose
          .connect(process.env.MONGODB_URI)
          .then(console.log('Mongo Connect!'))
          .catch((error)=>console.error(error))
        
          const server= httpServer.listen(process.env.PORT, () => {console.log(`SV ON...`)})
          server.on('error', err => console.log('Error en el server: ' + err));

    }catch(error){
        console.log(error);
    }
  
}

server()