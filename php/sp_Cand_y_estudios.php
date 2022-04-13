<?php
$campos1 = $_GET['Camposx21']; 
$campo = array();
$campo = explode('|',$campos1); 

$vacante=$campo[0];
$vac_nom=$campo[1];
$empresa=$campo[2];
$emp_nom=$campo[3];
$est_cand=$campo[4];
$est_cv=$campo[5];
$est_entrevista=$campo[6];
$est_evaluacion=$campo[7];
$estatus_cand = ["","Aceptado","Viable","Entrevistar","Aplicar examen","No aplica","Fuera de presupuesto","Edad fuera de rango"];
$estatus_cv = ["","Solicitar","Recivido","Enviar al cliente","No aplica"];
$estatus_entrevista = ["","Programar entrevista","Entrevista cancelada","Candidato no asistio","Realizada"];
$estatus_evaluacion = ["","Programar evaluación","Evaluación cancelada","Evaluación aprobada","Evaluación reporbada"];
$nivel1=["","Alto","Medio","Bajo"];
$edu_estatus = ["","Titulado","Pasante","Certificado","Trunco","Cursando"];

$consulta ="(Cand_x_vac.clv_vacante='$vacante') AND (Vacantes.emp_clave='$empresa')";

if($est_cand != "0"){
$cons_est_cand = " AND (Candidatos.clv_est_cand = '$est_cand')";
$est1_cand = $estatus_cand[$est_cand];
} else { 
	$cons_est_cand = "";
	$est1_cand ="Todos";
}

if($est_cv != "0"){
$cons_est_cv = " AND (Candidatos.clv_est_cv = '$est_cv')";
$est1_cv = $estatus_cv[$est_cv];
} else { 
	$cons_est_cv = "";
$est1_cv = "Todos";
}

if($est_entrevista != "0"){
	$cons_est_entrevista = " AND (Candidatos.clv_est_ent = '$est_entrevista')";
	$est1_entrevista = $estatus_entrevista[$est_entrevista];
	} else { 
		$cons_est_entrevista = "";
		$est1_entrevista = "Todos";
	}
	
if($est_evaluacion != "0"){
		$cons_est_evaluacion = " AND (Candidatos.clv_est_eval = '$est_evaluacion')";
		$est1_evaluacion = $estatus_evaluacion[$est_evaluacion];
		} else { 
			$cons_est_evaluacion = "";
		$est1_evaluacion = "Todos";
		}
	
$consulta = $consulta.$cons_est_cand. $cons_est_cv.$cons_est_entrevista.$cons_est_evaluacion;

require 'arhsi_connect.php';

  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, 
  Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand, Tipo_educa.edu_desc, 
  Edu_xcand.carrera, inst_educativa.inst_nombre, Edu_xcand.campus, Edu_xcand.edu_generacion, Edu_xcand.edu_estatus 
  FROM Cand_x_vac
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  LEFT JOIN Vacantes ON Vacantes.clv_vacante = Cand_x_vac.clv_vacante
  LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
  LEFT JOIN Edu_xcand ON Edu_xcand.cand_key = Candidatos.cand_key
  LEFT JOIN Tipo_educa ON Tipo_educa.clv_tip_edu = Edu_xcand.clv_tip_edu
  LEFT JOIN inst_educativa ON inst_educativa.clv_institucion = Edu_xcand.clv_institucion
  WHERE $consulta ORDER BY Candidatos.cand_nom ASC";  

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

function csvFromResult($stream, $result, $showColumnHeaders = true) {
    global $empresa, $emp_nom, $vacante2, $vac_nom2, $estatus_cand, $est1_cand, $est1_cv, $est1_entrevista, $est1_evaluacion,$nivel1;
    $f=Date("d-m-Y");

    if($showColumnHeaders) {
        $columnHeaders = array();
        $separador = '|';
        $columnHeaders[0] = "CANDIDATOS Y NIVEL DE ESTUDIOS POR VACANTE";
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
        $columnHeaders[1] = $vacante2;
        $columnHeaders[2] = $vac_nom2;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Estatus de candidatos:";
        $columnHeaders[1] = $est1_cand;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Estatus de Cvs:";
        $columnHeaders[1] = $est1_cv;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Estatus de entrevista:";
        $columnHeaders[1] = $est1_entrevista;
        fputcsv($stream, $columnHeaders,$separador);

        $evaluacion = "Estatus de evaluación";
        $evaluacion = iconv('UTF-8','ISO-8859-15',$evaluacion);

        $columnHeaders[0] = $evaluacion;
        $columnHeaders[1] = $est1_evaluacion;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "CLAVE";
        $columnHeaders[1] = "NOMBRE";
        $columnHeaders[2] = "TEL. CASA";
        $columnHeaders[3] = "TEL. CELULAR";
        $columnHeaders[4] = "CORREO";
        $columnHeaders[5] = "PUESTO";
        $columnHeaders[6] = "ESTATUS";
        $titulox1 = "EDUCACIÓN";
        $titulox1 = iconv('UTF-8','ISO-8859-15',$titulox1);
        $columnHeaders[7] = $titulox1;
        $columnHeaders[8] = "CARRERA";
        $titulox1 = "INSTITUCIÓN";
        $titulox1 = iconv('UTF-8','ISO-8859-15',$titulox1);
        $columnHeaders[9] = $titulox1;
        $columnHeaders[10] = "CAMPUS";
        $titulox1 = "GENERACIÓN";
        $titulox1 = iconv('UTF-8','ISO-8859-15',$titulox1);
        $columnHeaders[11] = $titulox1;
        $columnHeaders[12] = "ESTATUS";

        fputcsv($stream, $columnHeaders,$separador);
        }
//  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, 
//Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand, Tipo_educa.edu_desc, 
//Edu_xcand.carrera, inst_educativa.inst_nombre, Edu_xcand.campus, Edu_xcand.edu_generacion, Edu_xcand.edu_estatus 
    
    $nrows = 0;
    $clave = "";
    while($row = mysqli_fetch_row($result)) {
        $row[1] = iconv('UTF-8','ISO-8859-15',$row[1]);
        $row[5] = iconv('UTF-8','ISO-8859-15',$row[5]);
        $row[7] = iconv('UTF-8','ISO-8859-15',$row[7]);
        $row[8] = iconv('UTF-8','ISO-8859-15',$row[8]);
        $row[9] = iconv('UTF-8','ISO-8859-15',$row[9]);
        $row[10] = iconv('UTF-8','ISO-8859-15',$row[10]);
        $row[6] = $estatus_cand[$row[6]];
        $row[12] = $edu_estatus[$row[12]];

        if($clave == $row[0]){
            for($i1=0;$i1<7;$i1++){
                $row[$i1]="";
            }
        } else {
            $clave = $row[0];
        }

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