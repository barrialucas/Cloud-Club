const mongoose=require("mongoose")
require('dotenv').config()
const httpServer = require('./app.js')
const logger=require("./utils/loggers/logger")



async function server(){
    try{
        mongoose
          .connect(process.env.MONGODB_URI)
          .then(console.log('Mongo Connect!'))
          .catch((error)=>logger.error(error))
        
          const server= httpServer.listen(process.env.PORT, () => {console.log(`SV ON...`)})
          server.on('error', err => logger.error('Error en el server: ' + err));
    }catch(error){
        logger.error(error);
    }
  
}

server()
