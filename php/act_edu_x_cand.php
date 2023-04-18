<?php
$edux=$_GET["datos_edu_cand"]; //datos_edu_cand
$edux = explode('|',$edux);

/*
    datos_edu_cand[0] = cand_clv;
    datos_edu_cand[1] = tipo_edu_clv;
    datos_edu_cand[2] = clv_inst;
    datos_edu_cand[3] = carrera;
    datos_edu_cand[4] = campus;
    datos_edu_cand[5] = generacion;
    datos_edu_cand[6] = estatus_edu;
    datos_edu_cand[7] = secuencial;
*/

require 'arhsi_connect.php';
//if(mysqli_stmt_prepare($stmt,"UPDATE Edu_xcand SET campus='$edux[4]',edu_generacion='$edux[5]',edu_estatus='$edux[6]', clv_institucion='$edux[2]', secuencial='$edux[7]'
//WHERE (cand_key='$edux[0]' AND clv_tip_edu='$edux[1]')"))

if(mysqli_stmt_prepare($stmt,"UPDATE Edu_xcand SET campus='$edux[4]',
clv_tip_edu = '$edux[1]',
carrera = '$edux[3]',
edu_generacion='$edux[5]',
edu_estatus='$edux[6]'
WHERE (cand_key='$edux[0]' AND secuencial='$edux[7]')"))
    {
	mysqli_stmt_execute($stmt);		
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows ==1)
		{
//        $registro = mysqli_stmt_insert_id($stmt);
		echo "Educacion actualizada";
		} 
    else { 
//        $mensaje = "Fallo actualizacion de educacion de Candidato:".$edux[0]."  Secuencia: ".$edux[7]." Campus: ".$edux[4]."  Generación: ".$edux[5]." Estatus: ".$edux[6];
        $mensaje = "Fallo actualizacion de educacion de Candidato: ".$edux[0];
        echo $mensaje;
    }
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB";}
?>