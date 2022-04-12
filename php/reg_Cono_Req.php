<?php
//    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Vacante=" + vacante_clv + "&Nivel=" + 
//nivel_clv + "&Anio=" + anios + "&Mes=" + meses;
$conocimiento=$_GET["Clave"];
$vacante=$_GET["Vacante"];
$nivel=$_GET["Nivel"];
$anio=$_GET["Anio"];
$mes=$_GET["Mes"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Con_req (clv_vacante, clv_conocim, nivel_conocim, exp_anio_min, exp_mes_min) VALUES (?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssss",$vacante,$conocimiento,$nivel,$anio,$mes);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Conocimiento por vacante grabado";
		} else { 
				echo "Fallo registro de datos";
				}
    mysqli_stmt_close($stmt);
    }
else { echo "<br>Fallo acceso a la DB";}
mysqli_close($dbc);
?>