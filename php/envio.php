<html>
<head>
<title>Envio de datos</title>
</head>
<body style="background-color:#FF5500;">
<h1 style="color:#FF0F00; font-family:verdana; font-size:110%; text-align:center;"></h1>
<br><br>
<a href="index.htm">
<img src="oficina3.jpg" alt="Gracias por su interes" style="float:center;width:100%;height:540px;border:0">
</a>

<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$Nombre=$_POST["Nombre"];
$Empresa=$_POST["Empresa"];
$correo=$_POST["correo"];
$Telefono=$_POST["Telefono"];
$Producto=$_POST["Producto"];
$Comentarios=$_POST["Comentarios"];
$fecha=date("Y-m-d");

/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */
/*
echo "Contacto: $Nombre";
echo "<br>Empresa: $Empresa";
echo "<br>Correo: $correo";
echo "<br>Telefono: $Telefono";
echo "<br>Producto: $Producto";
echo "<br>Comentarios: $Comentarios";
echo "<br>Fecha: $fecha<br>";
*/

/* DEFINE LA BASE DE DATOS Y LA ABRE */

DEFINE('DB_USER','arhsi_arhsi01');
DEFINE('DB_PASSWORD','arhsi6502');
DEFINE('DB_HOST','localhost:3306');
DEFINE('DB_NAME','arhsi01_reg');

$dbc = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

if (mysqli_connect_errno()) 
	{ echo "Failed to connect to DB: ".mysqli_connect_error(); }
else { /* echo "DB conected"; */
	$stmt=mysqli_stmt_init($dbc); }

/* GENERA EL QUERY PARA GRABACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */

if(mysqli_stmt_prepare($stmt,"INSERT INTO Prospectos (Fecha,Nombre,Empresa,correo,Telefono,Producto,Comentarios) VALUES (?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssss",$fecha,$Nombre,$Empresa,$correo,$Telefono,$Producto,$Comentarios);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
//		echo "Datos grabados, envío de correo a ventas <br>";
//		echo "<b><br><br>Gracias por contactarnos, pronto un ejecutivo se comunicara con usted.</b>";
		$to = "ventas@arhsi.com.mx";
		$subjet = "Atender requerimiento de prospecto";
		$message = nl2br("Prospecto: $Nombre\n  Empresa: $Empresa\n   Correo: $correo\n Telefono: $Telefono\n Producto: $Producto\n $Comentarios\n",false);
		$from = "federico.ramos@arhsi.com.mx";
		$headers = "From:".$from;
		mail($to,$subjet,$message,$headers);
		} 
	else {
		echo("<br>Error de grabacion: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "<br>Fallo la grabación de datos"; 
	}

/* CIERRA LA BASE DE DATOS */

mysqli_close($dbc);
?>

<!-- <form action="index.htm"> -->
<!-- <input type="submit" value="Salir"> -->
<!-- </form> -->

</body>
</html>