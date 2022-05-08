<html>
<head>
<meta charset="UTF-8">	
<title>Reporte de vacantes por cliente</title>
<style>
	p {
		font-family: arial;		
	}

table {
	font-family: arial;
	border-collapse: collapse;
	width: 120%;
	}
td, th {
        font-family: arial;
	border: 1px solid #dddddd;
	text-aling: left;
	padding: 8px;
	}
tr:nth-child(even) {
        font-family: arial;
	background-color: #dddddd;
	}
</style>

</head>
<body style="background-color: #BDBDF0;">
<h1 style="color:#1E1CE2; font-family:verdana; font-size:150%; text-align:center;">
<b>Reporte de Vacantes por Cliente</b></h1>

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

$emp=$Empresa." - ".$Nombre;
$f=Date("d-m-Y");
echo "<p><b>Reporte de fecha: $f</b></p>";
echo "<p><b>Empresa: $emp</b></p>";
echo "<p><b>Estatus: $Estatus<b></p>";
echo "<p><b>Periodo de: $fecha1 a: $fecha2<b></p>";

require 'arhsi_connect.php';

$query="SELECT Vacantes.clv_vacante, Vacantes.emp_clave, Empresa.emp_nom, Puestos.puesto_desc, Vacantes.Funciones,
 Vacantes.Requisitos, Vacantes.Nivel, Vacantes.Lugar, Vacantes.vac_fech_reg, Vacantes.vac_sdo1, Vacantes.vac_sdo2, 
 Vacantes.horario, Vacantes.Observaciones, Vacantes.Estatus FROM Vacantes 
LEFT JOIN Empresa ON Empresa.emp_clave = Vacantes.emp_clave
LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
WHERE $consulta ORDER BY Vacantes.emp_clave ASC, Vacantes.clv_vacante DESC";

$bgc2="darkgrey";
$response=mysqli_query($dbc,$query);
if($response)
	{
	echo '<table align="left" style="width:170%;">
	<tr style="background-color:'.$bgc2.';">
	<td aling="left"  font="./arial"><b>Empresa</b>     </td>
	<td align="Center"    font="./arial"><b>Clave Vac.</b>    </td>
	<td align="Center"    font="./arial"><b>Puesto</b>    </td>
	<td align="Center"    font="./arial"><b>Nivel</b>    </td>
    <td align="Center"    font="./arial"><b>Estatus</b>    </td>
	<td align="Center"    font="./arial"><b>Requisitos</b>    </td>
	<td align="Center"    font="./arial"><b>Funciones</b>     </td>
	<td align="center"    font="./arial"><b>Lugar</b>   </td>
	<td align="center"    font="./arial"><b>Horario</b>   </td>
	<td align="center"    font="./arial"><b>Observaciones</b>   </td>
	<td align="Center"    font="./arial"><b>Rango 1 Sdo</b>    </td>
	<td align="Center"    font="./arial"><b>Rango 2 Sdo</b>    </td>
	<td align="center"  font="./arial"><b>Fecha registro</b>   </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		$row[6]=$nivel[$row[6]];
        $row[13]=$estatus_vac[$row[13]];
//        $estatus_vac=["","Activa","Cerrada","Cancelada"];

        $fecha = date('d F, Y', strtotime($row[8]));
		echo '<tr><td align="left"  font="arial">'.
		$row[2]  .'</td><td align="left" >'.
		$row[0]  .'</td><td align="left" >'.
		$row[3]  .'</td><td align="left" >'.
		$row[6]  .'</td><td align="left" >'.
        $row[13]  .'</td><td align="left" >'.
        $row[5]  .'</td><td align="left" >'.
		$row[4]  .'</td><td align="left" >'.
		$row[7]  .'</td><td align="left" >'.
		$row[11]  .'</td><td align="left" >'.
		$row[12]  .'</td><td align="left" >'.
		"$".$row[9]  .'</td><td align="left" >'.
		"$".$row[10]  .'</td><td align="left" >'.
		$fecha   .'</td></tr>';
		}
	echo '</table>';
	} 
else {
	echo 'Reporte vacio, no se puede emitir la consulta: '.$consulta.'<br>';
	mysqli_error($dbc);
	}

mysqli_close($dbc);
?>
</body>
</html>