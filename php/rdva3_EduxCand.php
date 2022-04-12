<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Inventario educativo del Candidato</title>
<meta charset="UTF-8">	
<h1>Inventario educativo del Cantidato</h1>
</head>
<body>

<?php
$candidato=$_GET['candidato'];
$nombre=$_GET['nombre'];

require 'arhsi_connect.php';

if($candidato != "" && $candidato != null){
  $query="SELECT Edu_xcand.clv_tip_edu,inst_educativa.inst_nombre,Edu_xcand.carrera,Edu_xcand.campus,Edu_xcand.edu_generacion,Edu_xcand.edu_estatus FROM Edu_xcand
  LEFT JOIN Candidatos ON Candidatos.cand_key = Edu_xcand.cand_key
  LEFT JOIN inst_educativa ON inst_educativa.clv_institucion = Edu_xcand.clv_institucion
  WHERE Edu_xcand.cand_key='$candidato' ORDER BY inst_educativa.inst_nombre DESC";  
}

$response=mysqli_query($dbc,$query);
if($response)
	{
	$f=Date("d-m-Y");
	echo "<div>Reporte de fecha:  $f";
	echo "<br>Candidato:  ". $candidato."-".$nombre."</div>";
	echo '<table style="width:100%;">
	<tr align="center" font="./arial"><td>
	<b>Tipo Educación</b> </td>
	<td><b>Institución</b></td>
	<td><b>Carrera</b></td>
	<td><b>Campus</b></td>
	<td><b>Generación</b></td>
	<td width="7%"><b>Estatus</b> </td></tr>';

//$query="SELECT Edu_xcand.clv_tip_edu,inst_educativa.inst_nombre,Edu_xcand.carrera,Edu_xcand.campus,Edu_xcand.edu_generacion,Edu_xcand.edu_estatus FROM Edu_xcand

	while($row = mysqli_fetch_array($response))
		{
            if($row[0] == 0){ $row[0]="Sin tipo de educación"; }
            if($row[0] == 1){ $row[0]="Preparatoria"; }
            if($row[0] == 2){ $row[0]="Bachillerato"; }
            if($row[0] == 3){ $row[0]="TSU"; }
            if($row[0] == 4){ $row[0]="Licenciatura"; }
            if($row[0] == 5){ $row[0]="Ingeniería"; }
            if($row[0] == 6){ $row[0]="Diplomado"; }
            if($row[0] == 7){ $row[0]="Maestria"; }
            if($row[0] == 8){ $row[0]="Curso"; }
            if($row[0] == 9){ $row[0]="Certificación"; }

		if($row[5] == 0){ $row[5]="Sin estatus"; }
        if($row[5] == 1){ $row[5]="Titulado"; }
		if($row[5] == 2){ $row[5]="Pasante"; }
		if($row[5] == 3){ $row[5]="Certificado"; }
		if($row[5] == 4){ $row[5]="Trunca"; }
		if($row[5] == 5){ $row[5]="Cursando"; }

       	 echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
	       $row[1] .'</td><td align="left" >'.
	       $row[2] .'</td><td align="left" >'.
		   $row[3] .'</td><td align="left" >'.
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
<div>
    <br>
    <button type="submit"  onclick="window.close();">Salir</button>
</div>
</body>
</html>