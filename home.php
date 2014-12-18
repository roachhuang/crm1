<form action="" method="post" enctype="multipart/form-data" name="form1" id="form1"> 
  Choose your file: <br /> 
  <input name="csv" type="file" id="csv" /> 
  <input type="submit" name="Submit" value="Submit" /> 
</form> 
<?php
require_once('./php/config.php');
if ($_FILES[csv][size] > 0) { 
    //get the csv file 
    $file = $_FILES[csv][tmp_name]; 
	$fd = fopen($file, 'r') or die ('fuck');
	print $fd;

	 do { 
			if ($data[0]) { 
				mysql_query("INSERT INTO abc (1st, 2nd) VALUES 
					( 
						'".addslashes($data[0])."', 
						'".addslashes($data[1])."'                   
					) 
				") or die ('error insertion'); 
				echo 'added';
			} 
		} while ($data = fgetcsv($fd,1000,",","'")); 
		//
	fclose($fd);	
}
?>
