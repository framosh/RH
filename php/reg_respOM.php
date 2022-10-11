<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

$elementos = count($campos);

for($i1=0;$i1<$elementos;$i1++){
    $campos[$i1] = str_replace('"','\"',$campos[$i1]);
}


/*
    camposx22[1] = evaluacion;
    camposx22[2] = candidato;
    camposx22[3] = clv_pregunta;
    camposx22[4] = resp1;
    */

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Res_pom (clv_evaluacion,cand_key,clv_preg_om,sol_resp1) 
VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$campos[1],$campos[2],$campos[5],$campos[3]);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$pregunta = mysqli_stmt_insert_id($stmt);
        echo("Respuesta grabada: ".$pregunta);
		} 
	else {
		echo("Error de grabacion: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "<br>Fallo la grabación de datos"; 
	}
mysqli_close($dbc);
?>