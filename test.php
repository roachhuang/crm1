 <h1>test</h1>
 <?php
 include('./php/config.php');
 $index = 2;
 $result = mysql_query("SELECT * FROM crm WHERE id = " . $index);  
 if (!$result){
        echo "could not run query:" . mysql_error();
        exit;
    }
 $row = array();
 $row = mysql_fetch_row($result);   
 echo $result;
 echo "<br>";
 //print_r ($row);
 echo "<br>";
 
 print_r(json_encode($row));
 ?>

    