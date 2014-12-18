<?php
require_once('./php/config.php');
print 'abc';
$fd = fopen('./test.csv', 'r') or die ('fuck');
print $fd;
fclose($fd);

$qry = 'LOAD DATA LOCAL INFILE "./test.csv" 
        INTO TABLE abc 
            FIELDS TERMINATED BY "," 
            OPTIONALLY ENCLOSED BY """" 
            IGNORE 1 LINES
            (col1, col2)'
;

mysql_query($qry) or die('fail to add in db.php');  

?>
