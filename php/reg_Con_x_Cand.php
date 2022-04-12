<?php
$conocimiento=$_GET["Conocimiento"];
$candidato=$_GET["Candidato"];
$nivel=$_GET["Nivel"];
$anio=$_GET["Anio"];
$mes=$_GET["Mes"];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Con_candidato (clv_conocim, cand_key, con_nivel, con_anios, con_meses) VALUES (?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssss",$conocimiento,$candidato,$nivel,$anio,$mes);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Conocimiento por candidato grabado";
		} else { 
				echo "Fallo registro de datos";
				}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "<br>Fallo acceso a la DB";}
?>