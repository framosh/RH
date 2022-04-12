<html>
<head>
<meta charset="UTF-8">	
<title>Reporte de vacantes</title>
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
<b>Reporte General de Vacantes</b></h1>

<?php
//Estatus=" + estatus+"&empresa="+cliente_clv+"&nombre="+empresa;
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
echo "<p><b>Reporte de fecha: $f</b></p>";
echo "<p><b>Empresa: $emp</b></p>";
echo "<p><b>Estatus: $Estatus<b></p>";

require 'arhsi_connect.php';

$query="SELECT Vacantes.clv_vacante, Vacantes.emp_clave, Empresa.emp_nom, Puestos.puesto_desc, Vacantes.Funciones,
 Vacantes.Requisitos, Vacantes.Nivel, Vacantes.Lugar, Vacantes.vac_fech_reg, Vacantes.vac_sdo1, Vacantes.vac_sdo2, Vacantes.horario, 
 Vacantes.Observaciones FROM Vacantes 
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

        $fecha = date('d F, Y', strtotime($row[8]));
		echo '<tr><td align="left"  font="arial">'.
		$row[2]  .'</td><td align="left" >'.
		$row[0]  .'</td><td align="left" >'.
		$row[3]  .'</td><td align="left" >'.
		$row[6]  .'</td><td align="left" >'.
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
	echo 'Reporte vacio, no se puede emitir la consulta<br>';
	mysqli_error($dbc);
	}

mysqli_close($dbc);
?>
</body>
</html>