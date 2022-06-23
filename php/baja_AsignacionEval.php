<?php
$campos1 = $_GET['Campos']; 
$campos = array();
$campos = explode('|',$campos1); 
$condicion ="";

$condicion = "(clv_puesto = '$campos[0]' AND clv_evaluacion = '$campos[1]')";

require 'arhsi_connect.php';

$query="SELECT * FROM eval_XPuesto WHERE $condicion";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    $query2="DELETE FROM eval_XPuesto WHERE $condicion";
    $result2 = mysqli_query($dbc,$query2);
    if($result2){
        echo("Asignacion borrada del puesto: ".$campos[0]." evaluacion:".$campos[1]);
        } else {
            echo("No se logro borrar la Asignacion del puesto: ".$campos[0]." evaluacion:".$campos[1]);
            }
    } else {
            echo("No existe el registro a borrar del puesto: ".$campos[0]." evaluacion:".$campos[1]);
            }

	mysqli_close($dbc);
	return;
?>