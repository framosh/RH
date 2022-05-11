<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Conocimientos Tecnicos por Candidato</title>
<meta charset="UTF-8">	
<h1>Conocimientos por Candidato</h1>
</head>
<body>

<?php
$candidato = $_GET['Candidato'];
$cand_nom = $_GET['Nombre'];
$emp_nom = $_GET['Empresa'];
$vacante = $_GET['Vacante'];
$vac_nom = $_GET['Vac_nom'];

$nivel1=["","Bajo","Medio","Alto"];

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

$consulta ="Candidatos.cand_key='$candidato'";	

require 'arhsi_connect.php';

  $query="SELECT conocimientos.cono_desc, Con_candidato.con_nivel, Con_candidato.con_anios,
  Con_candidato.con_meses 
  FROM Candidatos
  LEFT JOIN Con_candidato ON Con_candidato.cand_key = Candidatos.cand_key
  LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_candidato.clv_conocim
  WHERE $consulta ORDER BY conocimientos.cono_desc ASC, Con_candidato.con_nivel ASC";  

$response=mysqli_query($dbc,$query);
if($response)
	{
    $bgc2="darkgrey";
	$f=Date("d-m-Y");
	echo "<div><fieldset>Reporte de fecha:  $f";
	echo "<br>Empresa:  ". $emp_nom;
	echo "<br>Vacante:  ". $vacante."-".$vac_nom;
    echo "<br>Candidato:  ". $candidato."-".$cand_nom."</fieldset></div>";
	echo '<table style="width:100%;">
	<tr align="center" font="./arial" style="background-color:'.$bgc2.';"><td>
	<b>Conocimiento</b> </td>
	<td><b>Nivel</b></td>
	<td width="7%"><b>Años de experiencia</b></td>
	<td width="7%"><b>Meses de experiencia</b></td></tr>';

//  $query="SELECT conocimientos.cono_desc, Con_candidato.con_nivel, Con_candidato.con_anios,
//  Con_candidato.con_meses 

$clave = "";
$colorx1 ="black";
$bgc="white";
while($row = mysqli_fetch_array($response))
		{
        $row[1] = $nivel1[$row[1]];
        if($row[1]=="Alto"){
            $bgc = "chartreuse";
        }
        if($row[1]=="Medio"){
            $bgc = "aqua";
        }
        if($row[1]=="Bajo"){
            $bgc = "DarkOrange";
        }

       	 echo '<tr style="color:'.$colorx1.';">
            <td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" style="background-color:'.$bgc.';">'.
	       $row[1] .'</td><td align="center" >'.
	       $row[2] .'</td><td align="center" >'.
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