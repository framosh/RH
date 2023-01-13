<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Experiencia del Candidato</title>
<meta charset="UTF-8">	
<h1>Experiencia del Cantidato</h1>
</head>
<body>

<?php
$Candidato=$_GET["Candidato"];
$Nombre_cand = $_GET["Nombre"];
$Experiencia=$_GET["Experiencia"];

require 'arhsi_connect.php';

if($Experiencia =="0"){
    $query = "SELECT * FROM Experiencia WHERE (cand_key='$Candidato') ORDER BY exp_clv";
} else {
    $query="SELECT * FROM Experiencia WHERE ((cand_key='$Candidato') AND (exp_clv='$Experiencia')) ORDER BY exp_clv";    
}

$response=mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($response);

if($response)
	{
	$f=Date("d-m-Y");
	echo "<div>Reporte de fecha:  $f";
	echo "<br>Candidato:  ". $Candidato." - ".$Nombre_cand."</div>";
	echo '<table style="width:150%;">
	<tr align="center" font="./arial"><td>
	<b>Clave Experiencia</b> </td>
	<td style="width:10%;"><b>Empresa</b></td>
	<td style="width:10%;"><b>Puesto</b></td>
	<td style="width:5%;"><b>Periodo</b></td>
	<td style="width:5%;"><b>Sueldo</b></td>
	<td style="width:10%;"><b>Jefe</b></td>
	<td style="width:25%;"><b>Actividades</b></td>
    <td style="width:15%;"><b>Motivo de separación</b></td>
	<td style="width:20%;"><b>Herramientas</b> </td></tr>';

//$query="SELECT Edu_xcand.clv_tip_edu,inst_educativa.inst_nombre,Edu_xcand.carrera,Edu_xcand.campus,Edu_xcand.edu_generacion,Edu_xcand.edu_estatus FROM Edu_xcand

	while($row = mysqli_fetch_array($response))
		{
			$row[7]=str_replace("\\n","<br>",$row[7]);

       	 echo '<tr><td align="center"  font="arial">'.
	       $row[1] .'</td><td align="left" >'.
	       $row[2] .'</td><td align="left" >'.
	       $row[3] .'</td><td align="left" >'.
		   $row[4] .'</td><td align="left" >'.
		   $row[5] .'</td><td align="left" >'.
           $row[6] .'</td><td align="left" >'.
           $row[7] .'</td><td align="left" >'.
           $row[8] .'</td><td align="left" >'.
		   $row[9] .'</td></tr>';
        }
    echo '</table>';
  }
else {
	echo 'Reporte vacio, no se puede emitir la consulta de la experiencia: '.$Experiencia;
	mysqli_error($dbc);
	}

mysqli_close($dbc);
?>
<div>
    <br>
    <button type="submit"  onclick="window.close();">Salir</button>
</div>
</body>
</html>