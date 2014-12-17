<?php

require_once('./config.php'); 

/**  Switch Case to Get Action from controller  **/
// CRUD
switch($_GET['action']){
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

    case 'csv2json' :
            csv2json();
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
    //print_r(json_encode($data));
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
/*
function csv2json(){
    $csvData = json_decode(file_get_contents("php://input"));  
    $array = array_map('str_getcsv', explode('\n', $csvData));
    return $array;
    //print json_encode($array);
}
*/
//Import the contents of a CSV file after uploading it
//Example: CSVImport("User", array('name','username','email','url'), "csv_file");
//Aruguments : $table - The name of the table the data must be imported to
//                $fields - An array of fields that will be used
//                $csv_fieldname - The name of the CSV file field
function csv2json() {
    $data = json_decode(file_get_contents("php://input"));  
    $table      = $data->table;    
    $field      = $data->field;
    
    //if(!$_FILES[$csv_fieldname]['name']) return;

    $handle = fopen("test.csv", "r");

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
// csv import
class Quick_CSV_import{
    var $table_name; //where to import to
    var $file_name;  //where to import from
    var $use_csv_header; //use first line of file OR generated columns names
    var $field_separate_char; //character to separate fields
    var $field_enclose_char; //character to enclose fields, which contain separator char into content
    var $field_escape_char;  //char to escape special symbols
    var $error; //error message
    var $arr_csv_columns; //array of columns
    var $table_exists; //flag: does table for import exist
    var $encoding; //encoding table, used to parse the incoming file. Added in 1.5 version
      
  function Quick_CSV_import($file_name=""){
	$this->file_name = $file_name;
	$this->arr_csv_columns = array();
	$this->use_csv_header = true;
	$this->field_separate_char = ",";
	$this->field_enclose_char  = "\"";
	$this->field_escape_char   = "\\";
	$this->table_exists = false;
  }
  
  function import(){
	if($this->table_name=="")
	  $this->table_name = "temp_".date("d_m_Y_H_i_s");
	
	$this->table_exists = false;
	$this->create_import_table();
	
	if(empty($this->arr_csv_columns))
	  $this->get_csv_header_fields();
	
	/* change start. Added in 1.5 version */
	if("" != $this->encoding && "default" != $this->encoding)
	  $this->set_encoding();
	/* change end */	  
  
	if($this->table_exists){
	  $sql = "LOAD DATA INFILE '".@mysql_escape_string($this->file_name).
			 "' INTO TABLE `".$this->table_name.
			 "` FIELDS TERMINATED BY '".@mysql_escape_string($this->field_separate_char).
			 "' OPTIONALLY ENCLOSED BY '".@mysql_escape_string($this->field_enclose_char).
			 "' ESCAPED BY '".@mysql_escape_string($this->field_escape_char).
			 "' ".
			 ($this->use_csv_header ? " IGNORE 1 LINES " : "")
			 ."(`".implode("`,`", $this->arr_csv_columns)."`)";
	  $res = @mysql_query($sql);
	  $this->error = mysql_error();
	}
  } 
 
  //returns array of CSV file columns
  function get_csv_header_fields(){
	$this->arr_csv_columns = array();
	$fpointer = fopen($this->file_name, "r");
	if ($fpointer){
	  $arr = fgetcsv($fpointer, 10*1024, $this->field_separate_char);
	  if(is_array($arr) && !empty($arr)){
		if($this->use_csv_header){
		  foreach($arr as $val)
			if(trim($val)!="")
			  $this->arr_csv_columns[] = $val;
		}else{
		  $i = 1;
		  foreach($arr as $val)
			if(trim($val)!="")
			  $this->arr_csv_columns[] = "column".$i++;
		}
	  }
	  unset($arr);
	  fclose($fpointer);
	} 
	else
	  $this->error = "file cannot be opened: ".(""==$this->file_name ? "[empty]" : 
 
@mysql_escape_string($this->file_name));
	return $this->arr_csv_columns;
  }
 
  function create_import_table(){
	$sql = "CREATE TABLE IF NOT EXISTS ".$this->table_name." (";

	if(empty($this->arr_csv_columns))
	  $this->get_csv_header_fields();
	
	if(!empty($this->arr_csv_columns))
	{
	  $arr = array();
	  for($i=0; $i<sizeof($this->arr_csv_columns); $i++)
		  $arr[] = "`".$this->arr_csv_columns[$i]."` TEXT";
	  $sql .= implode(",", $arr);
	  $sql .= ")";
	  $res = @mysql_query($sql);
	  $this->error = mysql_error();
	  $this->table_exists = ""==mysql_error();
	}
  }
 
  /* change start. Added in 1.5 version */
  //returns recordset with all encoding tables names, supported by your database
  function get_encodings(){
	$rez = array();
	$sql = "SHOW CHARACTER SET";
	$res = @mysql_query($sql);
	if(mysql_num_rows($res) > 0){
	  while ($row = mysql_fetch_assoc ($res)){
		$rez[$row["Charset"]] = ("" != $row["Description"] ? $row["Description"] : $row["Charset"]); //some MySQL databases return empty Description field
	  }
	}
	return $rez;
  }	 
 
  //defines the encoding of the server to parse to file
  function set_encoding($encoding=""){
	if("" == $encoding)
	  $encoding = $this->encoding;
	$sql = "SET SESSION character_set_database = " . $encoding; //'character_set_database' MySQL server variable is [also] to parse file with rigth encoding
	$res = @mysql_query($sql);
	return mysql_error();
  }
  /* change end */
}

function __destruct(){
    mysql_close($con);
    return true;
}

?>