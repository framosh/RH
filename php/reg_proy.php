<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$empresa=$_GET["empresa"];
$servicio=$_GET["servicio"];
$contacto=$_GET["contacto"];
$telefono=$_GET["telefono"];
$celular=$_GET["celular"];
$estatus=$_GET["estatus"];
$correo=$_GET["correo"];
$descripcion=$_GET["descripcion"];
$fecha=date("Y-m-d");


/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */
/*
echo "<br>Empresa: $empresa";
echo "<br>Servicio: $servicio";
echo "<br>Contacto: $contacto";
echo "<br>Telefono: $telefono";
echo "<br>Celular: $celular";
echo "<br>estatus: $Estatus";
echo "<br>Correo: $correo";
echo "<br>Descripcion: $descripcion<br>";
*/

require 'arhsi_connect.php';

/* BUSCA LA CLAVE DEL CLIENTE */
/*
$query="SELECT emp_clave FROM Empresa WHERE nombre ='$empresa'";
$edo = mysqli_query($dbc,$query);
$row = mysqli_fetch_row($edo);
*/

/* GENERA EL QUERY PARA GRABACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */

if(mysqli_stmt_prepare($stmt,"INSERT INTO Proyecto (emp_clave,servicio,fecha,contacto,telefono,celular,correo,descripcion,estatus) VALUES (?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssssss",$empresa,$servicio,$fecha,$contacto,$telefono,$celular,$correo,$descripcion,$estatus);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Registro dado de alta";
		} 
	else {
		echo("<br>Error en alta de registro: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "<br>Fallo la grabación de datos"; 
	}

mysqli_close($dbc);
?>