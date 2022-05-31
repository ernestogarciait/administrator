const { application } = require('express');
const express = require('express');
const routes = express.Router();
const { verifyToken,isEmpty,isNumeric,fixSql} = require('../utils/functions');
const { queryexec,executeInsert, execSQLAd} = require('../utils/sqladapter');
const util = require('util');
const { Console } = require('console');
                          
  function validate(req, res, next)
     {
        var error = [];
        if (!(req.body.usuario)) { error.push({ field: 'usuario', tag: 'Usuario' , msg: 'Debe enviar el valor de usuario'})};
        if (!(req.body.clave)) { error.push({ field: 'clave', tag: 'Clave' , msg: 'Debe enviar el valor de clave'})};
       return error;
       next();
     }
     
   //GET
   const authentication = async (req, res) => {
    console.log('Body',req.body);
    const errors = validate(req, res);
    if (errors.length != 0)
      {
          res.status(400).json({ errors });
          return errors;
    }
        var fields = 'id';
        fields += ',nombre';
        fields += ',apellido';
        fields += ',cedula';
        fields += ',telefonos';
        fields += ',direccion';
        fields += ',usuario';
        fields += ',estatus';
        fields += ',email';
        var condition = " usuario='" + req.body.usuario + "'";
        condition+= " and clave='" + req.body.clave + "'"; 
        var sql = "SELECT " + fields + " FROM gen_usuarios where " + condition ;
        return res.json(await execSQLAd(sql, req, res));
   }
                          
      
 module.exports = {
  authentication
};

