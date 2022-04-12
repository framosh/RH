<?php
//    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Candidato=" + candidato_clv + "&Nivel=" + 
//nivel_clv + "&Anio=" + anios + "&Mes=" + meses;

$conocimiento=$_GET["Clave"];
$candidato=$_GET["Candidato"];
$nivel=$_GET["Nivel"];
$anio=$_GET["Anio"];
$mes=$_GET["Mes"];

require 'arhsi_connect.php';
if(mysqli_stmt_prepare($stmt,"UPDATE Con_candidato SET clv_conocim='$conocimiento', nivel_conocim='$nivel', con_anios='$anio', con_meses='$mes' WHERE (cand_key='$candidato' AND clv_conocim='$conocimiento')"))
	{
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows ==1)
	    { echo "Conocimiento por candidato actualizado";  }
    else { echo "Fallo la actualizacion de datos";}
    mysqli_stmt_close($stmt);
    }
    else { echo "Fallo apertura de DB";}
mysqli_close($dbc);
?>