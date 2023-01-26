<?php
$campos1 = $_GET['datosx2']; 
$campos = array();
$campos = explode('|',$campos1); 

/*
    datosx1[0] = cliente_clv;
    datosx1[1] = vacante;
    datosx1[2] = nvacante;
    datosx1[3] = puesto_clv;
    datosx1[4] = nivel;
    datosx1[5] = requisitos;
    datosx1[6] = funciones;
    datosx1[7] = lugar;
    datosx1[8] = sueldo1;
    datosx1[9] = sueldo2;
    datosx1[10] = edad1;
    datosx1[11] = edad2;
    datosx1[12] = estatus;
    datosx1[13] = fecha;
    datosx1[14] = horario;
    datosx1[15] = obs;
        datosx1[16] = func2;
    datosx1[17] = req2;
    datosx1[18] = obs2;
    datosx1[19] = corr1;
    datosx1[20] = corr2;
    datosx1[21] = corr3;
    datosx1[22] = motivo;
*/

$cantidad = count($campos);

for($i=0;$i<$cantidad;$i++) {
	if($campos[$i]==null){
		$campos[$i]="";
	}
}

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Vacantes SET clv_puesto='$campos[3]', vac_desc='$campos[2]', 
Funciones='$campos[6]', Requisitos='$campos[5]', Nivel='$campos[4]', Lugar='$campos[7]', 
Estatus='$campos[12]', vac_sdo1='$campos[8]', vac_sdo2='$campos[9]', vac_edad2='$campos[11]', 
vac_edad1='$campos[10]', horario='$campos[14]', Observaciones='$campos[15]', func2='$campos[16]', 
req2='$campos[17]', obs2='$campos[18]',correo1='$campos[19]',correo2='$campos[20]',correo3='$campos[21]',
motivo='$campos[22]' 
WHERE ((clv_vacante LIKE '$campos[1]') AND (emp_clave LIKE '$campos[0]'))"))
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