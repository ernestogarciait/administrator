const dbConfig = require("../config/db.config.js");
function connectdb(req, res, next){
    return dbConfig;
}
function connectdbAd(req, res, next){
    return dbConfigAd;
}  

module.exports ={
    connectdbAd,
    connectdb
} ;
