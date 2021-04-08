<?php

define('DB_SERVER', 'localhost'); 
define('DB_USERNAME', 'root'); 
define('DB_PASSWORD', 'pwd'); 
define('DB_NAME', 'users');

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME); 

if($mysqli === false){
    die('ERROR: Could not connect.' . $mysqli->connect_error); 
}

?>