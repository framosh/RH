<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Candidatos Registrados por Vacante</title>
<meta charset="UTF-8">	
<h1>Relación de Candidatos Registrados por Vacante</h1>
</head>
<body>

<?php
$vacante=$_GET["Vacante"];
$vac_nom=$_GET["Vac_nom"];
$empresa=$_GET["Empresa"];
$emp_nom=$_GET["Emp_nom"];

$estatus_cand = ["","Aceptado","Viable","Entrevistar","Aplicar examen","No aplica","Fuera de presupuesto","Edad fuera de rango"];
$estatus_cv = ["","Solicitar","Recivido","Enviar al cliente","No aplica"];
$estatus_entrevista = ["","Programar entrevista","Entrevista cancelada","Candidato no asistio","Realizada"];
$estatus_evaluacion = ["","Programar evaluación","Evaluación cancelada","Evaluación aprobada","Evaluación reporbada"];

$cons1="";
if($vacante != "0"){
    $cons1 = "(Cand_x_vac.clv_vacante=".$vacante.")";
    }

    $cons2="";

    if($empresa != "0"){
        $cons2 = "(Vacantes.emp_clave=".$empresa.")";
        }

$y ="";

        if($cons1 != "" && $cons2 != ""){
            $y = " AND ";
        }

        $consulta = $cons1.$y.$cons2;
    
//$consulta ="(Cand_x_vac.clv_vacante='$vacante') AND (Vacantes.emp_clave='$empresa')";

require 'arhsi_connect.php';

  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand FROM Cand_x_vac
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  LEFT JOIN Vacantes ON Vacantes.clv_vacante = Cand_x_vac.clv_vacante
  LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
  WHERE $consulta ORDER BY Candidatos.cand_nom DESC";  

$response=mysqli_query($dbc,$query);
if($response)
	{
		$bgc2="darkgrey";
	$f=Date("d-m-Y");
	echo "<div><fieldset>Reporte de fecha:  $f";
	echo "<br>Empresa:  ". $emp_nom;
	echo "<br>Vacante:  ". $vacante."-".$vac_nom."</div>";
//    echo "<br>Consulta: ".$consulta."</fieldset>"."</div>";

    echo '<table style="width:100%;">
	<tr align="center" font="./arial" style="background-color:'.$bgc2.';"><td>
	<b>Clv.</b> </td>
	<td><b>Nombre Candidato</b></td>
	<td><b>Tel. casa</b></td>
	<td><b>Tel. celular</b></td>
	<td><b>Correo</b></td>
	<td><b>Puesto</b></td>
	<td width="7%"><b>Estatus</b> </td></tr>';

//  $query="SELECT Cand_x_vac.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, 
//Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand FROM Cand_x_vac  

	while($row = mysqli_fetch_array($response))
		{
		$row[6] = $estatus_cand[$row[6]];

       	 echo '<tr><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left" >'.
	       $row[1] .'</td><td align="left" >'.
	       $row[2] .'</td><td align="left" >'.
		   $row[3] .'</td><td align="left" >'.
		   $row[4] .'</td><td align="left" >'.
		   $row[5] .'</td><td align="center" >'.
		   $row[6] .'</td></tr>';
        }
    echo '</table>';
  }
else {
	echo 'Reporte vacio, no se puede emitir la consulta: '.$consulta.'<br>';
	mysqli_error($dbc);
	}

mysqli_close($dbc);
?>
</body>
</html>