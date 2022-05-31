const mssql = require("mssql");
const {config,configAd} = require("../config/db.config");
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
async function execSQLAd(sql,req, res){
   try {
      let  pool = await  mssql.connect(configAd);
    
      let  dataSet = await  pool.request().query(sql);
      return  dataSet.recordsets;
    }
    catch (error) {
      console.log(error);
    }
    
}

/*
sql.connect(config, err => { 
   if(err){
       throw err ;
   }
   console.log("Connection Successful !");

   new sql.Request().query('select 1 as number', (err, result) => {
       //handle err
       console.dir(result)
       // This example uses callbacks strategy for getting results.
   })
       
});*/
module.exports = {
   execSQL,
   execSQLAd
};