const dbConfig = require("../config/db.config.js");
function connectdb(){
    return dbConfig;
}  
module.exports = connectdb;
