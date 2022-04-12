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

for($i=0;$i<=15;$i++) {
	if($campos[$i]==null){
		$campos[$i]="";
	}
}

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Vacantes SET clv_puesto='$campos[3]', vac_desc='$campos[2]', Funciones='$campos[6]',
 Requisitos='$campos[5]', Nivel='$campos[4]', Lugar='$campos[7]', Estatus='$campos[12]', vac_sdo1='$campos[8]',
 vac_sdo2='$campos[9]', vac_edad2='$campos[11]', vac_edad1='$campos[10]', horario='$campos[14]', Observaciones='$campos[15]' WHERE ((clv_vacante LIKE '$campos[1]') AND (emp_clave LIKE '$campos[0]'))"))
	 	{
	  	mysqli_stmt_execute($stmt);
	  	$affected_rows = mysqli_stmt_affected_rows($stmt);

	  	if($affected_rows >=1)
	  		{
			echo "Datos actualizados, vacante numero:".$campos[1];
			} else { 
				echo "Datos no actualizados, vacante numero:".$campos[1];
				}
			mysqli_stmt_close($stmt);
			} else { echo "Fallo DB de Vacantes, vacante numero:".$campos[1];}
		mysqli_close($dbc);
?>