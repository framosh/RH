<?php
require 'arhsi_connect.php';

$query="SELECT * FROM aplicacion WHERE 1 ORDER BY apli_nom ASC";

$result = mysqli_query($dbc,$query);
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
//    global $estatus3;

    if($showColumnHeaders) {
        $columnHeaders = array();
        $columnHeaders[0] = "REPORTE DE APLICACIONES";
        $separador = '|';
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "CLAVE";
        $columnHeaders[1] = "NOMBRE";
        $columnHeaders[2] = "ESTATUS";
        $columnHeaders[3] = "DESCRIPCION";
        $columnHeaders[4] = "DIRECCION WEB";
        $separador = '|';
        fputcsv($stream, $columnHeaders,$separador);
        }

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
//        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
        $row[3] = iconv('UTF-8','ISO-8859-15',$row[3]);

		$opcion2="Sin estatus";
		switch ($row[2])
				{
				case 1:
						$opcion2 = "Activo";
						break; 
				case 2:
						$opcion2 = "Baja";
						break;
				default:
						$opcion2 = "Sin estatus";
                 }
        $row[2]=$opcion2;
        $separador = '|';
        fputcsv($stream, $row, $separador);
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