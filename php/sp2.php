<?php
require 'arhsi_connect.php';
$query="SELECT * FROM Vacantes  WHERE 1";
$result = mysqli_query($dbc,$query);

csvToExcelDownloadFromResult($result);

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

// Send stream to CVS from MySQL result
function csvFromResult($stream, $result, $showColumnHeaders = false) {
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