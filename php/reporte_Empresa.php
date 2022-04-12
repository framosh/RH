<html>
<head>
<meta charset="UTF-8">	
<title>Reporte de Empresas</title>
<h1 style="color:blue; font-family:verdana; font-size:150%; text-align:center;">
<b>Reporte de Empresas</b></h1>

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
<?php
require 'arhsi_connect.php';

$query="SELECT Empresa.emp_clave, Empresa.emp_nom, Empresa.emp_tel1, Empresa.emp_tel2, Empresa.emp_dir,Empresa.emp_col, Empresa.emp_del,
Estado.nombre, Empresa.emp_obs, Empresa.Estatus FROM Empresa 
LEFT JOIN Estado ON Estado.estadoclv = Empresa.estadoclv
WHERE 1";

$response=@mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	$bgc2="darkgrey";
	echo "<p><b>Reporte de fecha: $f</b></p>";
	echo '<table align="left" style="width:130%;">
	<tr style="background-color:'.$bgc2.';">
	<td aling="center"font="./arial"><b>Clave</b>     </td>
	<td align="center"    font="./arial"><b>Empresa</b>    </td>
	<td align="center"  font="./arial"><b>Telefono 1</b>     </td>
	<td align="center"    font="./arial"><b>Telefono 2</b>   </td>
	<td align="center"    font="./arial"><b>Direccion</b>   </td>
	<td align="center"  font="./arial"><b>Colonia</b></td>
	<td align="center"  font="./arial"><b>Delegacion</b>      </td>
	<td align="center"  font="./arial"><b>Estado</b>      </td>
	<td align="center"  font="./arial"><b>Observaciones</b>      </td>
	<td align="center"  font="./arial"><b>Estatus</b>      </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		echo '<tr><td align="center"  font="arial">'.
		$row['emp_clave']     .'</td><td align="left" >'.
		$row['emp_nom']    .'</td><td align="left" >'.
		$row['emp_tel1']     .'</td><td align="left" >'.
		$row['emp_tel2']   .'</td><td align="left" >'.
		$row['emp_dir']   .'</td><td align="left" >'.
		$row['emp_col'].'</td><td align="left" >'.
		$row['emp_del']      .'</td><td align="left">'.
		$row['nombre']      .'</td><td align="left">'.
		$row['emp_obs']      .'</td><td align="center">'.
		$row['Estatus'] .'</td></tr>';
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