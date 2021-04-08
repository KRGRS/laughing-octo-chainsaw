const sql = require("mysql"); 

var mySQLConnection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pwd',
    database: 'nodelogin'
});

mySQLConnection.connect((err) => {
    if(err) throw err; 
    console.log("Connected"); 
}); 

module.exports = mySQLConnection; 