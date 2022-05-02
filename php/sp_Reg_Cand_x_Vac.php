<?php
$vacante=$_GET["Vacante"];
$vac_nom=$_GET["Vac_nom"];
$empresa=$_GET["Empresa"];
$emp_nom=$_GET["Emp_nom"];

$estatus_cand = ["","Aceptado","Viable","Entrevistar","Aplicar examen","No aplica","Fuera de presupuesto","Edad fuera de rango"];
$estatus_cv = ["","Solicitar","Recivido","Enviar al cliente","No aplica"];
$estatus_entrevista = ["","Programar entrevista","Entrevista cancelada","Candidato no asistio","Realizada"];
$estatus_evaluacion = ["","Programar evaluación","Evaluación cancelada","Evaluación aprobada","Evaluación reporbada"];

$cons1="";
if($vacante != "0"){
    $cons1 = "(Cand_x_vac.clv_vacante=".$vacante.")";
    }

    $cons2="";

    if($empresa != "0"){
        $cons2 = "(Vacantes.emp_clave=".$empresa.")";
        }

$y ="";

        if($cons1 != "" && $cons2 != ""){
            $y = " AND ";
        }

        $consulta = $cons1.$y.$cons2;

require 'arhsi_connect.php';

  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand FROM Cand_x_vac
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  LEFT JOIN Vacantes ON Vacantes.clv_vacante = Cand_x_vac.clv_vacante
  LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
  WHERE $consulta ORDER BY Candidatos.cand_nom DESC";  

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

function csvFromResult($stream, $result, $showColumnHeaders = true) {
    global $empresa, $emp_nom, $vacante, $vac_nom;
    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $columnHeaders = array();
        $separador = '|';
        $columnHeaders[0] = "CANDIDATOS POR VACANTE Y EMPRESA";
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Fecha";
        $columnHeaders[1] = $f;
        fputcsv($stream, $columnHeaders,$separador);

//        $empx = $empresa+"-"+$emp_nom;
        $columnHeaders[0] = "Empresa:";
        $columnHeaders[1] = $empresa;
        $columnHeaders[2] = $emp_nom;
        fputcsv($stream, $columnHeaders,$separador);

//        $vacx = $vacante+"-"+$vac_nom;
        $columnHeaders[0] = "Vacante:";
        $columnHeaders[1] = $vacante;
        $columnHeaders[2] = $vac_nom;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "CLAVE";
        $columnHeaders[1] = "NOMBRE";
        $columnHeaders[2] = "TEL. CASA";
        $columnHeaders[3] = "TEL. CELULAR";
        $columnHeaders[4] = "CORREO";
        $columnHeaders[5] = "PUESTO";
        $columnHeaders[6] = "ESTATUS";
        fputcsv($stream, $columnHeaders,$separador);
        }
//  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, 
//Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand FROM Cand_x_vac

    $nrows = 0;
    while($row = mysqli_fetch_row($result)) {
        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
        $row[5] = iconv('UTF-8','ISO-8859-15',$row[5]);

        $row[6] = $estatus_cand[$row[6]];
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