const mssql = require("mssql");
async function execSQL(sql,req, res){
   try {
      let  pool = await  mssql.connect(config);
      let  dataSet = await  pool.request().query(sql);
      return  dataSet.recordsets;
    }
    catch (error) {
      console.log(error);
    }
}
module.exports = {
   execSQL
};