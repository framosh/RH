<?php 
//$clave=$_GET['clave'];
//$estatus="Activo";
//echo "Clave: $clave";

/* ABRE LA BASE DE DATOS */
require 'arhsi_connect.php';

//$query="SELECT * FROM Artista WHERE id ='$clave'";
$query="SELECT * FROM Artista WHERE 1";
$result = mysqli_query($dbc,$query);

if(!$result) {
  echo "No existe el Artista";
  mysqli_close($dbc);
  return null;
  }

Archivo($result);

function Archivo($result) {
    return creArchivo('php://output', $result);
}

function creArchivo($filename, $result) {
    $fp = fopen($filename, 'w');
    $rc = llenaDatos($fp, $result);
    fclose($fp);
    return $rc;
}


function llenaDatos($stream, $result) {
    $nrows = 0;
    $delimiter='|';
    while($row = mysqli_fetch_row($result)) {
        fputcsv($stream, $row, $delimiter);
        $nrows++;
    }
    return $nrows;
}
mysqli_close($dbc);
//echo json_encode($nrows);
echo json_array($nrows);
?>