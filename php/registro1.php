<html>
<head>
<title>Registro de requerimiento</title>
</head>
<body style="background-color:powderblue;">
<h1 style="color:blue; font-family:verdana; font-size:150%; text-align:center;">
<b>Registro de Requerimiento</b></h1>

<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$Nombre=$_POST["Nombre"];
$Empresa=$_POST["Empresa"];
$correo=$_POST["correo"];
$Telefono=$_POST["Telefono"];
$Producto=$_POST["Producto"];
$Comentarios=$_POST["Comentarios"];
$fecha=date("Y-m-d");

/* DEFINE LA BASE DE DATOS Y LA ABRE */

DEFINE('DB_USER','arhsi_arhsi01');
DEFINE('DB_PASSWORD','arhsi6502');
DEFINE('DB_HOST','localhost:3306');
DEFINE('DB_NAME','arhsi01_reg');

$dbc = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

if (mysqli_connect_errno()) 
	{ echo "Failed to connect to MySQL: ".mysqli_connect_error(); }
else { /* echo "Conectado a la base de datos  ";*/
	$stmt=mysqli_stmt_init($dbc); }

/* GENERA EL QUERY PARA GRABACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */

if(mysqli_stmt_prepare($stmt,"INSERT INTO Prospectos (Fecha,Nombre,Empresa,correo,Telefono,Producto,Comentarios) VALUES (?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssss",$fecha,$Nombre,$Empresa,$correo,$Telefono,$Producto,$Comentarios);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		echo "Requerimiento registrado, pronto un ejecutivo se comunicará con usted, gracias <br>";
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
else { echo "<br>Fallo el registro del requerimiento, por favor intente de nuevo"; 
	}

/* CIERRA LA BASE DE DATOS */

mysqli_close($dbc);
?>
</body>
</html>