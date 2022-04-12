<?php
$nombre=$_GET["nombre"];
$nivel=$_GET["nivel"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Puestos (puesto_desc,puesto_niv) VALUES (?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ss",$nombre,$nivel);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Puesto grabado";
		} 
    else { echo "Fallo la grabacion de datos";}
    }
else { echo "Fallo acceso a la DB";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>