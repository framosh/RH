<?php
$exper=$_GET["Experiencia"];
$exper = explode('|',$exper);

for($i1=0;$i1<10;$i1++){
    $exper[$i1] = str_replace(',','',$exper[$i1]);
}

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Experiencia SET empresa='$exper[1]',puesto='$exper[2]',periodo='$exper[3]',sueldo='$exper[4]',jefe='$exper[5]', actividades='$exper[6]',motivo_sep='$exper[7]',herramientas='$exper[8]' 
WHERE (cand_key='$exper[9]' AND exp_clv='$exper[0]'"))
    {
	mysqli_stmt_execute($stmt);		
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows ==1)
		{
//        $registro = mysqli_stmt_insert_id($stmt);
		echo "Experiencia actualizada: ".$exper[0];
		} 
    else { echo "Fallo actualizacion de experiencia:".$exper[0];}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB:0";}
?>