<?php
$datox=$_GET["Campos"];
$dato = explode('|',$datox);
$campos = count($dato);

for($i1=0;$i1<$campos;$i1++){
    $dato[$i1] = str_replace(',','',$dato[$i1]);
}

$puesto = $dato[0];
$evaluacion = $dato[1];
$observaciones = $dato[2];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE eval_XPuesto SET observaciones='$observaciones' 
WHERE ((clv_puesto='$puesto') AND (clv_tipo_eval='$evaluacion'))"))
    {
	mysqli_stmt_execute($stmt);		
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows ==1)
		{
		echo "Asignacion actualizada evaluacion: ".$evaluacion;
		} 
    else { echo "Fallo actualizacion de la asignación evaluacion:".$evaluacion;}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB:0";}
?>