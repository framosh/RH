<?php
//  Registro de la educación recivida por el candidato
$edux=$_GET["borra_edu_cand"];
$edux = explode('|',$edux);

require 'arhsi_connect.php';

$query2="DELETE FROM Edu_xcand WHERE (cand_key='$edux[0]' AND secuencial='$edux[1]')";
$result2 = mysqli_query($dbc,$query2);
if($result2)
	{ echo "Educacion borrada";	} 
    else { echo "Fallo borrado de registro de educacion";}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
?>