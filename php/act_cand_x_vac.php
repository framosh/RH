<?php
$candidato=$_GET["Candidato"];
$vacante=$_GET["Vacante"];

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Cand_x_vac SET clv_vacante='$vacante', cand_key='$candidato' WHERE (cand_key='$candidato' AND clv_vacante='$vacante')"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Candidato por Vacante actualizado";  }
    else { echo "Fallo la actualizacion de datos";}
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>