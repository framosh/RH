<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$nombre=$_POST["name"];
$genero=$_POST["genre"];
//$usuario=$_GET["usuario"];
$Fecha=date("Y-m-d");

$usuario="vacio";

/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */

//echo "Clave: $clave";
/*
echo "<br>Nombre: $nombre";
echo "<br>Genero: $genero";
echo "<br>Usuario: $usuario<br>";
echo "<br>Fecha: $Fecha";
*/


/* DEFINE LA BASE DE DATOS Y LA ABRE */
require 'arhsi_connect.php';


/* GENERA EL QUERY PARA GRABACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */
if(mysqli_stmt_prepare($stmt,"INSERT INTO Artista (nombre,genero,usuario,fecha) VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$nombre,$genero,$usuario,$Fecha);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$mensaje="Artista grabado";
		} 
           else { $mensaje="Fallo el registro del Artista";
                }

	mysqli_stmt_close($stmt);
	}
   else { echo "<br>Error en insercion de registro";}
/* CIERRA LA BASE DE DATOS */

mysqli_close($dbc);

//echo json_encode($mensaje);
echo json_quote($mensaje);
?>