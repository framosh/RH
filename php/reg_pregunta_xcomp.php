<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = conocimiento;
    camposx22[6] = imagen;
    */

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Preg_xcom (nombre_pregpc,des_preg_xcom,clv_conocim,resp1,resp2,img_dir) 
VALUES (?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssss",$campos[1],$campos[2],$campos[5],$campos[3],$campos[4],$campos[6]);
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