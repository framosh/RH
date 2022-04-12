<?php
$candidato=$_GET["Candidato"];
$vacante=$_GET["Vacante"];
$estatus="1";

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Cand_x_vac (clv_vacante, cand_key, estatus) VALUES (?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sss",$vacante,$candidato,$estatus);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Candidato por vacante grabado";
		} else { 
				echo "Fallo registro de datos";
				}
    mysqli_stmt_close($stmt);
    }
else { echo "<br>Fallo acceso a la DB";}
mysqli_close($dbc);
?>