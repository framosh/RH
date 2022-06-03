<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    camposx22[0] = pregunta_clv;
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = conocimiento;
    camposx22[6] = imagen;
*/

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Preg_xcom SET nombre_pregpc='$campos[1]', des_preg_xcom='$campos[2]',
resp1='$campos[3]',resp2='$campos[4]',clv_conocim='$campos[5]',img_dir='$campos[6]' 
WHERE clv_preg_pc='$campos[0]'"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Datos actualizados";  }
    else { 
        $mensaje = "Fallo la actualizacion de datos, pregunta: ".$campos[0];
        echo $mensaje;
    }
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>