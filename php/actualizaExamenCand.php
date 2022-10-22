<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 
$elementos = count($campos);

for($i1=0;$i1<$elementos;$i1++){
    $campos[$i1] = str_replace('"','\"',$campos[$i1]);
}

$evaluacion = $campos[0];  // Evaluacion
$estatus = $campos[1];   //  Estatus
$hora_ini = $campos[2];  // Hora inicio de examen
$hora_fin = $campos[3];   // Hora Fin de examen  
$fecha = $campos[4];  // Fecha de aplicacion de examen
$candidato = $campos[5];  // Clave candidato

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Eval_xcand SET estatus_eval='$estatus', eval_fech='$fecha',
eval_hora_ini='$hora_ini', eval_hora_fin='$hora_fin'  WHERE clv_evaluacion='$evaluacion' AND cand_key='$candidato'"))
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