<?php
$campos1 = $_GET['datosx2']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
$campos[0]=$_GET["empresa"];
$campos[1]=$_GET["vacante"];
$campos[2]=$_GET["nombre"];
$campos[3]=$_GET["puesto"];
$campos[4]=$_GET["nivel"];
$campos[5]=$_GET["requisitos"];
$campos[6]=$_GET["funciones"];
$campos[7]=$_GET["lugar"];
$campos[8]=$_GET["sueldo1"];
$campos[9]=$_GET["sueldo2"];
$campos[10]=$_GET["edad1"];
$campos[11]=$_GET["edad2"];
$campos[12]=$_GET["estatus"];
$campos[13]=$_GET["fecha"];
$campos[14]=$_GET["horario"];
$campos[15]=$_GET["obs"];
*/
$camposx1 = count($campos);

for($i=0;$i< $camposx1;$i++) {
	if($campos[$i]==null){
		$campos[$i]="";
	}
}

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Vacantes (emp_clave,vac_desc,clv_puesto,Funciones,Requisitos,Nivel,Lugar,vac_fech_reg,Estatus,vac_sdo1,vac_sdo2,vac_edad1,vac_edad2,horario,Observaciones) 
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssssssssssss",$campos[0],$campos[2],$campos[3],$campos[6],$campos[5],$campos[4],$campos[7],$campos[13],$campos[12],$campos[8],$campos[9],$campos[10],$campos[11],$campos[14],$campos[15]);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$registro = mysqli_stmt_insert_id($stmt); 
		$to = "soporte@arhsi.com.mx";
		$subjet = "Alta de nueva vacante";
		$message = nl2br("Clave vacante: $registro\n Puesto: $campos[2]\n  Nivel: $campos[5]\n Vacante: $campos[2]\n
		  Funciones: $campos[6]\n  Requisitos: $campos[5]\n   Lugar de trabajo: $campos[7]\n  
		  Fecha de registro: $campos[13]\n  Sueldo de: $campos[8]\n  Sueldo a: $campos[9]\n  Estatus: $campos[12]\n",false);
		$from = "federico.ramos@arhsi.com.mx";
		$header = "MIME-Version: 1.0\r\n";
		$header .= "Content-type: text/html\r\n";
		$header .= "From:".$from;
		$retval = mail($to,$subjet,$message,$header);
		if($retval == true){
			echo ("Alta de vacante, correo enviado, vacante numero:".$registro);
			} else { echo ("Alta de vacante, correo no enviado, vacante numero:".$registro);}
		} else { echo ("Error registro no insertado, Vacante:No insertado:".$campos1); } 
	mysqli_stmt_close($stmt);
	mysqli_close($dbc);
	} else {
		echo("Error insercion de registro de vacante:Campos erroneos:".$campos1);
	}
?>