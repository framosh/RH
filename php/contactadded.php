<html>
<head>
<title>Alta de contacto</title>
</head>
<body>

<b>Proceso de grabado de datos</b></br>

<?php
echo 'Prospecto: ';
echo $_POST["Nombre"];
echo '    Empresa ';
echo $_POST["Empresa"];
echo ' <br>';

if(isset($_POST["Nombre"]))
	{
	$data_missing=array();

	if(empty($_POST["Nombre"]))
		{
		$data_missing[]='Nombre';
		echo 'No hay nombre<br>';
		} 
	else {
		$Nombre=$_POST["Nombre"];
		}


	if(empty($_POST["Empresa"]))
		{
		$data_missing[]='Empresa';
		echo 'No hay empresa <br>';
		} 
	else {
		$Empresa=$_POST["Empresa"];
		}
	
	if(empty($_POST["correo"]))
		{
		$data_missing[]='correo';
		echo 'No hay correo <br>';
		} 
	else {
		$correo=$_POST["correo"];
		}

	if(empty($_POST["Telefono"]))
		{
		$data_missing[]='Telefono';
		echo 'No hay Telefono <br>';
		} 
	else {
		$Telefono=$_POST["Telefono"];
		}

	if(empty($_POST["Producto"]))
		{
		$data_missing[]='Producto';
		echo 'No Producto <br>';
		} 
	else {
		$Producto=$_POST["Producto"];
		}

	if(empty($_POST["Comentarios"]))
		{
		$data_missing[]='Comentarios';
		echo 'No hay Comentarios <br>';
		} 
	else {
		$Comentarios=$_POST["Comentarios"];
		}

	if(empty($_POST["Secuencial"]))
		{
		$data_missing[]='0000';
		echo 'No hay secuencial <br>';
		} 
	else {
		$Secuencial=$_POST["Secuencial"];
		}

	if(empty($data_missing))
		{
		echo '<br>Grabando datos <br>';	
		echo "Contacto: $Nombre";
		echo "<br>Empresa: $Empresa";
		echo "<br>Correo: $correo";
		echo "<br>Telefono: $Telefono";
		echo "<br>Producto: $Producto";
		echo "<br>Comentarios: $Comentarios";
		echo "<br>Secuencial: $Secuencial";

		require 'arhsi_connect.php';
		$stmt=mysqli_stmt_init($dbc);

		if (mysqli_stmt_prepare($stmt,"INSERT INTO Prospectos (Fecha,Nombre,Empresa,correo,Telefono,Producto,Comentarios,Secuencial) VALUES (?,?,?,?,?,?,?,?)"))
			{
			mysqli_stmt_bind_param($stmt,"ssssssss",CURDATE(),$Nombre,$Empresa,$correo,$Telefono,$Producto,$Comentarios,$Secuencial);
			mysqli_stmt_execute($stmt);
		
			$affected_rows = mysqli_stmt_affected_rows($stmt);

			if($affected_rows ==1)
				{
				echo 'Datos grabados <br>';
				mysqli_stmt_close($stmt);
				mysqli_close($dbc);
				} 
			else {
				echo '<br>Error de grabacion: ';
				echo mysqli_error();
				}
			mysqli_stmt_close($stmt);
			mysqli_close($dbc);
			}  
		else { 
			echo 'Fallo la grabacion de datos  <br>';
 			} 
		}
	else {
		echo 'Por favor teclee los siguientes datos <br>';
		foreach($data_missing as $missing)	
		        echo "$missing<br>"; 				
		}
	}
else {
	echo 'No hay datos a grabar <br>';
	}
?>

<form action="http://arhsi.com.mx/contactadded.php" method="post">

<b>Para mayor informacion, por favor llene el siguiente formato y un ejecutivo le atendera oportunamente</b>

<p>Nombre:<input type="text" name="Nombre" size="40" value=""/></p>
<p>Empresa:<input type="text" name="Empresa" size="40" value="" /></p>
<p>Correo:<input type="email" name="correo" size="40" value="" /></p>
<p>Telefono:<input type="text" name="Telefono" size="20" value="" /></p>
<p>Comentarios:<input type="text" name="Comentarios" maxlength="512" value="" /></p>
<p>Secuencial:<input type="text" name="Secuencial" size="4" value="0" /></p>

<input type="radio" name="Producto" value="Desarrollo web" checked> Desarrollo web<br>
  <input type="radio" name="Producto" value="Desarrollo"> Desarrollo en otras plataformas<br>
  <input type="radio" name="Producto" value="PowerStreet"> Sistema de ventas PowerStreet<br>
  <input type="radio" name="Producto" value="Capacitacion"> Capacitacion<br>
  <input type="radio" name="Producto" value="Head Hunting"> Seleccion de personal informatico<br>
  <input type="radio" name="Producto" value="Outsourcing"> Outsourcing de personal informatico<br>
  <input type="radio" name="Producto" value="Monitoreo"> Monitoreo<br>
  <input type="radio" name="Producto" value="Otro"> Otro<br>

<p><input type="submit" name "submit" value="Send"></p>
</form>
</body>
</html>