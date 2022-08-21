<?php
$edux1=$_GET["Experiencia"];
$edux1 = str_replace(',','',$edux1);
$edux = explode('|',$edux1);

$candidato = $edux[9];

require 'arhsi_connect.php';

$query="SELECT * FROM Experiencia WHERE (cand_key LIKE '$candidato')";
$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

$exp2=0;
if($numero_filas ==0){ 
    $numero_filas=1;
    $exp2 = $numero_filas;
} else { 
        $numero_filas = $numero_filas+1;
        $exp2 = $numero_filas;
    }

if(mysqli_stmt_prepare($stmt,"INSERT INTO Experiencia (exp_clv,cand_key,empresa,puesto,periodo,sueldo,jefe,actividades,motivo_sep,herramientas) VALUES (?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssssss",$exp2,$edux[9],$edux[1],$edux[2],$edux[3],$edux[4],$edux[5],$edux[6],$edux[7],$edux[8]);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
//        $registro = mysqli_stmt_insert_id($stmt);
		echo "Experiencia grabada: ".$exp2;
		} 
    else { echo "Fallo registro de experiencia:".$exp2;}
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);
    }
else { echo "Fallo acceso a la DB:0";}
?>