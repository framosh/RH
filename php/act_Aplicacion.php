<?php
$clave=$_GET["aplicacion"];
$nombre=$_GET["nombre"];
$estatus=$_GET["estatus"];
$direccion=$_GET["direccion"];
$descripcion=$_GET["descripcion"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE aplicacion SET aplicacion.apli_nom='$nombre', aplicacion.apli_est='$estatus', aplicacion.apli_desc='$descripcion', aplicacion.apli_dir='$direccion'  WHERE aplicacion.apli_clv LIKE '$clave'"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Datos actualizados";  }
    else { echo "Fallo la grabacion de datos";}
    mysqli_stmt_close($stmt);
    }
else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>