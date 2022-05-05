/**
 * Configuracion inicial del proyectol
 * 1. Creamos los archivos .gitignore, .editorconfig, .eslintrc.json
 * 2.Ingresamos a gitignore.io https://www.toptal.com/developers/gitignore/ y generamos nuestro gitignore para node, windows, linux, macOs
 * 3.Instalamos los siguientes paquetes en modo develop
 * npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
 */
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist=['http://localhost:8080', 'http://myapp.io'];
const options = {
  origin: (origin, callback)=>{
    if(whitelist.includes(origin) || !origin ){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors(options));

app.get('/', (request,response)=>{
  response.send('<h1>hola mi server en express</h1>');
});
app.get('/nueva-ruta', (request,response)=>{
  response.send('<h1>hola nuevo endpoint</h1>');
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, ()=>{
  console.log('Mi port' + port);
});
/**
 *
 *
 * REST: Representational State Transfer
 * Es una conveccion que se refiere a servicios web por protocolo HTTP
      HTTP = Hypertext Transfer Protocol
    Metodos:

    Get: Obtener
    Put: Modificar/Actualizar
    Patch: Modificar/Actualizar
    Post: Crear
    Delete: Eliminar
 */


 /**
  * Single responsibility principle
  *  */
