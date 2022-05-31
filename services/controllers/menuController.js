const { application } = require('express');
const express = require('express');
const routes = express.Router();
const { verifyToken,isEmpty,isNumeric,fixSql} = require('../utils/functions');
const { queryexec,executeInsert, execSQLAd} = require('../utils/sqladapter');
const util = require('util');
const { Console } = require('console');
      
   //GET
   const menu = async (req, res) => {
     var fields = " mo.id as modulo_id,";
    fields+= "mo.descripcion as modulo_descripcion,";
    fields+= "me.Id,";
    fields+= "me.Descripcion,";
    fields+= "me.Comando,";
    fields+= "me.ubicacion,";
    fields+= "me.img1"; 
    var tables = " gen_modulos mo, gen_menus me,GEN_MAPASMENUS maem,gen_usuario_empresa meem";
    var condition = "  me.id = maem.idmenus";
    condition+= " and meem.idmapasaccesos = maem.idmapasaccesos"; 
    condition+= " and meem.idusuario=" + req.body.idusuario;
    condition+= " and mo.id = me.idmodulos";
    condition+= "  order by mo.Orden,me.orden";
    var sql = "SELECT " + fields + " FROM " + tables + " WHERE " + condition;
        return res.json(await execSQLAd(sql, req, res));
   }
                          
      
 module.exports = {
  menu
};

