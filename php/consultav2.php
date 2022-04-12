<html>
<head>
<title>Reporte de vacantes</title>
</head>
<body style="background-color:powderblue;">
<h1 style="color:blue; font-family:verdana; font-size:110%; text-align:center;"></h1>
<!-- <b>Registro de vacante</b></h1> -->

<?php
$Clave=$_POST["Clave"];
$Empresa=$_POST["Empresa"];
$Puesto=$_POST["Puesto"];
$Funciones=$_POST["Funciones"];
$Requisitos=$_POST["Requisitos"];
$Nivel=$_POST["Nivel"];
$Lugar=$_POST["Lugar"];
$Sueldo=$_POST["Sueldo"];
$Estatus=$_POST["Estatus"];

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

/*
DEFINE('DB_USER','arhsi_arhsi01');
DEFINE('DB_PASSWORD','arhsi6502');
DEFINE('DB_HOST','localhost:3306');
DEFINE('DB_NAME','arhsi01_reg');
*/
/*
$dbc = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
if (mysqli_connect_errno()) 
	{ echo "Failed to connect to DB: ".mysqli_connect_error(); }
else { echo "DB conected";
	$stmt=mysqli_stmt_init($dbc); }
*/

require 'arhsi_connect.php';
$query="SELECT * FROM Vacantes WHERE clv_vacante ='$Clave'";
$result = mysqli_query($dbc,$query);

$fp = fopen('php://output', 'w');
if ($fp && $result) {
	if($row = mysqli_fetch_row($result)) {
        	fputs($fp, $row);
		echo "<br>Campo 0: $row[0]";
		echo "<br>Campo 1: $row[1]";
		echo "<br>Campo 2: $row[2]";
		echo "<br>Campo 3: $row[3]";
		echo "<br>Campo 4: $row[4]";
		echo "<br>Campo 5: $row[5]";
		echo "<br>Campo 6: $row[6]";
		echo "<br>Campo 7: $row[7]";
		echo "<br>Campo 8: $row[8]";
		echo "<br>Campo 9: $row[9]<br>";
		} else { echo "<br>Fallo la consulta de datos"; }
	}
fclose($fp);
mysqli_stmt_close($stmt);
mysqli_close($dbc);
/* CIERRA LA BASE DE DATOS */
//mysqli_close($dbc);
?>
</body>
</html>