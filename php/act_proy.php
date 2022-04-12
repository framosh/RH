<?php
$empresa=$_GET["empresa"];
$proyecto=$_GET["proyecto"];
$servicio=$_GET["servicio"];
$contacto=$_GET["contacto"];
$telefono=$_GET["telefono"];
$celular=$_GET["celular"];
$correo=$_GET["correo"];
$estatus=$_GET["estatus"];
$descripcion=$_GET["descripcion"];

/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */
/*
echo "<br>Empresa: $empresa";
echo "<br>Proyecto: $proyecto";
echo "<br>Servicio: $servicio";
echo "<br>Contacto: $contacto";
echo "<br>Telefono: $telefono";
echo "<br>Celular: $celular";
echo "<br>Correo: $correo";
echo "<br>Estatus: $estatus";
echo "<br>Descripcion: $descripcion<br>";
*/

require 'arhsi_connect.php';


/* GENERA EL QUERY PARA ACTUALIZACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */
if(mysqli_stmt_prepare($stmt,"UPDATE Proyecto SET Estatus='$estatus', servicio='$servicio', contacto='$contacto', telefono='$telefono', 
celular='$celular', descripcion='$descripcion', estatus='$estatus' WHERE proy_clave='$proyecto'"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	          {  echo "<b>Datos actualizados </b>";  }
           else { echo "<b>Fallo la grabacion de datos</b>";}   
        }
   else { echo "<b>Fallo la actualizacion de datos</b>";}
mysqli_stmt_close($stmt);

mysqli_close($dbc);
?>