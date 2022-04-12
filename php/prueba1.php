<html>
<head>
<title>Grabar contacto</title>
</head>
<body style="background-color:powderblue;">
<h1 style="color:blue; font-family:verdana; font-size:150%; text-align:center;">
<b>Reporte de Requerimientos de Clientes</b></h1>

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
		/* echo "Datos grabados, envío de correo a ventas <br>"; */
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

/* IMPRESION DEL REPORTE DE CONTACTOS GRABADOS EN BASE DE DATOS */
/* GENERA EL QUERY DE CONSULTA DE LA BASE DE DATOS Y LO EJECUTA */

$query="SELECT * FROM Prospectos WHERE 1";
$response=@mysqli_query($dbc,$query);

/* SI HAY DATOS EN LA BASE DE DATOS DESPLIEGA LA INFORMACIÓN EN PANTALLA */

if($response)
	{
	echo '<br><b>Reporte de Contactos</b><br>';
	echo '<table align="left" cellspacing="1" cellpadding="1" font="arial" border="collapse" width="100%">
	<tr><td aling="left"><b>Nombre</b>     </td>
	<td align="left">    <b>Empresa</b>    </td>
	<td align="center">  <b>Correo</b>     </td>
	<td align="left">    <b>Telefono</b>   </td>
	<td align="left">    <b>Producto</b>   </td>
	<td align="center">  <b>Comentarios</b></td>
	<td align="center">  <b>Fecha</b>      </td>
	<td align="left">    <b>Secuencial</b> </td></tr>';

	while($row = mysqli_fetch_array($response))
		{
		echo '<tr><td align="left">'.
		$row['Nombre']      .'</td><td align="left">'.
		$row['Empresa']     .'</td><td align="left">'.
		$row['correo']      .'</td><td align="left">'.
		$row['Telefono']    .'</td><td align="left">'.
		$row['Producto']    .'</td><td align="left">'.
		$row['Comentarios'] .'</td><td align="left">'.
		$row['Fecha']       .'</td><td align="center">'.
		$row['Secuencial']  .'</td></tr>';
		}
	echo '</table><br>';
	} 
else { 
	echo 'Reporte vacio, no se puede emitir la consulta<br>';
	echo mysqli_error($dbc);
	 }

/* CIERRA LA BASE DE DATOS */

mysqli_close($dbc);
?>
</body>
</html>