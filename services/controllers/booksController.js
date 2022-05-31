const { application } = require('express');
const express = require('express');
const routes = express.Router();
const {verifyToken,isEmpty,isNumeric,fixSql} = require('../utils/functions')
const {queryexec,executeInsert, execSQL} = require('../utils/sqladapter')
const util = require('util');

function validate(req, res, next){
    var error = [];
    // VALIDAR SI ENVIAN EL VALOR EN EL JSON
      if (!(req.body.titulo)){error.push({field:'titulo', tag:'titulo Libro' , msg:'Debe enviar el valor de titulo'})};
      if (!(req.body.autor)){error.push({field:'autor', tag:'Autor' , msg:'Debe enviar el valor de autor'})};
      if (!(req.body.edicion)){error.push({field:'edicion', tag:'Edicion' , msg:'Debe enviar el valor de edicion'})};
      if (!(req.body.fecha)){error.push({field:'fecha', tag:'Fecha' , msg:'Debe enviar el valor de fecha'})};
      if (!(req.body.numerico)){error.push({field:'numerico', tag:'Monto' , msg:'Debe enviar el valor de numerico'})};

   // VALIDAR TIPOS DE DATOS  
   var fecha = new Date(req.body.fecha);
       if (!util.types.isDate(fecha)){error.push({field:'fecha', tag:'fecha' , msg:'Formato del campo fecha errado'})};
       if (!isNumeric(req.body.edicion)){error.push({field:'edicion', tag:'Edicion' , msg:'campo Edicion debe ser solo numero'})};
       if (!isNumeric(req.body.numerico)){error.push({field:'numerico', tag:'Monto' ,msg:'campo Monto debe ser solo numero'})};

   // VALIDAR QUE NO SEAN PASADOS NE BLANCO    
       if (isEmpty(req.body.titulo)){error.push({field:'titulo', tag:'titulo Libro' , msg:'Debe enviar el valor de titulo'})};
       if (isEmpty(req.body.autor)){error.push({field:'autor', tag:'Autor' , msg:'Debe enviar el valor de autor'})};
      console.log(error);
       return error;
      next();
}

//GET 
 const getBooks = (req ,res) =>{
   var fields = "id";
   fields+= ",titulo";
   fields+= ",autor";
   fields+= ",edicion";
   fields+= ",fecha";
   fields+= ",numerico";
   var sql = "SELECT "+ fields +" FROM books";
   return execSQL(sql,req,res);
}


//POST
const postBooks = ( req ,res) =>{
  //VALIDAR SOLICITUDES   
  const errors = validate(req,res);
  if (errors.length != 0) { 
     res.status(400).json({ errors });
     return errors;
   }
  //FIN VALIDAR SOLICITUDES
         var table = "books";
         var fields = "";
         fields+= "titulo";
         fields+= ",autor";
         fields+= ",edicion";
         fields+= ",fecha";
         fields+= ",numerico";
         var values = "";
         values+= "'" + fixSql(req.body.titulo) + "'"; 
         values+= ",'" + fixSql(req.body.autor) + "'";    
         values+= "," + req.body.edicion;
         values+= ",'" + req.body.fecha + "'";
         values+= "," + req.body.numerico;
         var sql = 'INSERT INTO books (' + fields + ') VALUES (' + values + ')'; 
         execSQL(sql,req,res);
    };

//DELETE    
const deleteBooks =(req ,res) =>{
  //FIN VALIDAR SOLICITUDES
  var sql = "DELETE FROM books WHERE id = " + req.params.id; 
  execSQL(sql,req,res);
};

//PUT       
  const putBooks = ( req ,res) =>{
  //VALIDAR SOLICITUDES   
  const errors = validate(req,res);
  if (errors.length != 0) { 
     res.status(400).json({ errors });
     return errors;
   }
   //FIN VALIDAR SOLICITUDES
   var values = "";
   values+= "titulo = '" + fixSql(req.body.titulo) + "'"; 
   values+= ",autor = '" + fixSql(req.body.autor) + "'";    
   values+= ",edicion= " + req.body.edicion;
   values+= ",fecha ='" + req.body.fecha + "'";
   values+= ",numerico = " + req.body.numerico;
   var condition = " where id = " + req.params.id;  
  var sql =  'UPDATE books SET ' + values + ' ' + condition ;
  execSQL(sql,req,res);
  };
   
       module.exports = {
        getBooks, 
        postBooks,
        deleteBooks,
        putBooks,
    };