<?php
$Clave=$_GET["clave"];
$Nombre=$_GET["nombre"];

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

require 'arhsi_connect.php';
$query="SELECT clv_preg_om, nombre_pregom, desc_preg FROM Preg_om WHERE clv_conocim = '$Clave' ORDER BY nombre_pregom ASC";

$result=mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    csvToExcelDownloadFromResult($result);
    mysqli_close($dbc);
    }

function csvToExcelDownloadFromResult($result, $showColumnHeaders = true, $asFilename = 'datos.csv') {
    setExcelContentType();
    setDownloadAsHeader($asFilename);
    return csvFileFromResult('php://output', $result, $showColumnHeaders);
    }

// Crea archivo CVS
function csvFileFromResult($filename, $result, $showColumnHeaders = true) {
    $fp = fopen($filename, 'w');
    $rc = csvFromResult($fp, $result, $showColumnHeaders);
    fclose($fp);
    return $rc;
    }


// Pasa los datos al archivo abierto
function csvFromResult($stream, $result, $showColumnHeaders = true) {
    global $Nombre;

    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $separador = '|';
        $encabezado1 = array();
        $encabezado1[0] = "CATALOGO DE PEGUNTAS POR TIPO DE CONOCIMIENTO";
        fputcsv($stream, $encabezado1,$separador);

        $encabezado2 = array();
        $encabezado2[0] = "Fecha: ".$f;
        fputcsv($stream, $encabezado2,$separador);

        $encabezado2 = array();
        $encabezado2[0] = "Tipo Conocimiento: ".$Nombre;
        fputcsv($stream, $encabezado2,$separador);

        $columnHeaders = array();
        $columnHeaders[0] = "CLAVE";
        $columnHeaders[1] = "NOMBRE";
        $columnHeaders[2] = "DESCRIPCION";
        fputcsv($stream, $columnHeaders,$separador);
        }

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
        $row[2] = iconv('UTF-8','ISO-8859-15',$row[2]);

        $separador = '|';
        fputcsv($stream, $row,$separador);
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

mysqli_close($dbc);
?>