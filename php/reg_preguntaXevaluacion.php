<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    camposx22[0] = clv_tipo_eval;
    camposx22[1] = clv_preguntaXC;
    camposx22[2] = clv_preguntaOM;
    camposx22[3] = posicion;
    */

require 'arhsi_connect.php';

$query="SELECT * FROM Preg_xeval WHERE (clv_tipo_eval = '$campos[0]' AND posicion = '$campos[3]')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    echo("Ya existe la posición ".$campos[3]." escoja otra posición");
	mysqli_close($dbc);
	return;
}

if(mysqli_stmt_prepare($stmt,"INSERT INTO Preg_xeval (clv_tipo_eval,clv_preg_pc,clv_preg_om,posicion) 
VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$campos[0],$campos[1],$campos[2],$campos[3]);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$pregunta = mysqli_stmt_insert_id($stmt);
        $mensaje = "Pregunta asignada a evaluacion: ".$campos[0]."  posicion:".$campos[3];
        echo $mensaje;

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