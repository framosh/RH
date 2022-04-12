<title>Registro de candidatos</title>
</head>
<body style="background-color:#FF5500;">
<h1 style="color:#FF0F00; font-family:verdana; font-size:110%; text-align:center;"></h1>
<br><br>
<a href="index2.htm">
<img src="Oficina22.jpg" alt="Candidato registrado" style="float:center;width:100%;height:540px;border:0">
</a>

<?php

/* ASIGNA VALORES CAPTURADOS A VARIABLES */

$Nombre=$_POST["cand_nom"];
$Tel1=$_POST["cand_tel1"];
$Tel2=$_POST["cand_tel2"];
$Correo=$_POST["cand_corr"];
$Puesto=$_POST["cand_pue"];
$Area=$_POST["cand_area"];
$Colonia=$_POST["cand_col"];
$Delegacion=$_POST["cand_del"];
$Estado=$_POST["cand_estado"];
$Observaciones=$_POST["cand_obs"];
$Estatus="Nuevo";
$CV=$_POST["cand_cv"];


/* DESPLIEGA LOS VALORES CAPTURADOS A GRABAR EN LA BASE DE DATOS */
/*
echo "<br>Nombre: $Nombre";
echo "<br>Tel1: $Tel1";
echo "<br>Tel2: $Tel2";
echo "<br>Correo: $Correo";
echo "<br>Puesto: $Puesto";
echo "<br>Area: $Area";
echo "<br>Colonia: $Colonia";
echo "<br>Delegación: $Delegacion";
echo "<br>Estado: $Estado";
echo "<br>Estatus: $Estatus";
echo "<br>Observaciones: $Observaciones<br>";
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

if(mysqli_stmt_prepare($stmt,"INSERT INTO Candidatos (cand_nom,cand_tel1,cand_tel2,cand_corr,cand_pue,cand_area,cand_col,cand_del,cand_estado,cand_obs,cand_est) VALUES (?,?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssssssss",$Nombre,$Tel1,$Tel2,$Correo,$Puesto,$Area,$Colonia,$Delegacion,$Estado,$Observaciones,$Estatus);
	mysqli_stmt_execute($stmt);
		
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
//		echo "Datos grabados, envío de correo a CV <br>";
//		echo "<b><br><br>Gracias por contactarnos, pronto le llamaremos.</b>";
		$to = "cv@arhsi.com.mx";
		$subjet = "Nuevo candidato";
		$attach = $cand_cv;
		$message = nl2br("     Candidato: $Nombre\n    Telefono 1: $Tel1\n    Telefono 2: $Tel2\n        Correo: $Correo\n        Puesto: $Puesto\n          Area: $Area\n       Colonia: $Colonia\n    Delegación: $Delegacion\n        Estado: $Estado\n Observaciones: $Observaciones\n       Estatus: $Estatus\n",false);
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

<form action="cap-candidato.htm">
<input type="submit" value="Regresar">
</form>

</body>
</html>