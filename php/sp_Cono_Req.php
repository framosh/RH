<?php
$vacante=$_GET["Vacante"];
$nombre=$_GET["Nombre"];
$empresa=$_GET["Empresa"];

require 'arhsi_connect.php';

$query="SELECT Con_req.clv_conocim, conocimientos.cono_desc, Con_req.nivel_conocim, Con_req.exp_anio_min, Con_req.exp_mes_min FROM Con_req 
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_req.clv_conocim
WHERE Con_req.clv_vacante='$vacante' 
ORDER BY Con_req.clv_conocim";

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
    global $estatus3,$empresa,$vacante,$nombre;
    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $separador = '|';
        $encabezado1 = array();
        $encabezado1[0] = "CONOCIMIENTOS POR VACANTE";
        fputcsv($stream, $encabezado1,$separador);

        $encabezado2 = array();
        $encabezado2[0] = $empresa;
        fputcsv($stream, $encabezado2,$separador);

        $encabezado2 = array();
        $encabezado2[0] = "Vacante: ".$vacante." - ".$nombre;
        fputcsv($stream, $encabezado2,$separador);

        $encabezado2 = array();
        $encabezado2[0] = "Fecha: ".$f;
        fputcsv($stream, $encabezado2,$separador);

        $columnHeaders = array();
        $columnHeaders[0] = "CLAVE";
        $columnHeaders[1] = "NOMBRE";
        $columnHeaders[2] = "NIVEL";
        $columnHeaders[3] = "AÑOS";
        $columnHeaders[4] = "MESES";
        $columnHeaders[3] = iconv('UTF-8','ISO-8859-15',$columnHeaders[3]);
        fputcsv($stream, $columnHeaders,$separador);
        }

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
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