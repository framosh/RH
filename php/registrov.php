<html>
<head>
<title>Registro de vacantes</title>
</head>
<body style="background-color:powderblue;">
<h1 style="color:blue; font-family:verdana; font-size:110%; text-align:center;"></h1>
<!-- <b>Registro de vacante</b></h1> -->

<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$Clave=$_POST["Clave"];
$Empresa=$_POST["Empresa"];
$Puesto=$_POST["Puesto"];
$Funciones=$_POST["Funciones"];
$Requisitos=$_POST["Requisitos"];
$Nivel=$_POST["Nivel"];
$Lugar=$_POST["Lugar"];
$Sueldo=$_POST["Sueldo"];
$Estatus=$_POST["Estatus"];
$Fecha=date("Y-m-d");

/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */

echo "Clave: $Clave";
echo "<br>Empresa: $Empresa";
echo "<br>Puesto: $Puesto";
echo "<br>Nivel: $Nivel";
echo "<br>Requisitos: $Requisitos";
echo "<br>Funciones: $Funciones";
echo "<br>Lugar: $Lugar";
echo "<br>Sueldo: $Sueldo";
echo "<br>Fecha: $Fecha";
echo "<br>Estatus: $Estatus<br>";


/* DEFINE LA BASE DE DATOS Y LA ABRE */

DEFINE('DB_USER','arhsi_arhsi01');
DEFINE('DB_PASSWORD','arhsi6502');
DEFINE('DB_HOST','localhost:3306');
DEFINE('DB_NAME','arhsi01_reg');

$dbc = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

if (mysqli_connect_errno()) 
	{ echo "Failed to connect to DB: ".mysqli_connect_error(); }
else { echo "DB conected";
	$stmt=mysqli_stmt_init($dbc); }

/* GENERA EL QUERY PARA GRABACION DE DATOS EN LA BASE DE DATOS Y LO EJECUTA */

if(mysqli_stmt_prepare($stmt,"INSERT INTO Vacantes (Clave,Empresa,Puesto,Funciones,Requisitos,Nivel,Lugar,Fecha,Estatus,Sueldo) VALUES (?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssssss",$Clave,$Empresa,$Puesto,$Funciones,$Requisitos,$Nivel,$Lugar,$Fecha,$Estatus, $Sueldo);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
 //		echo "Datos grabados, envío de correo a cv <br>";
		echo "<b><br><br>Vacante grabada.</b>";
		$to = "cv@arhsi.com.mx";
		$subjet = "Nueva vacante dada de alta";
		$message = nl2br("              Clave: $Clave\n             Puesto: $Puesto\n              Nivel: $Nivel\n            Empresa: $Empresa\n          Funciones: $Funciones\n         Requisitos: $Requisitos\n   Lugar de trabajo: $Lugar\n  Fecha de registro: $Fecha\n             Sueldo: $Sueldo\n            Estatus: $Estatus\n",false);
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
</body>
</html>