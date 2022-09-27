<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 

$elementos = count($campos);

for($i1=0;$i1<$elementos;$i1++){
    $campos[$i1] = str_replace('"','\"',$campos[$i1]);
}


/*
    camposx22[0] = clv_evaluacion;
    camposx22[1] = clv_preguntaXC;
    camposx22[2] = clv_preguntaOM;
    camposx22[3] = posicion;
    */

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Preg_xeval SET clv_preg_pc='$campos[1]', clv_preg_om='$campos[2]' 
WHERE (clv_evaluacion='$campos[0]' AND posicion='$campos[3]')"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { 
            $mensaje = "Datos actualizados, evaluacion: ".$campos[0]."  posicion:".$campos[3];
            echo $mensaje;
        }
    else { 
        $mensaje = "Fallo la actualizacion de datos, pregunta: ".$campos[0];
        echo $mensaje;
    }
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>