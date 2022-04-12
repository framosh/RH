<?php
$nombre=$_GET["nombre"];
$estatus=$_GET["estatus"];
$area=$_GET["area"];

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"INSERT INTO puesto (puesto_nom,puesto_est,area_clv) VALUES (?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sss",$nombre,$estatus,$area);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Puesto grabado";
		} 
    else { echo "Fallo la grabacion";}
    }
else { echo "Fallo acceso a la DB";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>