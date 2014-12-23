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

    case 'importCsv' :
            importCsv();
            break;
}

/**  Function to Add row  **/

function add_row() {
	// _GET_POST
    $data = json_decode(file_get_contents("php://input")); 
    $inn_name      = $data->inn_name;    
    $tel      = $data->tel;
    $fax     = $data->fax;
    $addr  = $data->addr;
 
    // print_r($data);
    $qry = 'INSERT INTO crm (inn_name, tel, fax, addr) values ("' . $inn_name . '","' . $tel . '",' .$fax . ','.$addr.')';
   
    mysql_query($qry) or die('error adding row');    
};


/**  Function to Get row  **/

function get_data() {    
    $result = mysql_query('SELECT * FROM crm WHERE 1') or die('error getting data:' .mysql_error());
    //$colNum = mysql_num_fileds($result);
    $data = array();
    $i=0;
    /*
    while($row = mysql_fetch_assoc($result)){
        $data[]=$row;
        $i++;
    }
    */
   
    while($rows = mysql_fetch_array($result)){
        $data[] = array(
                    "id"       => $rows['id'], // db table's col name
                    "inn_name"     => $rows['inn_name'],
                    "tel"     => $rows['tel'],
                    "fax"    => $rows['fax'],
                    "addr" => $rows['addr']
                    );
    }
   
    // don't know why print_r is a must. otherwise won't work
    print(json_encode($data));
    return json_encode($data);  
}


/**  Function to Delete row  **/

function delete_row() {
    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index;     
    //print_r($data)   ;
    $result = mysql_query("DELETE FROM crm WHERE id = ".$index);
    if($result)
        return true;
    return false;     
}

/**  Function to Edit row  **/

function edit_row() {
    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index; 
    $result = mysql_query('SELECT * from crm WHERE id='.$index) or die('error editing');
    $row = array();
    $row = mysql_fetch_row($result);
    // don't know why print_r is a must. otherwise won't work
    print_r(json_encode($row));
    return json_encode($row);  
}

/** Function to Update row **/

function update_row(){
    $data = json_decode(file_get_contents("php://input"));     
    
    $id             =   $data->id;
    $inn_name      =   $data->inn_name;    
    $tel     =   $data->tel;
    $fax     =   $data->fax;
    $addr  =   $data->addr;

    //print_r($data);
 
    $qry = "UPDATE `crm` set `inn_name`='".$inn_name."' , `tel`='".$tel."',`fax`='".$fax."',`addr`='".$addr."' WHERE `id`=".$id;
    //$qry = sprintf("UPDATE crm set prod_name=%s, $prod_name=%s, prod_desc=%s, prod_price=%d, prod_quantity=%d WHERE id=%d")  
    //$qry = "UPDATE crm set prod_name='mark' where id=1";
    mysql_query($qry) or die('error updating');     
}

function importCsv(){
    $data = json_decode(file_get_contents("php://input")); 
    $filename = $data->filename;
    $fd = fopen($filename, 'r') or die ('error opening csv file');
   
    //while(!feof($fd){ 
    $csv=[];
    while($csv = fgetcsv($fd, 1000, ",")){
              
        mysql_query("INSERT INTO abc (1st, 2nd) VALUES 
                ( 
                    '".addslashes($csv[0])."', 
                    '".addslashes($csv[1])."'                   
                ) 
            ") or die ('error insertion'); 
            
    }   
    fclose($fd);      
}
  
function __destruct(){
    mysql_close($con);
    return true;
}

?>