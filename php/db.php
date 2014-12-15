<?php

require_once('./config.php'); 

/**  Switch Case to Get Action from controller  **/
// CRUD
switch($_GET['action'])  {
    case 'add_row' :
            add_row();
            break;

    case 'get_data' :
            get_data();
            break;

    case 'edit_row' :
            edit_row();
            break;

    case 'delete_row' :              
            delete_row();
            break;

    case 'update_row' :
            update_row();
            break;
}

/**  Function to Add row  **/

function add_row() {
	// _GET_POST
    $data = json_decode(file_get_contents("php://input")); 
    $prod_name      = $data->prod_name;    
    $prod_desc      = $data->prod_desc;
    $prod_price     = $data->prod_price;
    $prod_quantity  = $data->prod_quantity;
 
    print_r($data);
    $qry = 'INSERT INTO crm (prod_name,prod_desc,prod_price,prod_quantity) values ("' . $prod_name . '","' . $prod_desc . '",' .$prod_price . ','.$prod_quantity.')';
   
    mysql_query($qry) or die('fail to add in db.php');    
};


/**  Function to Get row  **/

function get_data() {    
    $qry = mysql_query('SELECT * from crm');
    $data = array();
    while($rows = mysql_fetch_array($qry))
    {
        $data[] = array(
                    "id"            => $rows['id'],
                    "prod_name"     => $rows['prod_name'],
                    "prod_desc"     => $rows['prod_desc'],
                    "prod_price"    => $rows['prod_price'],
                    "prod_quantity" => $rows['prod_quantity']
                    );
    }
    print_r(json_encode($data));
    return json_encode($data);  
}


/**  Function to Delete row  **/

function delete_row() {
    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index;     
    //print_r($data)   ;
    $del = mysql_query("DELETE FROM crm WHERE id = ".$index);
    if($del)
    return true;
    return false;     
}


/**  Function to Edit row  **/

function edit_row() {
    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index; 
    $qry = mysql_query('SELECT * from crm WHERE id='.$index);
    $data = array();
    while($rows = mysql_fetch_array($qry))
    {
        $data[] = array(
                    "id"            =>  $rows['id'],
                    "prod_name"     =>  $rows['prod_name'],
                    "prod_desc"     =>  $rows['prod_desc'],
                    "prod_price"    =>  $rows['prod_price'],
                    "prod_quantity" =>  $rows['prod_quantity']
                    );
    }
    print_r(json_encode($data));
    return json_encode($data);  
}


/** Function to Update row **/

function update_row(){

    $data = json_decode(file_get_contents("php://input"));     
    
    $id             =   $data->id;
    $prod_name      =   $data->prod_name;    
    $prod_desc      =   $data->prod_desc;
    $prod_price     =   $data->prod_price;
    $prod_quantity  =   $data->prod_quantity;

    //print_r($data);
 
    $qry = "UPDATE `crm` set `prod_name`='".$prod_name."' , `prod_desc`='".$prod_desc."',`prod_price`='".$prod_price."',`prod_quantity`='".$prod_quantity."' WHERE `id`=".$id;
    //$qry = sprintf("UPDATE crm set prod_name=%s, $prod_name=%s, prod_desc=%s, prod_price=%d, prod_quantity=%d WHERE id=%d")  
    //$qry = "UPDATE crm set prod_name='mark' where id=1";
    mysql_query($qry) or die('fail to update in db.php');     
}

Function cvs2jason(){
    $csvData = json_decode(file_get_contents("php://input"));  
    $array = array_map('str_getcsv', explode('\n', $csvData));
    print json_encode($array);
}
//Import the contents of a CSV file after uploading it
//Example: CSVImport("User", array('name','username','email','url'), "csv_file");
//Aruguments : $table - The name of the table the data must be imported to
//                $fields - An array of fields that will be used
//                $csv_fieldname - The name of the CSV file field
Function CSVImport($table, $fields, $csv_fieldname='csv') {
    if(!$_FILES[$csv_fieldname]['name']) return;

    $handle = fopen($_FILES[$csv_fieldname]['tmp_name'],'r');
    if(!$handle) die('Cannot open uploaded file.');

    $row_count = 0;
    $sql_query = "INSERT INTO $table(". implode(',',$fields) .") VALUES(";

    $rows = array();

    //Read the file as csv
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $row_count++;
        foreach($data as $key=>$value) {
            $data[$key] = "'" . addslashes($value) . "'";
        }
        $rows[] = implode(",",$data);
    }
    $sql_query .= implode("),(", $rows);
    $sql_query .= ")";
    fclose($handle);

    if(count($rows)) { //If some recores  were found,
        //Replace these line with what is appropriate for your DB abstraction layer
        mysql_query("TRUNCATE TABLE $table") or die("MySQL Error: " . mysql_error()); //Delete the existing records
        mysql_query($sql_query) or die("MySQL Error: " . mysql_error()); // and insert the new ones.

        print 'Successfully imported '.$row_count.' record(s)';
    } else {
        print 'Cannot import data - no records found.';
    }
} 
/*
function writeToMysql(){    
    $qry = <<<eof
        LOAD DATA INFILE '$fileName'
         INTO TABLE tableName
         FIELDS TERMINATED BY '|' OPTIONALLY ENCLOSED BY '"'
         LINES TERMINATED BY '\n'
        (field1,field2,field3,etc)
    eof;

    mysql_query($qry);
}    
*/
function __destruct(){
    mysql_close($con);
    return true;
}

?>