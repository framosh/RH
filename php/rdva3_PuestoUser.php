<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Reporte de Puestos</title>
<meta charset="UTF-8">
<h1>Reporte de Puestos de usuarios del Sistema</h1>
</head>
<body>

<?php
require 'arhsi_connect.php';
$query="SELECT puesto.puesto_clv, puesto.puesto_nom, puesto.puesto_est, area.area_nom FROM puesto 
LEFT JOIN area ON area.area_clv = puesto.area_clv
WHERE 1 ORDER BY puesto_nom ASC";

$response=mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "<div>Reporte de fecha: $f</div>";
	echo '<table>
	<tr><td align="center" font="./arial"><b>Clave</b> </td>
        <td aling="left" font="./arial"><b>Nombre</b> </td>
        <td aling="left" font="./arial"><b>Estatus</b> </td>
		<td aling="left" font="./arial"><b>Area</b> </td></tr></div>';

	while($row = mysqli_fetch_array($response))
		{
		$opcion2="Sin estatus";
		switch ($row[2])
				{
				case 1:
						$opcion2 = "Activo";
						break; 
				case 2:
						$opcion2 = "Baja";
						break;
				default:
						$opcion2 = "Sin estatus";
				 }

       	    echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
	       $row[1] .'</td><td align="left" >'.
           $opcion2 .'</td><td align="left" >'.
		   $row[3] .'</td></tr>';
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