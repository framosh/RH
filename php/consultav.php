<?php 
$Clave=$_GET['Clave'];

require 'arhsi_connect.php';
$query="SELECT * FROM Vacantes WHERE clv_vacante='$Clave'";
$result = mysqli_query($dbc,$query);

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
    $delimitier='|';
    while($row = mysqli_fetch_row($result)) {
        // $row=utf8_encode($row);
        fputcsv($stream, $row, $delimitier);
        $nrows++;
    }
    return $nrows;
}
?>