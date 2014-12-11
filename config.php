<?php

  /****** Database Details *********/
    // Database connection constants
define("DATABASE_HOST", "localhost");
define("DATABASE_USERNAME", "root");
define("DATABASE_PASSWORD", "0916@tpe");
define("DATABASE_NAME", "asiayo");
 
    $con = mysql_connect(DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    //echo 'Connected successfully'; 
    
    mysql_select_db(DATABASE_NAME, $con);
    //or die("<p>"error slecting the database crm: " . mysql_error(). "</p>");  
    //echo '<p>connected to my db</p>';
?>