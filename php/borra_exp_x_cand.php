<?php
//  Borrado del registro de experiencia indicado del candidato
$candidato=$_GET["candidato"];
$experiencia=$_GET["experiencia"];

require 'arhsi_connect.php';

$query2="DELETE FROM Experiencia WHERE (cand_key='$candidato' AND exp_clv='$experiencia')";
$result2 = mysqli_query($dbc,$query2);
if($result2)
	{ echo "Experiencia borrada";	} 
    else { echo "Fallo borrado de registro de experiencia";}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
?>