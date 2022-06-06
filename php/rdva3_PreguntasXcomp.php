<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Catálogo de Preguntas por complemento por tipo de Conocimientos</title>
<meta charset="UTF-8">
<h1>Catálogo de Preguntas por complemento por tipo de Conocimiento</h1>
<style>
	p {
		font-family: arial;		
	}

table {
	font-family: arial;
	border-collapse: collapse;
	width: 100%;
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
<body>

<?php
$Clave=$_GET["clave"];
$Nombre=$_GET["nombre"];

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

require 'arhsi_connect.php';
$query="SELECT clv_preg_pc, nombre_pregpc, des_preg_xcom FROM Preg_xcom WHERE clv_conocim = '$Clave' ORDER BY nombre_pregpc ASC";

$response=mysqli_query($dbc,$query);
$bgc2="darkgrey";

if($response)
	{
	$f=Date("d-m-Y");
	echo "<div>Reporte de fecha: $f";
    echo "<br>Área de Conocimiento: $Nombre</div><br>";
	echo '<table>
    <tr style="background-color:'.$bgc2.';">
	<td align="center" font="./arial"><b>Clave</b> </td>
        <td font="./arial"><b>Nombre</b> </td>
        <td font="./arial"><b>Descripción</b> </td>
        </tr>';

	while($row = mysqli_fetch_array($response))
		{
       	    echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
           $row[1] .'</td><td align="left" >'.
	       $row[2] .'</td></tr>';
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