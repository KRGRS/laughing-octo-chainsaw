
// declare dependencies 
const express = require("express"); 
const path = require('path');
const session = require('express-session'); 
const bodyParser = require('body-parser');  
const { request } = require("http");
const { response } = require("express");
const bcrypt = require('bcrypt');
const mySQL = require("./config/mySQLconfig"); 

// Declaring Variables 
const app = express(); 
const port = 8000; 
const saltRounds = 10; 

//initialize static files for HTML files 
app.use(express.static(path.join(__dirname, 'public'))); 


app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: true
})); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

//homepage routing 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html_files/register.HTML")); //starting Point of this webiste
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}'); 
})


app.post('/login.HTML', function(req, res){
    console.log("There was an action!")
    var username = req.body.username; 
    var password = req.body.password; 

    if(username && password){
        if(mySQL.state === 'disconnected'){
            return res.sendStatus(401, { status: 'fail', message: 'server down'});
          }else{
            var encryptet_pwd = mySQL.query('SELECT password FROM users WHERE username=?', [username], function(err, results, fields){
                bcrypt.compare(password, encryptet_pwd, function(err, result){
                    if(result){
                        res.sendFile(path.join(__dirname + "/home.HTML")); 
                    }else{
                        console.log("There was an error"); 
                    }
                }); 
                res.end(); 
            })
          }
    }else{
        res.send('Please enter Username and Password!'); 
        res.end(); 
    }
})

app.post('/registerUser', function(req, res){
    var username = req.body.username; 
    var password = req.body.password; 
    var password_re = req.body.passwordre;
    var email = req.body.email; 
        
    if(password == password_re){
        bcrypt.hash(password, saltRounds, function(err, hash){
            if(err) throw error; 
            mySQL.query("INSERT INTO `users` (`username`, `password`, `E_Mail`) VALUES (?, ?, ?)",[username, hash, email], function(err, result){
                if(err) throw err; 
            })
        });

        console.log("Inserted 1 Element!"); 
        res.redirect("./public/html_files/login.html"); 
        //res.sendFile(path.join(__dirname + "/login_files/login.HTML")); 
    }
})

app.post('/usernameCheck', function(req, res){
    mySQL.query("SELECT COUNT(1) FROM users WHERE username = ?", [req.body.username], function(err, result){
        if(err) throw err; 
        if(result){
            if(result === 0){
                res.send(false); 
            }else{
                res.send(true); 
            }
            res.end(); 
        }
    }); 
})