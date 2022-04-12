<?php
$clave=$_GET["clave"];
$nombre=$_GET["nombre"];
$estatus=$_GET["estatus"];
$area=$_GET["area"];

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE puesto SET puesto_nom='$nombre', puesto_est='$estatus', area_clv='$area' WHERE puesto_clv='$clave'"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Puesto actualizado";  }
    else { echo "Fallo actualizacion de datos";}
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>