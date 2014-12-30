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
 
$sql = "CREATE TEMPORARY TABLE tmpCrm LIKE crm ";
    mysql_query($sql) or die('error cearting tmp table:' . mysql_error());    

    $sql = "LOAD DATA LOCAL INFILE '/var/www/html/crm/test.csv' INTO TABLE tmpCrm FIELDS TERMINATED BY ',' IGNORE 1 LINES";
    mysql_query($sql) or die('error infile' . mysql_error());
    
$result = mysql_query("SELECT * FROM tmpCrm WHERE 1") or die ('error selection');  
echo mysql_num_rows($result); 

$sql = <<<EOD
	CREATE TEMPORARY TABLE t1
	SELECT tmpCrm.id, tmpCrm.city,
	COALESCE(crm.inn_name, tmpCrm.inn_name) as inn_name,
	COALESCE(crm.eng_name, tmpCrm.eng_name) as eng_name,
	tmpCrm.jpn_name,
	COALESCE(crm.tel, tmpCrm.tel) as tel,
	COALESCE(crm.fax, tmpCrm.fax) as fax,
	COALESCE(crm.mobile, tmpCrm.mobile) as mobile,
	COALESCE(crm.addr, tmpCrm.addr) as addr,
	tmpCrm.eng_addr, tmpCrm.jpn_addr, tmpCrm.status,
	COALESCE(crm.website, tmpCrm.website) as website,
	COALESCE(crm.email, tmpCrm.email) as email,
	COALESCE(crm.landlord, tmpCrm.landlord) as landlord,
	tmpCrm.type,
	COALESCE(crm.no_of_room, tmpCrm.no_of_room) as no_of_room,
	tmpCrm.prices,
	COALESCE(crm.traffic, tmpCrm.traffic) as traffic,
	tmpCrm.certificated_date, tmpCrm.remodel_date, tmpCrm.pix_upload_date,
	tmpCrm.source, tmpCrm.in_charge, tmpCrm.approach
	FROM tmpCrm
	LEFT JOIN crm ON tmpCrm.id = crm.id and tmpCrm.city = crm.city
EOD;
 	mysql_query($sql) or die('error resolving conflict:' . mysql_error());  

    // almost drive me crazy.
    $sql="CREATE TEMPORARY TABLE t2 SELECT * FROM t1 UNION SELECT * FROM crm";
    mysql_query($sql) or die('error union:' . mysql_error());   
    mysql_query("DELETE FROM `crm` WHERE 1") or die ('error del:' . mysql_error());
    $sql="INSERT INTO crm SELECT * FROM t2";
    mysql_query($sql) or die ('error MERGE:' . mysql_error());
 ?>

    