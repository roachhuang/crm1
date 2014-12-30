<?php
$dbserver = 'localhost';
$dbusr   = 'root';
$dbpass   = '0916@tpe';
$dbname   = 'asiayo';

$conn = mysql_connect($dbserver, $dbusr, $dbpass, false, 128) or die ('error connecting db');
mysql_set_charset('utf8', $conn);

//mysql_options(MYSQL_OPT_LOCAL_INFILE, 0);


mysql_select_db($dbname, $conn) or die ('error selecting db');
mysql_query('SET character_set_client=utf8', $conn);
mysql_query('SET character_set_connection=utf8', $conn);
mysql_query('SET character_set_results=utf8', $conn);
?>
