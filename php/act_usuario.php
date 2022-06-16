<?php
//    var archivo2 = archivo1 + "?Uclave=" + Uclave + "&nombre=" + nombre + "&estatus=" + estatus + 
//"&correo=" + correo + "&nivel=" + nivel + "&clvacceso=" + clvacceso + "&puesto=" + clv_puesto;

$uclave=$_GET["Uclave"];
$nombre=$_GET["nombre"];
$correo=$_GET["correo"];
$nivel=$_GET["nivel"];
$puesto=$_GET["puesto"];
$clvacceso=$_GET["clvacceso"];
$estatus=$_GET["estatus"];
$cliente=$_GET["cliente"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Acceso SET nombre='$nombre', correo='$correo', nivel='$nivel', 
puesto='$puesto',clave='$clvacceso', estatus='$estatus' WHERE (usuarioclv='$uclave' AND emp_clave='$cliente')"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	          {  echo "<b>Usuario actualizado</b>";  }
           else { echo "<b>Fallo actualizacion</b>";}   
        }
   else { echo "<b>Fallo apertura de DB</b>";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>