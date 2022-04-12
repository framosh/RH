<?php
$nombre=$_GET["nombre"];
$estatus=$_GET["estatus"];
$descripcion=$_GET["descripcion"];
$direccion=$_GET["direccion"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO aplicacion (apli_nom,apli_est,apli_desc,apli_dir) VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$nombre,$estatus,$descripcion,$direccion);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Aplicacion grabada";
		} 
    else { echo "Fallo la grabacion de datos";}
    }
else { echo "Fallo acceso a la DB";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>