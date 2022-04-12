<html>
<head>
<title>Proyectos</title>

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

<body>
<h1 style="color:blue; font-family:verdana; font-size:150%; text-align:center;">
<b>Reporte de Proyectos</b></h1>

<?php


require 'arhsi_connect.php';

$query="SELECT Proyecto.proy_clave, Empresa.emp_nom, Servicios.nombre, Proyecto.fecha, Proyecto.contacto, Proyecto.telefono,
Proyecto.celular, Proyecto.correo, Proyecto.descripcion, Proyecto.estatus FROM Proyecto
LEFT JOIN Empresa ON Empresa.emp_clave = Proyecto.emp_clave
LEFT JOIN Servicios ON Servicios.servicio_clv = Proyecto.servicio
WHERE 1";

$response=@mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "Reporte de fecha: $f";
	echo '<table align="left">
	<tr><td aling="left"font="./arial"><b>Proyecto</b>     </td>
	<td align="left"    font="./arial"><b>Empresa</b>    </td>
	<td align="center"  font="./arial"><b>Servicio</b>     </td>
	<td align="left"    font="./arial"><b>Fecha</b>   </td>
	<td align="left"    font="./arial"><b>Contacto</b>   </td>
	<td align="center"  font="./arial"><b>Telefono</b></td>
	<td align="center"  font="./arial"><b>Celular</b>      </td>
	<td align="left"    font="./arial"><b>Correo</b> </td>
	<td align="left"    font="./arial"><b>Desctipcion</b> </td>
	<td align="left"    font="./arial"><b>Estatus</b> </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		echo '<tr><td align="left"  font="arial">'.
		$row['proy_clave']     .'</td><td align="left" >'.
		$row['emp_nom']    .'</td><td align="left" >'.
		$row['nombre']     .'</td><td align="left" >'.
		$row['fecha']   .'</td><td align="left" >'.
		$row['contacto']   .'</td><td align="left" >'.
		$row['telefono'].'</td><td align="left" >'.
		$row['celular']      .'</td><td align="center">'.
		$row['correo']      .'</td><td align="center">'.
		$row['descripcion']      .'</td><td align="center">'.
		$row['estatus'] .'</td></tr>';
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