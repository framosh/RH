<?php
//    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Vacante=" + vacante_clv + "&Nivel=" + 
//nivel_clv + "&Anio=" + anios + "&Mes=" + meses;

$conocimiento=$_GET["Clave"];
$vacante=$_GET["Vacante"];
$nivel=$_GET["Nivel"];
$anio=$_GET["Anio"];
$mes=$_GET["Mes"];

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Con_req SET clv_conocim='$conocimiento', nivel_conocim='$nivel', exp_anio_min='$anio', exp_mes_min='$mes' WHERE (clv_vacante='$vacante' AND clv_conocim='$conocimiento')"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Conocimientos por vacante actualizados";  }
    else { echo "Fallo la actualizacion de datos";}
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>