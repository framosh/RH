<?php
$Uclave=$_GET["user_number"];
$nombre=$_GET["nombre"];
$correo=$_GET["correo"];
$nivel=$_GET["nivel"];
$puesto=$_GET["puesto"];
$clvacceso=$_GET["clvacceso"];
$estatus=$_GET["estatus"];
$f=Date("Y-m-d");

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Acceso (usuarioclv,nombre,correo,nivel,estatus,clave,puesto,fechalta) VALUES (?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssss",$Uclave,$nombre,$correo,$nivel,$estatus,$clvacceso,$puesto,$f);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "<b>Usuario grabado.</b>";
		} 
           else { echo "<b>Fallo la grabacion</b>";}
          }
     else { echo "<b>Fallo la actualizacion</b>";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>