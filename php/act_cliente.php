<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$clave=$_GET["clave"];
$nombre=$_GET["nombre"];
$direccion=$_GET["direccion"];
$piso=$_GET["piso"];
$despacho=$_GET["despacho"];
$colonia=$_GET["colonia"];
$delegacion=$_GET["delegacion"];
$estado=$_GET["estado"];
$estatus=$_GET["estatus"];
$observaciones=$_GET["observaciones"];
$usuario=$_GET["usuario"];
$Fecha=date("Y-m-d");

/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */
/*
echo "Clave: $clave";
echo "<br>Cliente: $nombre";
echo "<br>Direccion: $direccion";
echo "<br>Piso: $piso";
echo "<br>Despacho: $despacho";
echo "<br>Colonia: $colonia";
echo "<br>Delegacion: $delegacion";
echo "<br>Estado: $estado";
echo "<br>Estatus: $estatus";
echo "<br>Observaciones: $observaciones";
echo "<br>Usuario: $usuario<br>";
*/

/* DEFINE LA BASE DE DATOS Y LA ABRE */
require 'itbp_connect2.php';

/* BUSCA LA CLAVE DEL ESTADO */
$query="SELECT estadoclv FROM Estado WHERE nombre ='$estado'";
$edo = mysqli_query($dbc,$query);
$row = mysqli_fetch_row($edo);

/* GENERA EL QUERY PARA ACTUALIZACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */
if(mysqli_stmt_prepare($stmt,"UPDATE Cliente SET nombre='$nombre', estatus='$estatus', calle='$direccion', colonia='$colonia', 
delegacion='$delegacion', piso='$piso', despacho='$despacho', observaciones='$observaciones', estado='$row[0]', usuario='$usuario', 
fechalta='$Fecha' WHERE clienteclv='$clave'"))
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