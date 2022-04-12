<?php
$clave=$_GET["clave"];
$nombre=$_GET["nombre"];
$estatus=$_GET["estatus"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE area SET area_nom='$nombre', area_est='$estatus'  WHERE area_clv='$clave'"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Area actualizada";  }
    else { echo "Fallo actualizacion de datos";}
    mysqli_stmt_close($stmt);
    }
else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>