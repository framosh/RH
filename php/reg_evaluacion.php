<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    camposx22[0] = conocimiento_clv;
    camposx22[1] = evaluacion_clv;
    camposx22[2] = nombre;
    camposx22[3] = nivel;
    camposx22[4] = pmin;
    camposx22[5] = descripcion;
*/

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Evaluaciones (nombre_eval,clv_conocim,puntaje_req,nivel_cono,observaciones) 
VALUES (?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssss",$campos[2],$campos[0],$campos[4],$campos[3],$campos[5]);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$evaluacion = mysqli_stmt_insert_id($stmt);
        echo("Nueva evaluación: ".$evaluacion);
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