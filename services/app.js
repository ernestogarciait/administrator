const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const {connectdb,connectdbAd} = require("./utils/connectdb");
app.set('port', 9000);
// conexion a la DB
const config =  connectdb();
//middlewares.......................
//app.use(myconn(myserversql,dboptions,'single'));
app.use(express.json());
 
// ROUTES..........................
//app.use('/api',routes);
app.use('/api', require('./routes/public'));

app.get('/', ( req ,res) =>{
    res.redirect('/api');
    });

/*    app.get('*', ( req ,res) =>{
        res.json= {
             error:404,
             message: 'ruta no encontrada'   
        };
        });
*/

//SERVER RUNNING................. 
app.listen(app.get('port'), ()=>{
  console.log('Servidor corriendo',app.get('port'))
});