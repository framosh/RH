<html>
<head>
<title>Reporte de candidatos</title>
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
<b>Reporte de Candidatos</b></h1>

<?php

require 'arhsi_connect.php';
$query="SELECT * FROM Candidatos WHERE 1";
$response=@mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "Reporte de fecha: $f";
	echo '<table align="left">
	<tr><td aling="left"font="./arial"><b>Nombre</b></td>
	<td align="left"    font="./arial"><b>Tel-1</b></td>
	<td align="left"    font="./arial"><b>Tel-2</b></td>
	<td align="left"    font="./arial"><b>Correo</b></td>
	<td align="left"    font="./arial"><b>Puesto</b></td>
	<td align="left"    font="./arial"><b>Area</b></td>
	<td align="left"    font="./arial"><b>Colonia</b></td>
	<td align="left"    font="./arial"><b>Estado</b></td>
	<td align="left"    font="./arial"><b>Estatus</b></td>
	<td align="left"    font="./arial"><b>Observaciones</b></td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		echo '<tr><td align="left"  font="arial">'.
		$row['cand_nom']    .'</td><td align="left">'.
		$row['cand_tel1']   .'</td><td align="left">'.
		$row['cand_tel2']   .'</td><td align="left">'.
		$row['cand_corr'] .'</td><td align="left">'.
		$row['cand_pue']    .'</td><td align="left">'.
		$row['cand_area']   .'</td><td align="left">'.
		$row['cand_col']    .'</td><td align="left">'.
		$row['cand_estado'] .'</td><td align="left">'.
		$row['cand_est']    .'</td><td align="left">'.
		$row['cand_obs']    .'</td></tr>';
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