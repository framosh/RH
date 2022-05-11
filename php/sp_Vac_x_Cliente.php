<?php
$campos1 = $_GET['Camposx21']; 
$campo = array();
$campo = explode('|',$campos1); 
$estatus_vac=["","Activa","Cerrada","Cancelada"];
$nivel=["","Sr.","Medio","Jr."];

$Empresa=$campo[0];
$Nombre=$campo[1];
$Estatus=$campo[2];
$fecha1=$campo[3];
$fecha2=$campo[4];

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
$y="";
$y2="";
if($estatus >= 1 && $estatus <=3){
	$estatus2 ="(Vacantes.Estatus='$estatus')";
}

$cliente = "";
if($Empresa >0){
	$cliente ="(Vacantes.emp_clave = '$Empresa')";
} else {
    $Empresa = "0";
    $Nombre = "Todas";
} 

$fechax = "";
if($fecha1 != "" && $fecha2 != ""){
	$fechax ="(Vacantes.vac_fech_reg >= '$fecha1' AND Vacantes.vac_fech_reg <= '$fecha2')";
} 

if($estatus != "" && $cliente != ""){
    $y1=" AND ";
}

if($cliente != "" && $fechax != ""){
    $y2=" AND ";
}

if($fechax != "" && $estatus != ""){
    $y1=" AND ";
}

$consulta ="";
$consulta =$estatus2.$y1.$cliente.$y2.$fechax;

if($consulta == ""){
$consulta = "1";
}

if($Estatus == 0){
$Estatus ="Todos";
}

if($fecha1 == "" || $fecha2 == ""){
$fecha1 = "Enero";
$fecha2 = "Diciembre";
}

setlocale(LC_ALL,"es_ES");
$emp=$Empresa." - ".$Nombre;
$f=Date("d-m-Y");

require 'arhsi_connect.php';

$query="SELECT Vacantes.clv_vacante, Vacantes.emp_clave, Empresa.emp_nom, Puestos.puesto_desc, 
Vacantes.Nivel, Vacantes.Estatus, Vacantes.vac_fech_reg, Vacantes.vac_sdo1, Vacantes.vac_sdo2, 
Vacantes.horario, Vacantes.Funciones, Vacantes.Requisitos,  Vacantes.Lugar, Vacantes.Observaciones 
FROM Vacantes 
LEFT JOIN Empresa ON Empresa.emp_clave = Vacantes.emp_clave
LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
WHERE $consulta ORDER BY Vacantes.emp_clave ASC, Vacantes.clv_vacante DESC";

$result = mysqli_query($dbc,$query);
if($result){
    csvToExcelDownloadFromResult($result);
} else {
	echo 'Reporte vacio, no se puede emitir la consulta: '.$consulta.'<br>';
	mysqli_error($dbc);
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
        global $Estatus,$f,$emp,$fecha1,$fecha2,$nivel,$estatus_vac;
    
        if($showColumnHeaders) {
            $columnHeaders = array();
            $separador = '|';
            $columnHeaders[0] = "REPORTE DE VACANTES POR CLIENTE";
            fputcsv($stream, $columnHeaders,$separador);
    
            $columnHeaders[0] = "Empresa: ". $emp;
            fputcsv($stream, $columnHeaders,$separador);
    
            $columnHeaders[0] = "Estatus: ". $Estatus;
            fputcsv($stream, $columnHeaders,$separador);
    
            $columnHeaders[0] = "Fecha: ". $f;
            fputcsv($stream, $columnHeaders,$separador);

            $columnHeaders[0] = "Periodo de: ". $fecha1." a: ".$fecha2;
            fputcsv($stream, $columnHeaders,$separador);

            $columnHeaders[0] = "CLAVE VACANTE";
            $columnHeaders[1] = "CLV. CLIENTE";
            $columnHeaders[2] = "NOMBRE CLIENTE";
            $columnHeaders[3] = "PUESTO";
            $columnHeaders[4] = "NIVEL";
            $columnHeaders[5] = "ESTATUS";
            $columnHeaders[6] = "FECHA REGISTRO";
            $columnHeaders[7] = "SUELDO INF.";
            $columnHeaders[8] = "SUELDO SUP.";
            $columnHeaders[9] = "HORARIO";
            $columnHeaders[10] = "FUNCIONES";
            $columnHeaders[11] = "REQUISITOS";
            $columnHeaders[12] = "LUGAR";
            $columnHeaders[13] = "OBSERVACIONES";
            fputcsv($stream, $columnHeaders,$separador);
            }

        $nrows = 0;
        $separador = '|';
        while($row = mysqli_fetch_row($result)) {
            $row[3] = iconv('UTF-8','ISO-8859-15',$row[3]);
            $row[2] = iconv('UTF-8','ISO-8859-15',$row[2]);
            $row[10] = iconv('UTF-8','ISO-8859-15',$row[10]);
            $row[11] = iconv('UTF-8','ISO-8859-15',$row[11]);
            $row[13] = iconv('UTF-8','ISO-8859-15',$row[13]);
$row[4]=$nivel[$row[4]];
$row[5]=$estatus_vac[$row[5]];
    
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