const express = require ('express');
const database = require ('./src/database');
const {APP_PORT,APP_NAME} = require ('./src/config');
const {request, response} = require ('express');
// por convencion las constantes suelen ir todas en maysuculas
//const APP_PORT=3500;
//importar database
// ./ porque busco un archivo
// si busco un paquete como express se usaria /
const app = express ();
// para parsear el body del request
app.use (express.json ());
// llamamos a UserApi
const userAPI = require ('./src/userApi');

app.use ('/api', userAPI);
// 1 endpoints sin buscalo en userAPI
app.get ('/app/users', (request, response) => {
  response.json (database.DB);
  console.log (database.DB);
  console.info ('GET: http://localhost:3500/app/users');
});
//servir los estaticos del html
app.use (express.static ('./public'));

// iniciar aplicacion
app.listen (APP_PORT, () => {
  console.info (`Escuchando en puerto:${APP_PORT} _ server: ${APP_NAME}`);
});
