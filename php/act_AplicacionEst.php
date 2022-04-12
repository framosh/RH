<?php 
$puesto=$_GET["puesto"];
$aplicacion=$_GET["aplicacion"];
$permisos=$_GET["permisos"];
$estatus="1";

require 'arhsi_connect.php';

$query="SELECT aplicacion.apli_nom,  apl_puesto.apl_pue_perm FROM apl_puesto
LEFT JOIN aplicacion ON aplicacion.apli_clv = apl_puesto.apli_clv
WHERE ((apl_puesto.puesto_clv LIKE '$puesto') AND (apl_puesto.apli_clv LIKE '$aplicacion'))";

$result = mysqli_query($dbc,$query);
//echo "Resultado: ".$result->num_rows;
if($result->num_rows > 0) {
    if(mysqli_stmt_prepare($stmt,"UPDATE apl_puesto SET apl_puesto.apl_pue_perm='$permisos' WHERE apl_puesto.puesto_clv='$puesto' AND apl_puesto.apli_clv='$aplicacion'"))
	    {
    	mysqli_stmt_execute($stmt);
	    $affected_rows = mysqli_stmt_affected_rows($stmt);
        if($affected_rows ==1)
	        { echo "Permiso actualizado";  }
        else { echo "Fallo la actualizacion de datos";}
      mysqli_stmt_close($stmt);
        }
    else { echo "Fallo apertura de DB";}
} else {
    if(mysqli_stmt_prepare($stmt,"INSERT INTO apl_puesto (puesto_clv,apli_clv,apl_pue_est,apl_pue_perm) VALUES (?,?,?,?)"))
    	{
	    mysqli_stmt_bind_param($stmt,"ssss",$puesto,$aplicacion,$estatus,$permisos);
	    mysqli_stmt_execute($stmt);
		
	    $affected_rows = mysqli_stmt_affected_rows($stmt);

	    if($affected_rows ==1)
		    { echo "Permiso grabado"; } 
        else { echo "Fallo alta de datos";}
        }
    else { echo "Fallo acceso a la DB";}
    }
mysqli_close($dbc);
?>