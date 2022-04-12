<?php
$estatus=$_GET['estatus'];

require 'arhsi_connect.php';
$estatus1="Acceso.estatus='$estatus'";

$query="SELECT Acceso.usuarioclv, Acceso.nombre, Acceso.correo, Acceso.nivel, Acceso.estatus, puesto.puesto_nom FROM Acceso
LEFT JOIN puesto ON puesto.puesto_clv = Acceso.puesto
WHERE $estatus1 ORDER BY Acceso.nombre";

$result=mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0)
    {
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
    global $estatus;
    $Fecha1=Date("d-m-Y");

    if($showColumnHeaders) {
        $columnHeaders = array();
        $encabezado1 = array();
        $separador = '|';
        $columnHeaders[0] = "REPORTE DE USUARIOS DEL SISTEMA";
        fputcsv($stream, $columnHeaders,$separador);

        $encabezado1[0] = "Estatus:";
        $encabezado1[1] = $estatus;
        fputcsv($stream, $encabezado1,$separador);

        $encabezado1[0] = "Fecha:";
        $encabezado1[1] = $Fecha1;
        fputcsv($stream, $encabezado1,$separador);

        $columnHeaders[0] = "CLAVE";
        $columnHeaders[1] = "NOMBRE";
        $columnHeaders[2] = "CORREO";
        $columnHeaders[3] = "NIVEL";
        $columnHeaders[4] = "ESTATUS";
        $columnHeaders[5] = "PUESTO";
        fputcsv($stream, $columnHeaders,$separador);
        }

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
        $row[5] = iconv('UTF-8','ISO-8859-15',$row[5]);
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
?>