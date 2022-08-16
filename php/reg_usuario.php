<?php
$Uclave=$_GET["user_number"];
$nombre=$_GET["nombre"];
$correo=$_GET["correo"];
$nivel=$_GET["nivel"];
$puesto=$_GET["puesto"];
$clvacceso=$_GET["clvacceso"];
$estatus=$_GET["estatus"];
$cliente=$_GET["cliente"];
$f=Date("Y-m-d");

//    var archivo2 = archivo1 + "?nombre=" + nombre + "&user_number=" + Uclave + "&estatus=" + estatus
// + "&correo=" + correo + "&nivel=" + nivel + "&clvacceso=" + clvacceso + "&puesto=" + clv_puesto + 
//"&cliente=" + clave_empresax;

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Acceso (usuarioclv,nombre,correo,nivel,estatus,clave,puesto,fechaalta,emp_clave) VALUES (?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssssss",$Uclave,$nombre,$correo,$nivel,$estatus,$clvacceso,$puesto,$f,$cliente);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo ("Usuario grabado");
		} 
           else { echo ("Fallo la grabacion");}
          }
     else { echo ("Fallo en apertura de DB");}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>