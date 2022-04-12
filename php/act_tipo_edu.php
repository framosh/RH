<?php
$clave=$_GET["Clave"];
$nombre=$_GET["Nombre"];

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Tipo_educa SET edu_desc='$nombre' WHERE clv_tip_edu='$clave'"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Datos actualizados";  }
    else { echo "Fallo la actualizacion de datos";}
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>