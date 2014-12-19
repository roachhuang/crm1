<?php
$dbserver = 'localhost';
$dbusr   = 'root';
$dbpass   = '0916@tpe';
$dbname   = 'asiayo';

$conn = mysql_connect($dbserver, $dbusr, $dbpass) or die ('error connecting db');

mysql_select_db($dbname, $conn) or die ('error selecting db');
?>
