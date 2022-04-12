<?php
$nombre=$_GET["Descripcion"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO conocimientos (cono_desc) VALUES (?)"))
	{
	mysqli_stmt_bind_param($stmt,"s",$nombre);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Conocimiento grabado";
		} 
    else { echo "Fallo registro de datos";}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB";}
?>