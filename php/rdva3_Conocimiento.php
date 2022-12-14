<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Catalogo de Conocimientos</title>
<meta charset="UTF-8">
<h1>Catalogo de Conocimientos</h1>
</head>
<body>

<?php
require 'arhsi_connect.php';
$query="SELECT * FROM conocimientos WHERE 1 ORDER BY cono_desc ASC";

$response=mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "<div>Reporte de fecha: $f</div>";
	echo '<table>
	<tr><td align="center" font="./arial"><b>Clave</b> </td>
        <td aling="left" font="./arial"><b>Nombre</b> </td></tr></div>';

	while($row = mysqli_fetch_array($response))
		{
       	    echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
	       $row[1] .'</td></tr>';
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