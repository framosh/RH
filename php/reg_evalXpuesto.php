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

$query="SELECT * FROM eval_XPuesto WHERE ((clv_puesto LIKE '$puesto') AND (clv_tipo_eval LIKE '$evaluacion'))";
$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas>0){
    echo("Ya existe esta asignación"); 
    mysqli_close($dbc);
    return;
} 

if(mysqli_stmt_prepare($stmt,"INSERT INTO eval_XPuesto (clv_puesto,clv_tipo_eval,observaciones) VALUES (?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sss",$puesto,$evaluacion,$observaciones);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
//        $registro = mysqli_stmt_insert_id($stmt);
		echo "Asignación grabada puesto:".$puesto." evaluacion:".$evaluacion;
		} 
    else { echo "fallo registro de la asignación del puesto:".$puesto." evaluacion:".$evaluacion;}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB:0";}
?>