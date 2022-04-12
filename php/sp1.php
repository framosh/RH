<?php
require 'arhsi_connect.php';
$query="SELECT * FROM Vacantes WHERE 1 INTO OUTFILE 'registro1.txt' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'";

$result = @mysql_query($dbc,$query); 
if (!$result) die('Couldn\'t fetch records'); 
$num_fields = mysql_num_fields($result); 
$headers = array(); 

for ($i = 0; $i < $num_fields; $i++) 
       {
       $headers[] = mysql_field_name($result , $i); 
       } 

$fp = fopen('php://output', 'w'); 

if ($fp && $result) 
       {     
       header('Content-Type: text/csv');
       header('Content-Disposition: attachment; filename="export.csv"');
       header('Pragma: no-cache');    
       header('Expires: 0');
       fputcsv($fp, $headers); 
       while ($row = mysql_fetch_row($result)) 
              {
              fputcsv($fp, array_values($row)); 
              }
       die; 
       }
?>