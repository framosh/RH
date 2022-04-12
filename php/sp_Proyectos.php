<?php


require 'arhsi_connect.php';

$query="SELECT Proyecto.proy_clave, Empresa.emp_nom, Servicios.nombre, Proyecto.fecha, Proyecto.contacto, Proyecto.telefono,
Proyecto.celular, Proyecto.correo, Proyecto.descripcion, Proyecto.estatus FROM Proyecto
LEFT JOIN Empresa ON Empresa.emp_clave = Proyecto.emp_clave
LEFT JOIN Servicios ON Servicios.servicio_clv = Proyecto.servicio
WHERE 1";

$result = mysqli_query($dbc,$query);

csvToExcelDownloadFromResult($result);
mysqli_close($dbc);


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
    if($showColumnHeaders) {
        $columnHeaders = array();
        $nfields = mysqli_num_fields($result);
        for($i = 0; $i < $nfields; $i++) {
            $field = mysqli_fetch_field_direct($result, $i);
            $columnHeaders[] = $field->name;
        }
        fputcsv($stream, $columnHeaders);
    }

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        fputcsv($stream, $row);
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