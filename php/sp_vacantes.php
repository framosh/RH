<?php
$Estatus=$_GET['Estatus'];
$Empresa=$_GET['empresa'];
$Nombre=$_GET['nombre'];
$estatus =0;

if ($Estatus == "Activa") {
	$estatus = 1;
}
if ($Estatus == "Cerrada") {
	$estatus = 2;
}
if ($Estatus == "Cancelada") {
	$estatus = 3;
}

$estatus2="";
if($estatus >= 1 && $estatus <=3){
	$estatus2 ="Vacantes.Estatus='$estatus'";
}

$cliente = "";
if($Empresa >0){
	$cliente =" AND (Vacantes.emp_clave = '$Empresa')";
} else {
	$nombre="Todas";
}

$consulta ="";
$consulta =$estatus2.$cliente;

if($consulta == ""){
$consulta = "1";
}

$emp=$Empresa." - ".$Nombre;
$f=Date("d-m-Y");

require 'arhsi_connect.php';

$query="SELECT Vacantes.clv_vacante, Vacantes.emp_clave, Empresa.emp_nom, Puestos.puesto_desc, Vacantes.Funciones,
 Vacantes.Requisitos, Vacantes.Nivel, Vacantes.Lugar, Vacantes.vac_fech_reg, Vacantes.vac_sdo1, Vacantes.horario, 
 Vacantes.Observaciones FROM Vacantes 
LEFT JOIN Empresa ON Empresa.emp_clave = Vacantes.emp_clave
LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
WHERE $consulta ORDER BY Vacantes.emp_clave ASC, Vacantes.clv_vacante DESC";

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
    global $Estatus,$f,$emp;

    if($showColumnHeaders) {
        $columnHeaders = array();
        $separador = '|';
        $columnHeaders[0] = "REPORTE DE VACANTES";
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Empresa: ". $emp;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Estatus: ". $Estatus;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "Fecha: ". $f;
        fputcsv($stream, $columnHeaders,$separador);

        $columnHeaders[0] = "CLAVE VACANTE";
        $columnHeaders[1] = "CLV. CLIENTE";
        $columnHeaders[2] = "NOMBRE CLIENTE";
        $columnHeaders[3] = "PUESTO";
        $columnHeaders[4] = "FUNCIONES";
        $columnHeaders[5] = "REQUISITOS";
        $columnHeaders[6] = "NIVEL";
        $columnHeaders[7] = "LUGAR";
        $columnHeaders[8] = "FECHA";
        $columnHeaders[9] = "SUELDO";
        $columnHeaders[10] = "HORARIO";
        $columnHeaders[11] = "OBSERVACIONES";
        fputcsv($stream, $columnHeaders,$separador);
        }
//$query="SELECT Vacantes.clv_vacante, Vacantes.emp_clave, Empresa.emp_nom, Puestos.puesto_desc, Vacantes.Funciones,
// Vacantes.Requisitos, Vacantes.Nivel, Vacantes.Lugar, Vacantes.vac_fech_reg, Vacantes.vac_sdo1, Vacantes.horario, 
// Vacantes.Observaciones FROM Vacantes 

    $nrows = 0;
    $separador = '|';
    while($row = mysqli_fetch_row($result)) {
        $row[3] = iconv('UTF-8','ISO-8859-15',$row[3]);
        $row[4] = iconv('UTF-8','ISO-8859-15',$row[4]);
        $row[4] = iconv('UTF-8','ISO-8859-15',$row[5]);
        $row[11] = iconv('UTF-8','ISO-8859-15',$row[11]);

        $nivel = $row[6];
        $nivel2 ="";
        switch ($nivel){
            case 1:
                $nivel2 ="Sr.";
                break;
            case 2:
                $nivel2 ="Medio.";
                break;
            case 3:
                $nivel2 ="Jr.";
                break;
            default:
                $nivel2 ="Sin nivel";
        }
        $row[6]=$nivel2;

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