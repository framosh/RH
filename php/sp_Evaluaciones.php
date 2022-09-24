<?php
    $consulta="1";

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

require 'arhsi_connect.php';
$query="SELECT Evaluaciones.clv_evaluacion, 
Evaluaciones.nombre_eval, conocimientos.cono_desc, Evaluaciones.puntaje_req, Evaluaciones.nivel_cono, 
Evaluaciones.observaciones 
FROM Evaluaciones 
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Evaluaciones.clv_conocim
WHERE $consulta ORDER BY Evaluaciones.clv_puesto ASC";

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
    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $separador = '|';
        $encabezado1 = array();
        $encabezado1[0] = "CATALOGO DE EVALUACIONES";
        fputcsv($stream, $encabezado1,$separador);

        $encabezado2 = array();
        $encabezado2[0] = "Fecha: ".$f;
        fputcsv($stream, $encabezado2,$separador);

        $columnHeaders = array();
        $columnHeaders[0] = "EVALUACION";
        $columnHeaders[1] = "CONOCIMIENTO";
        $columnHeaders[2] = "PUNTAJE MINIMO";
        $columnHeaders[3] = "NIVEL DE CONOCIMIENTO";
        $columnHeaders[4] = "OBSERVACIONES";
        fputcsv($stream, $columnHeaders,$separador);
        }

        //$query="SELECT Evaluaciones.clv_evaluacion, 
//Evaluaciones.nombre_eval, conocimientos.cono_desc, Evaluaciones.puntaje_req, Evaluaciones.nivel_cono, 
//Evaluaciones.observaciones 
$nivelx1=["Bajo","Medio","Alto"];
$campos=[];

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
        $row[2] = iconv('UTF-8','ISO-8859-15',$row[2]);
        $row[5] = iconv('UTF-8','ISO-8859-15',$row[5]);

        $nivel=$nivelx1[$row[4]];
        $evaluacion = $row[0]."-".$row[1];

        $campos[0] = $evaluacion;
        $campos[1] = $row[2];
        $campos[2] = $row[3];
        $campos[3] = $nivel;
        $campos[4] = $row[5];

        $separador = '|';        
        fputcsv($stream, $campos,$separador);
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