const { application } = require('express');
const express = require('express');
const routes = express.Router();
const {verifyToken,isEmpty,isNumeric,fixSql} = require('../utils/functions')
const {queryexec,executeInsert, execSQL} = require('../utils/sqladapter')
const util = require('util');
//GET 
 const getTests = (req ,res) =>{
   console.log("HOLA MUNDO");
}
       module.exports = {
        getTests
    };