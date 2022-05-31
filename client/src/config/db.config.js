const  config = {
    user:  'sa', // sql user
    password:  'oriomka2018.', //sql user password
    server:  'localhost', // if it does not work try- localhost
    database:  'dbpidoylisto',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'LAPTOP01\SQLSERVER2016'  // SQL Server instance name
    },
    port:  1433
  }
  
  module.exports = config;