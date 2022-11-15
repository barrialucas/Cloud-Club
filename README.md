# Proyecto final Backend Coderhouse


### Instalar el proyecto
```bash
#Clonar el repositorio
$ git clone https://github.com/barrialucas/cloud-club.git

#Instalar dependencias y librerias utilizadas
$ npm install

# Crear un archivo .env utilizando como base el .env.example y completar 
las variables de entorno correspondientes (necesarias para BD de Mongo, Nodemailer)

# Para ingresar a la "Vista de administrador" y poder agregar/borrar productos, 
completar la variable de entorno ADMIN_USER con el mail al que se desee otorgar acceso.


# Correr el servidor
$ npm dev

# Correr con nodemon
$ npm start
```

## Deploy
```bash
https://cloudclub.fly.dev/
```

## Tecnologias Backend

- bcrypt
- bcryptjs
- connect-mongo
- dotenv
- ejs
- express
- express-flash
- express-session
- log4js
- method-override
- mongoose
- mongoose-bcrypt
- nodemailer
- nodemon
- passport
- passport-local
- passport-local-mongoose
- shortid
- socket.io



## El proyecto final incluye:

- Separación de capa de ruteo, controladores, DAO
- Se usa DOT/ENV para variables de entorno
- Accediendo en modo admin, se permite agregar y eliminar productos
- Cuando se registra un nuevo usuario, se envia un mail al admin con los datos del nuevo usuario
- Cuando se completa la orden de compra se envia un mail al cliente y un mail al admin con el usuario y los productos ordenados
- Manejo de errores
- Se implementa ejs para el renderizado de las paginas
