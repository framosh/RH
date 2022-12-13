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
*/
//if(mysqli_stmt_prepare($stmt,"INSERT INTO Vacantes (emp_clave,vac_desc,clv_puesto,Funciones,Requisitos,
//Nivel,Lugar,horario,Observaciones,vac_fech_reg,vac_sdo1,vac_sdo2,vac_edad1,vac_edad2,
//Estatus,func2,req2,obs2) 

//mysqli_stmt_bind_param($stmt,"ssssssssssssssssss",$campos[0],$campos[2],$campos[3],$campos[6],$campos[5],$campos[4],$campos[7],$campos[14],$campos[15],$campos[13],$campos[8],$campos[9],$campos[10],$campos[11],$campos[12],$campos[16],$campos[17],$campos[18]);

$camposx1 = count($campos);

for($i=0;$i< $camposx1;$i++) {
	if($campos[$i]==null){
		$campos[$i]="";
	}
}

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Vacantes (emp_clave,vac_desc,clv_puesto,Funciones,Requisitos,Nivel,Lugar,horario,Observaciones,vac_fech_reg,vac_sdo1,vac_sdo2,vac_edad1,vac_edad2,Estatus,func2,req2,obs2) 
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssssssssssssssssss",$campos[0],$campos[2],$campos[3],$campos[6],$campos[5],$campos[4],$campos[7],$campos[14],$campos[15],$campos[13],$campos[8],$campos[9],$campos[10],$campos[11],$campos[12],$campos[16],$campos[17],$campos[18]);
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