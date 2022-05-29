<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    camposx22[0] = pregunta_clv;
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = respuesta3;
    camposx22[6] = respuesta4;
    camposx22[7] = respuesta5;
    camposx22[8] = Conocimiento;
    camposx22[9] = solucion;
    */

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Preg_om (nombre_pregom,desc_preg,clv_conocim,resp1,resp2,resp3,resp4,resp5,sol_preg) 
VALUES (?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssssss",$campos[1],$campos[2],$campos[8],$campos[3],$campos[4],$campos[5],$campos[6],$campos[7],$campos[8]);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$pregunta = mysqli_stmt_insert_id($stmt);
        echo("Nueva pregunta: ".$pregunta);
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