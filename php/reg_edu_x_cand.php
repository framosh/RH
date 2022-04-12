<?php
$edux=$_GET["datos_edu_cand"];
$edux = explode(',',$edux);

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Edu_xcand (cand_key,clv_tip_edu,clv_institucion,carrera,campus,edu_generacion,edu_estatus) VALUES (?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssss",$edux[0],$edux[1],$edux[2],$edux[3],$edux[4],$edux[5],$edux[6]);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
        $registro = mysqli_stmt_insert_id($stmt);
		echo "Educacion grabada: ";
		} 
    else { echo "Fallo registro de educacion";}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB";}
?>