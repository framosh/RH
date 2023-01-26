<?php
$campos1 = $_GET['campos']; 
$campos = array();
$campos = explode('|',$campos1); 

$Empresa=$campos[0];
$Contacto=$campos[1];
$Correo=$campos[2];
$Tel1=$campos[3];
$Tel2=$campos[4];
$Direccion=$campos[5];
$Colonia=$campos[6];
$Delegacion=$campos[7];
$Estado=$campos[8];
$Estatus=$campos[9];
$Observaciones=$campos[10];
$dir_web=$campos[11];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Empresa (emp_nom,emp_contacto,emp_correo,emp_tel1,emp_tel2,emp_dir,emp_col,emp_del,estadoclv,emp_obs,Estatus,dir_web) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssssssss",$Empresa,$Contacto,$Correo,$Tel1,$Tel2,$Direcci000on,$Colonia,$Delegacion,$Estado,$Observaciones,$Estatus,$dir_web);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Empresa grabada";
		} 
	else {
		echo("<br>Error de grabacion: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "<br>Fallo acceso a la DB"; 
	}

mysqli_close($dbc);
?>