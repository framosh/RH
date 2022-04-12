<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<meta charset="UTF-8">
<title>Reporte de Usuarios</title>
<h1>Usuarios del Sistema</h1>
</head>
<body>

<?php
$estatus1=$_GET['estatus'];

require 'arhsi_connect.php';
$estatus="Acceso.estatus='$estatus1'";

$query="SELECT Acceso.usuarioclv, Acceso.nombre, Acceso.correo, Acceso.nivel, Acceso.estatus, puesto.puesto_nom FROM Acceso
LEFT JOIN puesto ON puesto.puesto_clv = Acceso.puesto
WHERE $estatus ORDER BY Acceso.nombre";

$response=mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($response);

if($numero_filas >0)
	{
	$f=Date("d-m-Y");
	echo "<div><b>Reporte de fecha: $f<br>";
	echo "Estatus: $estatus1</b><br></div>";
	echo '<table>
	<tr align="center" font="./arial">
	<td><b>Clave</b> </td>
    <td><b>Nombre</b> </td>
	<td><b>Correo</b></td>
	<td><b>Nivel</b> </td>
	<td><b>Estatus</b> </td>
	<td><b>Puesto</b></td></tr>';

	while($row = mysqli_fetch_array($response))
		{
  	       echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
	       $row[1] .'</td><td align="left" >'.
	       $row[2] .'</td><td align="center" >'.
	       $row[3] .'</td><td align="center" >'.
		   $row[4] .'</td><td align="left" >'.
		   $row[5] .'</td></tr>';
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