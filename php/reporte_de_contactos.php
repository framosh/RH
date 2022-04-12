<html>
<head>
<title>Reporte de contactos</title>
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
<b>Reporte de Contactos</b></h1>

<?php

require 'arhsi_connect.php';
$query="SELECT * FROM Prospectos WHERE 1";
$response=@mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "Reporte de fecha: $f";
	echo '<table align="left">
	<tr><td aling="left"font="./arial"><b>Nombre</b>     </td>
	<td align="left"    font="./arial"><b>Empresa</b>    </td>
	<td align="center"  font="./arial"><b>Correo</b>     </td>
	<td align="left"    font="./arial"><b>Telefono</b>   </td>
	<td align="left"    font="./arial"><b>Producto</b>   </td>
	<td align="center"  font="./arial"><b>Comentarios</b></td>
	<td align="center"  font="./arial"><b>Fecha</b>      </td>
	<td align="left"    font="./arial"><b>Secuencial</b> </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		echo '<tr><td align="left"  font="arial">'.
		$row['Nombre']     .'</td><td align="left" >'.
		$row['Empresa']    .'</td><td align="left" >'.
		$row['correo']     .'</td><td align="left" >'.
		$row['Telefono']   .'</td><td align="left" >'.
		$row['Producto']   .'</td><td align="left" >'.
		$row['Comentarios'].'</td><td align="left" >'.
		$row['Fecha']      .'</td><td align="center">'.
		$row['Secuencial'] .'</td></tr>';
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