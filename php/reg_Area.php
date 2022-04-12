<?php
$nombre=$_GET["nombre"];
$estatus=$_GET["estatus"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO area (area_nom,area_est) VALUES (?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ss",$nombre,$estatus);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Area grabada";
		} 
    else { echo "Fallo la grabacion de datos";}
    }
else { echo "Fallo acceso a la DB";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>