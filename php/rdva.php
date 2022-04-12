<html>
<head>
<title>Reporte de vacantes</title>
<style>
table {
	font-family: arial, snas-serif;
	border-collapse: collapse;
	width: 100%;
	}
td, th {
	border: 1px solid #dddddd;
	text-aling: left;
	padding: 8px;
	}
tr:nth-child(even) {
	background-color: #dddddd;
	}
</style>

</head>
<body style="background-color:##B2B2E4;">
<h1 style="color:#1E1CE2; font-family:verdana; font-size:150%; text-align:center;">
<b>Vacantes Activas</b></h1>

<?php

//$Estatus=$_GET['Estatus'];

require 'arhsi_connect.php';
$query="SELECT * FROM Vacantes WHERE Estatus=Activa";
$response=@mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "Reporte de fecha: $f";
	echo '<table align="left">
	<tr><td aling="left"font="./arial"><b>Puesto</b>     </td>
	<td align="Center"    font="./arial"><b>Nivel</b>    </td>
	<td align="Center"    font="./arial"><b>Requisitos</b>    </td>
	<td align="Center"    font="./arial"><b>Funciones</b>     </td>
	<td align="center"  font="./arial"><b>Lugar</b>   </td>
	<td align="center"  font="./arial"><b>Fecha</b>   </td>
	<td align="left"    font="./arial"><b>Estatus</b>    </td>
	<td align="left"    font="./arial"><b>Clave</b></td></tr>';


	while($row = mysqli_fetch_array($response))
		{
                $fecha = date('d F, Y', strtotime($row['Fecha']));
		echo '<tr><td align="left"  font="arial">'.
		$row['Puesto']     .'</td><td align="left" >'.
		$row['Nivel']      .'</td><td align="center" >'.
		$row['Requisitos'] .'</td><td align="left" >'.
		$row['Funciones']  .'</td><td align="left" >'.
		$row['Lugar']      .'</td><td align="center" >'.
		$fecha             .'</td><td align="left" >'.
		$row['Estatus']    .'</td><td align="center" >'.
		$row['Clave']      .'</td></tr>';
		}
	echo '</table>';
	} 
else {
	echo 'Reporte vacio, no se puede emitir la consulta<br>';
	echo mysqli_error($dbc);
	}

/* mysqli_close($dbc); */

?>
</body>
</html>