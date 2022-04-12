<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

if($_REQUEST["Clave"])
	$Clave=$_REQUEST["Clave"];
else
	$Clave = "PSDA1";

/* ABRE LA BASE DE DATOS */
require 'arhsi_connect.php';

/* GENERA EL QUERY PARA CONSULTA EN LA BASE DE DATOS Y LO EJECUTA */

$query="SELECT * FROM Vacantes WHERE Clave ='$Clave'";
$result = mysqli_query($dbc,$query);

csvToExcelDownloadFromResult($result);

function csvToExcelDownloadFromResult($result, $showColumnHeaders = false, $asFilename = 'datos.txt') {
//    setExcelContentType();
//    setDownloadAsHeader($asFilename);
    return creArchivo('php://output', $result, $showColumnHeaders);
}

// Crea archivo CVS
function creArchivo($filename, $result, $showColumnHeaders = false) {
    $fp = fopen($filename, 'w');
    $rc = llenaDatos($fp, $result, $showColumnHeaders);
    fclose($fp);
    return $rc;
}


// Send stream to CVS from MySQL result
function llenaDatos($stream, $result, $showColumnHeaders = false) {
/*
    if($showColumnHeaders) {
        $columnHeaders = array();
        $nfields = mysqli_num_fields($result);
        for($i = 0; $i < $nfields; $i++) {
            $field = mysqli_fetch_field_direct($result, $i);
	    //$field = @mysqli_field_name($result, $i);
            $columnHeaders[] = $field->name;
        }
        fputcsv($stream, $columnHeaders);
    }
*/
    $nrows = 0;
    $delimitier='|';
    while($row = mysqli_fetch_row($result)) {
        fputcsv($stream, $row, $delimitier);
        $nrows++;
    }

    return $nrows;
}

// Setup headers
function setExcelContentType() {
    if(headers_sent())
        return false;

    header('Content-type: application/vnd.ms-excel');
    return true;
}


function setDownloadAsHeader($filename) {
    if(headers_sent())
        return false;

    header('Content-disposition: attachment; filename=' . $filename);
    return true;
}
?>
