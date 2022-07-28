<?php
$encoding = "utf-8";
$campos1 = $_GET['campos']; 
$campo = array();
$campo = explode('|',$campos1); 


//cand_nom,cand_tel1,cand_tel2,cand_corr,cand_skype,cand_fecha_nac,cand_direccion,cand_estado,cand_edad,
//cand_edoc,cand_hijos,clv_est_cand,cand_sdo_sol,clv_vacante,cand_sdo_ult,cand_ult_trab,cand_ult_pue,clv_est_cv,
//clv_est_ent,clv_est_eval,cand_fech_env,cand_fech_ingre,cand_sdo_contr,cand_obs_reclu,cand_obs_eval,com_cand
//,act_recrea,act_cult,ingles,espaniol,otro,foto_dir,foto_nom
require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"INSERT INTO Candidatos (cand_nom,cand_tel1,cand_tel2,cand_corr,cand_skype,
cand_fecha_nac,cand_direccion,cand_estado,cand_edad,cand_edoc,cand_hijos,clv_est_cand,cand_sdo_sol,
clv_vacante,cand_sdo_ult,cand_ult_trab,cand_ult_pue,clv_est_cv,clv_est_ent,clv_est_eval,cand_fech_env,
cand_fech_ingre,cand_sdo_contr,cand_obs_reclu,cand_obs_eval,com_cand,act_recrea,act_cult,ingles,espaniol,otro,
foto_dir,foto_nom) 
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"sssssssssssssssssssssssssssssssss",$campo[0],$campo[1],$campo[2],$campo[3],$campo[4],
    $campo[5],$campo[6],$campo[7],$campo[8],$campo[9],$campo[10],$campo[11],$campo[12],$campo[13],$campo[14],
	$campo[15],$campo[16],$campo[17],$campo[18],$campo[19],$campo[20],$campo[21],$campo[22],$campo[23],
	$campo[24],$campo[25],$campo[26],$campo[27],$campo[28],$campo[29],$campo[30],$campo[31],$campo[32]);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
		$candidato = mysqli_stmt_insert_id($stmt);
//		echo "Datos grabados, envío de correo a soporte";
		$to = "soporte@arhsi.com.mx";
		$subjet = "Candidato nuevo: ".$candidato;
		$message = nl2br("Candidato: $campo[0]\nVacante: $campo[13]\nTelefono : $campo[1]\nCorreo: $campo[3]\nSueldo solicitado: $campo[12]\nEdad: $campo[8]\n",false);
		$from = "federico.ramos@arhsi.com.mx";
		$header = "MIME-Version: 1.0\r\n";
		$header .= "Content-type: text/html\r\n";
		$header .= "From:".$from;
		$retval = mail($to,$subjet,$message,$header);
		if($retval == true){
			echo "Alta de candidato, candidato: ".$candidato;
			$vacante=$campo[13];
			registroCand_x_vac($candidato,$vacante);	
			} else { echo "Alta de candidato, correo no enviado, candidato: ".$candidato;}
		} 
	else {
		echo("<br>Error de grabacion: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "<br>Fallo la grabación de datos"; 
	}

mysqli_close($dbc);

function registroCand_x_vac($candidato,$vacante) {
	$estatus="1";
	require 'arhsi_connect.php';

	if(mysqli_stmt_prepare($stmt,"INSERT INTO Cand_x_vac (clv_vacante, cand_key, estatus) VALUES (?,?,?)"))
		{
		mysqli_stmt_bind_param($stmt,"sss",$vacante,$candidato,$estatus);
		mysqli_stmt_execute($stmt);
	
		$affected_rows = mysqli_stmt_affected_rows($stmt);
	
		if($affected_rows ==1)
			{
				echo "<br>Cand_x_vac grabado";
			} else {
				echo("<br>Error de grabacion en : Cand_x_vac: ".mysqli_error($dbc));
				}
		mysqli_stmt_close($stmt);
		mysqli_close($dbc);
		} else { echo "<br>Fallo la grabación de datos"; }
}
?>