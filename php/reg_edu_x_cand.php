<?php
//  Registro de la educación recivida por el candidato
$edux=$_GET["datos_edu_cand"];
$edux = explode(',',$edux);
$secuencial=0;

require 'arhsi_connect.php';
$query="SELECT * FROM Edu_xcand WHERE (cand_key='$edux[0]')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
	$secuencial=$numero_filas+1;
} else { $secuencial=1;}

if(mysqli_stmt_prepare($stmt,"INSERT INTO Edu_xcand (cand_key,clv_tip_edu,clv_institucion,carrera,campus,edu_generacion,edu_estatus,secuencial) VALUES (?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssss",$edux[0],$edux[1],$edux[2],$edux[3],$edux[4],$edux[5],$edux[6],$secuencial);
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