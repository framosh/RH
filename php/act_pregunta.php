<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 
$elementos = count($campos);

for($i1=0;$i1<$elementos;$i1++){
    $campos[$i1] = str_replace('"','\"',$campos[$i1]);
}

/*
    camposx22[0] = pregunta_clv;
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = respuesta3;
    camposx22[6] = respuesta4;
    camposx22[7] = respuesta5;
    camposx22[8] = conocimiento;
    camposx22[9] = solucion1;
    camposx22[10] = solucion2;
    camposx22[11] = imagen;
*/

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Preg_om SET nombre_pregom='$campos[1]', desc_preg='$campos[2]',
resp1='$campos[3]',resp2='$campos[4]',resp3='$campos[5]',resp4='$campos[6]',resp5='$campos[7]',
clv_conocim='$campos[8]',sol_preg1='$campos[9]',sol_preg2='$campos[10]',img_dir='$campos[11]' 
WHERE clv_preg_om='$campos[0]'"))
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