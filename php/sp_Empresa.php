<?php
require 'arhsi_connect.php';

$query="SELECT Empresa.emp_clave, Empresa.emp_nom, Empresa.emp_tel1, Empresa.emp_tel2, Empresa.emp_dir,
Empresa.emp_col, Empresa.emp_del, Estado.nombre, Empresa.emp_obs, Empresa.Estatus FROM Empresa 
LEFT JOIN Estado ON Estado.estadoclv = Empresa.estadoclv
WHERE 1";

$result = mysqli_query($dbc,$query);
if($result){
    csvToExcelDownloadFromResult($result);
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

function csvFromResult($stream, $result, $showColumnHeaders = true) {
    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $columnHeaders = array();
        $separador = '|';
        $columnHeaders[0] = "REPORTE DE CLIENTES";
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Fecha: ". $f;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "CLAVE CLIENTE";
        $columnHeaders[1] = "NOMBRE CLIENTE";
        $columnHeaders[2] = "TELEFONO 1";
        $columnHeaders[3] = "TELEFONO 2";
        $columnHeaders[4] = "DIRECCION";
        $columnHeaders[5] = "COLONIA";
        $columnHeaders[6] = "DELEGACION";
        $columnHeaders[7] = "ESTADO";
        $columnHeaders[8] = "OBSERVACIONES";
        $columnHeaders[9] = "ESTATUS";
        fputcsv($stream, $columnHeaders,$separador);
        }

        $nrows = 0;
        while($row = mysqli_fetch_row($result)) {
            $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
            $row[4] = iconv('UTF-8','ISO-8859-15',$row[4]);
            $row[5] = iconv('UTF-8','ISO-8859-15',$row[5]);
            $row[6] = iconv('UTF-8','ISO-8859-15',$row[6]);
            $row[7] = iconv('UTF-8','ISO-8859-15',$row[7]);
            $row[8] = iconv('UTF-8','ISO-8859-15',$row[8]);
        
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