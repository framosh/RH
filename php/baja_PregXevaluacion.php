<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 
$condicion ="";

if($campos[1] >0){
    $condicion = "(clv_tipo_eval = '$campos[0]' AND clv_preg_pc = '$campos[1]')";
}

if($campos[2] >0){
    $condicion = "(clv_tipo_eval = '$campos[0]' AND clv_preg_om = '$campos[2]')";
}

/*
    camposx22[0] = clv_tipo_eval;
    camposx22[1] = clv_preguntaXC;
    camposx22[2] = clv_preguntaOM;
    */

require 'arhsi_connect.php';

$query="SELECT * FROM Preg_xeval WHERE $condicion";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    $query2="DELETE FROM Preg_xeval WHERE $condicion";
    $result2 = mysqli_query($dbc,$query2);
    if($result2){
        echo("Pregunta borrada: ".$condicion);
        } else {
            echo("No se logro borrar la Pregunta: ".$condicion);
            }
    } else {
            echo("No existe el registro a borrar: ".$condicion);
            }

	mysqli_close($dbc);
	return;
?>