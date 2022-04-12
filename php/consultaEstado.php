<?php 
$estado=$_GET['Estado'];

require 'arhsi_connect.php';

$query="SELECT nombre, estadoclv FROM Estado WHERE estadoclv='$estado'";
$result = mysqli_query($dbc,$query);
$filas = mysqli_affected_rows($result);

if($result){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo ("No existe el estado: "+$estado);
}

function Archivo($result) {
    return creArchivo('php://output',$result);
}

function creArchivo($filename,$result) {
    global $estado;

    $fp = fopen($filename, 'w');
    $rc = llenaDatos($fp, $result);
    if($rc == 0){
        echo ("No existe el estado: "+$estado);
        }
    fclose($fp);
    return $rc;
}

function llenaDatos($stream, $result) {
    $nrows = 0;
    $delimiter='|';
//    $enclosure=chr(34);
    while($row = mysqli_fetch_row($result)){
      fputcsv($stream, $row, $delimiter);
      $nrows++;
      }
    mysqli_free_result($result);
    return $nrows;
    }
?>