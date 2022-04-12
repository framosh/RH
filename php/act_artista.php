<?php
$clave=$_GET["clave"];
$nombre=$_GET["name"];
$genero=$_GET["genre"];
//$usuario=$_GET["usuario"];
$Fecha=date("Y-m-d");

$usuario="vacio";

/*
echo "<br>Nombre: $nombre";
echo "<br>Genero: $genero";
echo "<br>Usuario: $usuario<br>";
echo "<br>Fecha: $Fecha";
*/

/* DEFINE LA BASE DE DATOS Y LA ABRE */
require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Artista SET nombre='$nombre', genero='$genero', usuario='$usuario', fecha='$Fecha' WHERE id='$clave'"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	        { $mensaje="Datos actualizados";  }
           else { $mensaje="Fallo la grabacion de datos";}
           mysqli_stmt_close($stmt);
        }
   else { $mensaje="Fallo la actualizacion de registro";}
mysqli_close($dbc);
//echo json_encode($mensaje);
echo json_quote($mensaje);

?>