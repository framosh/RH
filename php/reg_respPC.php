<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

$elementos = count($campos);

for($i1=0;$i1<$elementos;$i1++){
    $campos[$i1] = str_replace('"','\"',$campos[$i1]);
}

/*
    camposx22[0] = evaluacion;
    camposx22[1] = cand_clv;
    camposx22[2] = pregunta_clv;
    camposx22[3] = solucion1;
    */

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Res_pc (clv_evaluacion,cand_key,clv_preg_pc,resp_comp) 
VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$campos[0],$campos[1],$campos[2],$campos[3]);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$pregunta = mysqli_stmt_insert_id($stmt);
        echo("Registra respuesta");
		} 
	else {
		echo("Error de grabacion: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "Fallo la grabación de datos"; 
	}
mysqli_close($dbc);
?>