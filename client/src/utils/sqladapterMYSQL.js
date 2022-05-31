function execSQL(sql,req, res){
 req.getConnection((err,conn) => {
    if(err)  return res.send(err)  
    conn.query(sql,(err,rows)=>{
       if(err)  return res.send(err)  
       res.json(rows);
    });
});
}

module.exports = {
   execSQL
};