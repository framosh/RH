<?php
$candidato = $_GET['Candidato'];
$cand_nom = $_GET['Nombre'];
$emp_nom = $_GET['Empresa'];
$vacante = $_GET['Vacante'];
$vac_nom = $_GET['Vac_nom'];

$nivel1=["","Bajo","Medio","Alto"];
$consulta ="Candidatos.cand_key='$candidato'";	

require 'arhsi_connect.php';

  $query="SELECT conocimientos.cono_desc, Con_candidato.con_nivel, Con_candidato.con_anios,
  Con_candidato.con_meses 
  FROM Candidatos
  LEFT JOIN Con_candidato ON Con_candidato.cand_key = Candidatos.cand_key
  LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_candidato.clv_conocim
  WHERE $consulta ORDER BY conocimientos.cono_desc ASC, Con_candidato.con_nivel ASC";  

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
    global $candidato,$cand_nom, $emp_nom, $vacante, $vac_nom, $nivel1;
    $candidatox = $candidato." - ".$cand_nom;
    $vacantex = $vacante." - ".$vac_nom;
    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $separador = '|';
        $encabezado1 = array();
        $encabezado1[0] = "CONOCIMIENTOS POR CANDIDATO";
        fputcsv($stream, $encabezado1,$separador);

        $encabezado1[0] = "Fecha:".$f;
        fputcsv($stream, $encabezado1,$separador);

        $columnHeaders = array();
        $columnHeaders[0] = "Empresa:";
        $columnHeaders[1] = $emp_nom;
        fputcsv($stream, $columnHeaders,$separador);

        $vacantex = iconv('UTF-8','ISO-8859-15',$vacantex);
        $columnHeaders[0] = "Vacante:";
        $columnHeaders[1] = $vacantex;
        fputcsv($stream, $columnHeaders,$separador);

        $candidatox = iconv('UTF-8','ISO-8859-15',$candidatox);
        $columnHeaders[0] = "Candidato:";
        $columnHeaders[1] = $candidatox;
        fputcsv($stream, $columnHeaders,$separador);

        $columnas = array();
        $columnas[0] = "CONOCIMIENTO";
        $columnas[1] = "NIVEL";
        $columnas[2] = "AÑOS";
        $columnas[3] = "MESES";
        $columnas[2] = iconv('UTF-8','ISO-8859-15',$columnas[2]);
        fputcsv($stream, $columnas,$separador);
        }

        //  $query="SELECT conocimientos.cono_desc, Con_candidato.con_nivel, Con_candidato.con_anios,
//  Con_candidato.con_meses 

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        $row[0] = iconv('UTF-8','ISO-8859-15',$row[0]);
        $row[1]=$nivel1[$row[1]];

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
}?>