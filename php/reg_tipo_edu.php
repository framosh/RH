<?php
$nombre=$_GET["Nombre"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Tipo_educa (edu_desc) VALUES (?)"))
	{
	mysqli_stmt_bind_param($stmt,"s",$nombre);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
        $registro = mysqli_stmt_insert_id($stmt);
		echo "tipo educativo grabado: ".$registro;
		} 
    else { echo "Fallo registro de Tipo educativo:0";}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB:0";}
?>