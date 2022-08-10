<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">	
<title>Vacantes activas</title>
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
<b>Vacantes Activas</b></h1>

<?php
$estatus_vac=["","Activa","Cerrada","Cancelada"];
$nivel=["","Sr.","Medio","Jr."];

$estatus = 1;
$estatus2 ="(Vacantes.Estatus='$estatus')";
$consulta =$estatus2;

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

$f=Date("d-m-Y");
echo "<div style='font-family:arial;'>Reporte de fecha: $f<br>";

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
	<td align="Center"    font="./arial"><b>Clave Vac.</b>    </td>
	<td align="Center"    font="./arial"><b>Puesto</b>    </td>
	<td align="Center"    font="./arial"><b>Nivel</b>    </td>
	<td width="6%" align="center"  font="./arial"><b>Fecha registro</b>   </td>
	<td align="Center"    font="./arial"><b>Requisitos</b>    </td>
	<td align="Center"    font="./arial"><b>Funciones</b>     </td>
	<td align="center"    font="./arial"><b>Lugar</b>   </td>
	<td align="center"    font="./arial"><b>Horario</b>   </td>
	<td align="center"    font="./arial"><b>Observaciones</b>   </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		$row[6]=$nivel[$row[6]];
		$fecha = date('d/m/Y', strtotime($row[8]));

		echo '<tr><td align="left"  font="arial">'.
		$row[0]  .'</td><td align="left" >'.
		$row[3]  .'</td><td align="center" >'.
		$row[6]  .'</td><td align="center" >'.
		$fecha .'</td><td align="left" >'.
        $row[5]  .'</td><td align="left" >'.
		$row[4]  .'</td><td align="left" >'.
		$row[7]  .'</td><td align="left" >'.
		$row[11]  .'</td><td align="left" >'.
		$row[12]  .'</td></tr>';
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