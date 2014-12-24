 <h1>test</h1>
 <?php
 include('./php/config.php');
 $index = 2;
 //mysql_query('SET CHARACTER SET big5');
 $result = mysql_query("SELECT * FROM crm WHERE 1");  
 if (!$result){
        echo "could not run query:" . mysql_error();
        exit;
    }
 echo mysql_num_rows($result);
 $data = array();
 while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
        $data[]=array_map('utf8_encode', $row);     
    }

 //echo $result;
 echo "<br>";
 //print_r ($data);
 echo "<br>";
 //echo json_encode($data);
 //echo json_last_msg();

 print (json_encode($data, true));
  echo json_last_error();
 

 ?>

    