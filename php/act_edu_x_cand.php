<?php
$edux=$_GET["datos_edu_cand"];
$edux = explode(',',$edux);

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Edu_xcand SET campus='$edux[3]',edu_generacion='$edux[4]',edu_estatus='$edux[5]'
WHERE (cand_key='$edux[0]' AND clv_tip_edu='$edux[1]' AND clv_institucion='$edux[2]')"))
    {
	mysqli_stmt_execute($stmt);		
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows ==1)
		{
//        $registro = mysqli_stmt_insert_id($stmt);
		echo "Educacion actualizada";
		} 
    else { echo "Fallo actualizacion de educacion";}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB";}
?>