// para concetarse a mysql
const myserversql = require('mysql2');
const myconn = require('express-myconnection');
 function connectdb(req, res, next){
    const dboptions ={
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'library'
   }
  return [myconn,myserversql,dboptions] 
}

module.exports = {
    connectdb,
};