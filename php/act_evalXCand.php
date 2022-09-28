<?php
$datox=$_GET["Campos"];
$dato = explode('|',$datox);
$campos = count($dato);

for($i1=0;$i1<$campos;$i1++){
    $dato[$i1] = str_replace(',','',$dato[$i1]);
}

/*
    camposx22[0] = candidato_clv;
    camposx22[1] = evaluacion_clv;
    camposx22[2] = estatus;
    camposx22[3] = observacion;
*/
$candidato = $dato[0];
$evaluacion = $dato[1];
$estatus = $dato[2];
$observaciones = $dato[3];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Eval_xcand SET eval_obs='$observaciones', estatus_eval='$estatus'  
WHERE ((cand_key='$candidato') AND (clv_tipo_eval='$evaluacion'))"))
    {
	mysqli_stmt_execute($stmt);		
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows ==1)
		{
		echo ("Asignacion actualizada de evaluacion: ".$evaluacion);
		} 
    else { echo ("Fallo actualizacion de la asignación de evaluacion:".$evaluacion);}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo ("Fallo acceso a la DB evaluacion:".$evaluacion." puesto:".$puesto);}
?>