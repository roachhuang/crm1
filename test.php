 <h1>test</h1>
 <?php
 include('./php/config.php');
 $index = 2;
 $result = mysql_query("SELECT * FROM crm WHERE 1");  
 if (!$result){
        echo "could not run query:" . mysql_error();
        exit;
    }
 $data = array();
 while($row = mysql_fetch_assoc($result)){
        $data[]=$row;
        $i++;
    }
 echo $result;
 echo "<br>";
 //print_r ($row);
 echo "<br>";
 
 print_r($data);
 ?>

    