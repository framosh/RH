<?php
$clave=$_GET["clave"];
$nombre=$_GET["nombre"];
$nivel=$_GET["nivel"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Puestos SET puesto_desc='$nombre', puesto_niv='$nivel' WHERE clv_puesto='$clave'"))
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