<?php
$campos1 = $_GET['campos']; 
$campos = array();
$campos = explode('|',$campos1); 

$clave=$campos[0];
$contacto=$campos[1];
$correo=$campos[2];
$tel1=$campos[3];
$tel2=$campos[4];
$direccion=$campos[5];
$colonia=$campos[6];
$delegacion=$campos[7];
$estado=$campos[8];
$estatus=$campos[9];
$observaciones=$campos[10];

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Empresa SET 
emp_contacto='$contacto', 
emp_correo='$correo',
emp_tel1='$tel1', 
emp_tel2='$tel2', 
emp_dir='$direccion', 
emp_col='$colonia', 
emp_del='$delegacion', 
estadoclv='$estado',
Estatus='$estatus', 
emp_obs='$observaciones' 
WHERE emp_clave='$clave'"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows >=1)
	          {  echo "Datos actualizados";  }
           else { echo "Fallo la grabacion de datos, Empresa: ".$clave;}
        }
   else { echo "Fallo acceso a la DB";}

mysqli_stmt_close($stmt);
mysqli_close($dbc);
?>