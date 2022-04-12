<html>
<head>
<title>Consulta de vacante</title>
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

/* DESPLIEGA EL REGISTRO BUSCADO EN LA BASE DE DATOS */

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

/* GENERA EL QUERY PARA CONSULTA EN LA BASE DE DATOS Y LO EJECUTA */

$query="SELECT * FROM Vacantes WHERE Clave ='$Clave'";
$result = mysqli_query($dbc,$query);


if($row = mysqli_fetch_row($result)) {
        fputcsv($stream, $row);
	}
else { echo "<br>Fallo la consulta de datos"; 
		}

echo "<br>Registro: $stream";

/* CIERRA LA BASE DE DATOS */
mysqli_close($dbc);
?>
</body>
</html>