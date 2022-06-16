<?php 
$cliente=$_GET["Cliente"];
$condicion = "";

$estatus="Activo";
require 'arhsi_connect.php';

$query="SELECT usuarioclv,nombre FROM Acceso WHERE (estatus='$estatus' AND emp_clave='$cliente')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay usuarios");
}

function Archivo($result) {
  return creArchivo('php://output', $result);
 }

function creArchivo($filename, $result) {
$fp = fopen($filename, 'w');
$rc = llenaDatos($fp, $result);
fclose($fp);
if($rc==0) {
   echo("0|No hay usuarios");
   }
return $rc;
}

function llenaDatos($stream, $result) {
global $registros;
  $nrows = 0;
$delimiter='|';
while($row = mysqli_fetch_row($result)) {
  fputcsv($stream, $row, $delimiter);
  $nrows++;
  }
mysqli_free_result($result);
return $nrows;
}

?>