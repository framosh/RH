<!DOCTYPE html>
<html lang="es">
<head>
<title>Reporte de Evaluaciones</title>
<meta charset="UTF-8">
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
<body style="background-color: #BDBDF0;">
<h1 style="color:#1E1CE2; font-family:verdana; font-size:150%; text-align:center;">
<b>Catalogo de Evaluaciones por Puesto</b></h1>

<?php
$consulta ="1";

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

$f=Date("d-m-Y");
echo "<div style='font-family:arial;'>Fecha reporte: $f<br></div>";

require 'arhsi_connect.php';
$query="SELECT Evaluaciones.clv_tipo_eval, Evaluaciones.nombre_eval, conocimientos.cono_desc, 
Evaluaciones.puntaje_req, Evaluaciones.nivel_cono, Evaluaciones.observaciones 
FROM Evaluaciones 
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Evaluaciones.clv_conocim
WHERE $consulta";

$response=mysqli_query($dbc,$query);
$bgc2="darkgrey";

if($response)
	{
	echo '<table>
    <tr style="background-color:'.$bgc2.';">
        <td aling="left" font="./arial"><b>Evaluacion</b> </td>
        <td aling="left" font="./arial"><b>Conocimiento</b> </td>
        <td aling="left" font="./arial"><b>Puntaje minimo</b> </td>
        <td aling="left" font="./arial"><b>Nivel de conocimiento</b> </td>
		<td aling="left" font="./arial"><b>Observaciones</b> </td></tr>';

//$query="SELECT Evaluaciones.clv_evaluacion, 
//Evaluaciones.nombre_eval, conocimientos.cono_desc, Evaluaciones.puntaje_req, Evaluaciones.nivel_cono, 
//Evaluaciones.observaciones 
$nivelx1=["Bajo","Medio","Alto"];

	while($row = mysqli_fetch_array($response))
		{
            $nivel=$nivelx1[$row[4]];
            $evaluacion = $row[0]."-".$row[1];

       	    echo '<tr><td align="center"  font="arial">'.
	       $evaluacion .'</td><td align="left" >'.
           $row[2] .'</td><td align="left" >'.
           $row[3] .'</td><td align="left" >'.
           $nivel .'</td><td align="left" >'.
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