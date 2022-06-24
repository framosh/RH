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

$query="SELECT * FROM Eval_xcand WHERE ((cand_key LIKE '$candidato') AND (clv_evaluacion LIKE '$evaluacion'))";
$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas>0){
    echo("Ya existe esta asignación"); 
    mysqli_close($dbc);
    return;
} 

if(mysqli_stmt_prepare($stmt,"INSERT INTO Eval_xcand (cand_key,clv_evaluacion,estatus_eval,eval_obs) VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$candidato,$evaluacion,$estatus,$observaciones);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
//        $registro = mysqli_stmt_insert_id($stmt);
		echo "Asignación grabada candidato:".$candidato." evaluacion:".$evaluacion;
		} 
    else { echo "fallo registro de la asignación del candidato:".$candidato." evaluacion:".$evaluacion;}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB candidato:".$candidato." evaluacion:".$evaluacion;}
?>