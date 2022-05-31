const  config = {
    "user":  'sa', // sql user
    "password":  'oriomka2018.', //sql user password
    "server":   "LAPTOP01", // if it does not work try- localhost
    "database":  'dbpidoylisto',
     options: {
      trustServerCertificate: true,
      trustedconnection:  true,
      enableArithAbort:  true, 
       instanceName: 'SQLSERVER2016' } 
    };

    const  configAd = {
      "user":  'sa', // sql user
      "password":  'oriomka2018.', //sql user password
      "server":   "LAPTOP01", // if it does not work try- localhost
      "database":  'adpidoylisto',
       options: {
        trustServerCertificate: true,
        trustedconnection:  true,
        enableArithAbort:  true, 
         instanceName: 'SQLSERVER2016' 
      }
    };  
  /*
  "server":   'LAPTOP01\\\SQLSERVER2016\\', // if it does not work try- localhost

  trustedconnection:  true,
  enableArithAbort:  true,
  instancename:  'LAPTOP01\\SQLSERVER2016'  // SQL Server instance name
  */
  module.exports ={config,configAd}