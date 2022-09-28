<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    camposx22[0] = conocimiento_clv;
    camposx22[1] = evaluacion_clv;
    camposx22[2] = descripcion;
    camposx22[3] = nivel;
    camposx22[4] = pmin;
    camposx22[5] = observaciones;

*/

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Evaluaciones SET puntaje_req='$campos[4]', nivel_cono='$campos[3]',
observaciones='$campos[5]' WHERE clv_tipo_eval='$campos[2]'"))
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