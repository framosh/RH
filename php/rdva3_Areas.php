<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<meta charset="UTF-8">
<title>Reporte de Areas</title>
<h1>Reporte de Areas</h1>
</head>
<body>

<?php
require 'arhsi_connect.php';
$query="SELECT * FROM area WHERE 1 ORDER BY area_nom";

$response=mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "<div>Reporte de fecha: $f</div>";
	echo '<table>
	<tr><td align="center" font="./arial"><b>Clave</b> </td>
        <td align="left" font="./arial"><b>Nombre</b> </td>
        <td align="center" font="./arial"><b>Estatus</b> </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		$opcion2="Sin estatus";
		switch ($row[2])
				{
				case 1:
						$opcion2 = "Activa";
						break; 
				case 2:
						$opcion2 = "Baja";
						break;
				default:
						$opcion2 = "Sin estatus";
				 }

       	    echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
	       $row[1] .'</td><td align="center" >'.
	       $opcion2 .'</td></tr>';
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