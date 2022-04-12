<!DOCTYPE html>
<html lang="es">
<head>
<link rel="stylesheet" href="../css/reportStyles.css">
<title>Candidatos y conocimientos</title>
<meta charset="UTF-8">	
<h1>Candidatos y conocimientos por Vacante</h1>
</head>
<body>

<?php
$campos1 = $_GET['Camposx21']; 
$campo = array();
$campo = explode('|',$campos1); 

$vacante=$campo[0];
$vac_nom=$campo[1];
$empresa=$campo[2];
$emp_nom=$campo[3];
$est_cand=$campo[4];
$est_cv=$campo[5];
$est_entrevista=$campo[6];
$est_evaluacion=$campo[7];
$estatus_cand = ["","Aceptado","Viable","Entrevistar","Aplicar examen","No aplica","Fuera de presupuesto","Edad fuera de rango"];
$estatus_cv = ["","Solicitar","Recivido","Enviar al cliente","No aplica"];
$estatus_entrevista = ["","Programar entrevista","Entrevista cancelada","Candidato no asistio","Realizada"];
$estatus_evaluacion = ["","Programar evaluación","Evaluación cancelada","Evaluación aprobada","Evaluación reporbada"];
$nivel1=["","Alto","Medio","Bajo"];
$consulta ="(Cand_x_vac.clv_vacante='$vacante') AND (Vacantes.emp_clave='$empresa')";

if($est_cand != "0"){
$cons_est_cand = " AND (Candidatos.clv_est_cand = '$est_cand')";
$est1_cand = $estatus_cand[$est_cand];
} else { 
	$cons_est_cand = "";
	$est1_cand ="Todos";
}

if($est_cv != "0"){
$cons_est_cv = " AND (Candidatos.clv_est_cv = '$est_cv')";
$est1_cv = $estatus_cv[$est_cv];
} else { 
	$cons_est_cv = "";
$est1_cv = "Todos";
}

if($est_entrevista != "0"){
	$cons_est_entrevista = " AND (Candidatos.clv_est_ent = '$est_entrevista')";
	$est1_entrevista = $estatus_entrevista[$est_entrevista];
	} else { 
		$cons_est_entrevista = "";
		$est1_entrevista = "Todos";
	}
	
if($est_evaluacion != "0"){
		$cons_est_evaluacion = " AND (Candidatos.clv_est_eval = '$est_evaluacion')";
		$est1_evaluacion = $estatus_evaluacion[$est_evaluacion];
		} else { 
			$cons_est_evaluacion = "";
		$est1_evaluacion = "Todos";
		}
	
$consulta = $consulta.$cons_est_cand. $cons_est_cv.$cons_est_entrevista.$cons_est_evaluacion;

require 'arhsi_connect.php';

  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, 
  Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand, conocimientos.cono_desc, 
  Con_candidato.con_nivel,Con_candidato.con_anios,Con_candidato.con_meses 
  FROM Cand_x_vac
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  LEFT JOIN Vacantes ON Vacantes.clv_vacante = Cand_x_vac.clv_vacante
  LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
  LEFT JOIN Con_candidato ON Con_candidato.cand_key = Candidatos.cand_key
  LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_candidato.clv_conocim
  WHERE $consulta ORDER BY Candidatos.cand_nom ASC, Con_candidato.con_nivel ASC";  

$response=mysqli_query($dbc,$query);
if($response)
	{
    $bgc2="darkgrey";
	$f=Date("d-m-Y");
	echo "<div><fieldset>Reporte de fecha:  $f";
	echo "<br>Empresa:  ". $emp_nom;
	echo "<br>Vacante:  ". $vacante."-".$vac_nom."</fieldset>";

    echo "<fieldset>Estatus candidatos:  ". $est1_cand;
	echo "<br>Estatus cvs:  ". $est1_cv;
	echo "<br>Estatus entrevista:  ". $est1_entrevista;
	echo "<br>Estatus evaluación:  ". $est1_evaluacion."</fieldset></div>";
	echo '<table style="width:100%;">
	<tr align="center" font="./arial" style="background-color:'.$bgc2.';"><td>
	<b>Clv.</b> </td>
	<td><b>Nombre Candidato</b></td>
	<td><b>Tel. casa</b></td>
    <td><b>Tel. celular</b></td>
	<td><b>Correo</b></td>
	<td><b>Puesto</b></td>
	<td width="7%"><b>Estatus</b> </td>
    <td><b>Conocimiento</b></td>
    <td><b>Nivel</b></td>
	<td width="7%"><b>Años de experiencia</b></td>
	<td width="7%"><b>Meses de experiencia</b></td></tr>';

//    $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2, 
//    Candidatos.cand_corr, Puestos.puesto_desc, Candidatos.clv_est_cand, conocimientos.cono_desc, 
//    Con_candidato.con_nivel,Con_candidato.con_anios,Con_candidato.con_meses 
$clave = "";
$colorx1 ="black";
$bgc="white";
while($row = mysqli_fetch_array($response))
		{
		$row[6] = $estatus_cand[$row[6]];
        $row[8] = $nivel1[$row[8]];
        if($row[8]=="Alto"){
            $bgc = "chartreuse";
        }
        if($row[8]=="Medio"){
            $bgc = "aqua";
        }
        if($row[8]=="Bajo"){
            $bgc = "DarkOrange";
        }

        if($clave == $row[0]){
            for($i1=0;$i1<7;$i1++){
                $row[$i1]="";
            }
            $colorx1 ="black";
        } else {
            $colorx1 = "blue";
            $clave = $row[0];
        }

       	 echo '<tr style="color:'.$colorx1.';"><td align="center"  font="arial">'.
	       $row[0] .'</td><td align="left">'.
	       $row[1] .'</td><td align="left" >'.
	       $row[2] .'</td><td align="left" >'.
		   $row[3] .'</td><td align="left" >'.
		   $row[4] .'</td><td align="left" >'.
		   $row[5] .'</td><td align="left" >'.
           $row[6] .'</td><td align="center" >'.
           $row[7] .'</td><td align="center" style="background-color:'.$bgc.';">'.
           $row[8] .'</td><td align="center" >'.
           $row[9] .'</td><td align="center" >'.
		   $row[10] .'</td></tr>';
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