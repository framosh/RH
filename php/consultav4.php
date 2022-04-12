<?php

if($_REQUEST["Clave"])
	$Clave=$_REQUEST["Clave"];
else
	$Clave = "PSDA1";

/* ABRE LA BASE DE DATOS */
require 'arhsi_connect.php';

$query="SELECT * FROM Vacantes WHERE Clave ='$Clave'";
$result = mysqli_query($dbc,$query);

csvToExcelDownloadFromResult($result);

function csvToExcelDownloadFromResult($result, $showColumnHeaders = false, $asFilename = 'datos.txt') {
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
        fputcsv($stream, $row, $delimitier);
        $nrows++;
    }
    return $nrows;
}
?>
