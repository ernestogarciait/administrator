const { application } = require('express');
const express = require('express');
const routes = express.Router();
const { verifyToken,isEmpty,isNumeric,fixSql} = require('../utils/functions');
const { queryexec,executeInsert, execSQL} = require('../utils/sqladapter');
const util = require('util');
                          
                          
                          
  function validate(req, res, next)
     {
        var error = [];
        // VALIDAR SI ENVIAN EL VALOR EN EL JSON
        if (!(req.body.id)) { error.push({ field: 'id', tag: 'id' , msg: 'Debe enviar el valor de id'})};
        if (!(req.body.nombre)) { error.push({ field: 'nombre', tag: 'nombre' , msg: 'Debe enviar el valor de nombre'})};
        if (!(req.body.apellido)) { error.push({ field: 'apellido', tag: 'apellido' , msg: 'Debe enviar el valor de apellido'})};
        if (!(req.body.cedula)) { error.push({ field: 'cedula', tag: 'cedula' , msg: 'Debe enviar el valor de cedula'})};
        if (!(req.body.telefonos)) { error.push({ field: 'telefonos', tag: 'telefonos' , msg: 'Debe enviar el valor de telefonos'})};
        if (!(req.body.direccion)) { error.push({ field: 'direccion', tag: 'direccion' , msg: 'Debe enviar el valor de direccion'})};
        if (!(req.body.usuario)) { error.push({ field: 'usuario', tag: 'usuario' , msg: 'Debe enviar el valor de usuario'})};
        if (!(req.body.clave)) { error.push({ field: 'clave', tag: 'clave' , msg: 'Debe enviar el valor de clave'})};
        if (!(req.body.estatus)) { error.push({ field: 'estatus', tag: 'estatus' , msg: 'Debe enviar el valor de estatus'})};
        if (!(req.body.email)) { error.push({ field: 'email', tag: 'email' , msg: 'Debe enviar el valor de email'})};
        // VALIDAR TIPOS DE DATOS
        if (!isNumeric(req.body.id)) { error.push({ field: 'id', tag: 'id' , msg: 'campo id debe ser solo numero'})};
        if (!isNumeric(req.body.estatus)) { error.push({ field: 'estatus', tag: 'estatus' , msg: 'campo estatus debe ser solo numero'})};
        // VALIDAR QUE NO SEAN PASADOS EN BLANCO O EN CERO
        if (isEmpty(req.body.nombre)) { error.push({ field: 'nombre', tag: 'nombre' , msg: 'Debe enviar el valor de nombre'})};
        if (isEmpty(req.body.apellido)) { error.push({ field: 'apellido', tag: 'apellido' , msg: 'Debe enviar el valor de apellido'})};
        if (isEmpty(req.body.cedula)) { error.push({ field: 'cedula', tag: 'cedula' , msg: 'Debe enviar el valor de cedula'})};
        if (isEmpty(req.body.telefonos)) { error.push({ field: 'telefonos', tag: 'telefonos' , msg: 'Debe enviar el valor de telefonos'})};
        if (isEmpty(req.body.direccion)) { error.push({ field: 'direccion', tag: 'direccion' , msg: 'Debe enviar el valor de direccion'})};
        if (isEmpty(req.body.usuario)) { error.push({ field: 'usuario', tag: 'usuario' , msg: 'Debe enviar el valor de usuario'})};
        if (isEmpty(req.body.clave)) { error.push({ field: 'clave', tag: 'clave' , msg: 'Debe enviar el valor de clave'})};
        if (req.body.estatus=0) { error.push({ field: 'estatus', tag: 'estatus' , msg: 'campo estatus debe ser solo numero'})};
        if (isEmpty(req.body.email)) { error.push({ field: 'email', tag: 'email' , msg: 'Debe enviar el valor de email'})};
       return error;
       next();
     }
                          
                          
   //GET
   const getGen_usuarios = (req, res) => {
        var fields = 'id';
        fields += ',nombre';
        fields += ',apellido';
        fields += ',cedula';
        fields += ',telefonos';
        fields += ',direccion';
        fields += ',usuario';
        fields += ',clave';
        fields += ',estatus';
        fields += ',email';
        var sql = 'SELECT ' + fields + ' FROM gen_usuarios';
        execSQL(sql, req, res);
   }
                          
                          
   //POST
   const postGen_usuarios = (req, res) => {
        //VALIDAR SOLICITUDES
        const errors = validate(req, res);
        if (errors.length != 0)
          {
              res.status(400).json({ errors });
              return errors;
        }
        var fields='';
        var values='';
        fields += ',nombre';
        fields += ',apellido';
        fields += ',cedula';
        fields += ',telefonos';
        fields += ',direccion';
        fields += ',usuario';
        fields += ',clave';
        fields += ',estatus';
        fields += ',email';
        values =  "'" + fixsql(req.body.nombre) + "'";
        values += ",'" + fixsql(req.body.apellido) + "'";
        values += ",'" + fixsql(req.body.cedula) + "'";
        values += ",'" + fixsql(req.body.telefonos) + "'";
        values += ",'" + fixsql(req.body.direccion) + "'";
        values += ",'" + fixsql(req.body.usuario) + "'";
        values += ",'" + fixsql(req.body.clave) + "'";
        values += ", " + req.body.estatus;
        values += ",'" + fixsql(req.body.email) + "'";
        var sql = 'INSERT INTO gen_usuarios (' + fields + ') VALUES (' + values + ')';
        execSQL(sql, req, res);
  }
   //DELETE
   const deleteGen_usuarios = (req, res) => {
        var sql = 'DELETE FROM  gen_usuarios WHERE id =  ' + req.params.id;
        execSQL(sql, req, res);
   };
                          
                          
   //PUT
 const putGen_usuarios = (req, res) => {
       //VALIDAR SOLICITUDES
       const errors = validate(req, res);
       if (errors.length != 0)
         {
                 res.status(400).json({ errors });
                 return errors;
         }
       var values='';
       values = "nombre = '" + fixsql(req.body.nombre) + "'";
       values += ",apellido = '" + fixsql(req.body.apellido) + "'";
       values += ",cedula = '" + fixsql(req.body.cedula) + "'";
       values += ",telefonos = '" + fixsql(req.body.telefonos) + "'";
       values += ",direccion = '" + fixsql(req.body.direccion) + "'";
       values += ",usuario = '" + fixsql(req.body.usuario) + "'";
       values += ",clave = '" + fixsql(req.body.clave) + "'";
       values += ",estatus " +   req.body.estatus;
       values += ",email = '" + fixsql(req.body.email) + "'";
       var condition = ' WHERE id = ' + req.params.id;
       var sql =  'UPDATE gen_usuarios SET ' + values + ' ' + condition ;
       execSQL(sql, req, res);
 }
