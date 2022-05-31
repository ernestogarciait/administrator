const jwt = require("jsonwebtoken");
// Authorization: Bearer <token>
 function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        return res.sendStatus(403);
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, 'my_secret_key', (err, data) => {
        if(err){
            return res.sendStatus(403);
        }
        req.token = bearerToken;
        req.user = data;
        next();
    });
}
const isEmpty = (value) => (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );

  const isNumeric = (value) => (
     !isNaN(parseFloat(value)) && isFinite(value)
  );
  function fixSql(value){
          var sretorna = value.replace("'",""); 
          return sretorna; 
  };


module.exports = {
    verifyToken,
    isEmpty,
    isNumeric,
    fixSql
};