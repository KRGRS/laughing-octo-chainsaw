const bcrypt = require("bcrypt"); 
var string = "Hello World"; 

var hashed; 

bcrypt.hash(string, 10, function(err, hash){
    if(err) throw err; 
    ///console.log(hash)
    hashed =  hash; 
})

console.log(string); 
console.log(hashed); 