<?php
$campos1 = $_GET['campos']; 
$campos = array();
$campos = explode('|',$campos1); 

require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Candidatos 
SET cand_nom='$campos[0]',
cand_tel1='$campos[1]',
cand_tel2='$campos[2]',
cand_corr='$campos[3]',
cand_skype='$campos[4]',
cand_fecha_nac='$campos[5]',
cand_direccion='$campos[6]',
cand_estado='$campos[7]',
cand_edad='$campos[8]',
cand_edoc='$campos[9]',
cand_hijos='$campos[10]',
clv_est_cand='$campos[11]',
cand_sdo_sol='$campos[12]',
clv_vacante='$campos[13]',
cand_sdo_ult='$campos[14]',
cand_ult_trab='$campos[15]',
cand_ult_pue='$campos[16]',
clv_est_cv='$campos[17]',
clv_est_ent='$campos[18]',
clv_est_eval='$campos[19]',
cand_fech_env='$campos[20]',
cand_fech_ingre='$campos[21]',
cand_sdo_contr='$campos[22]',
cand_obs_reclu='$campos[23]',
cand_obs_eval='$campos[24]',
com_cand='$campos[25]',
act_cult='$campos[26]',
act_recrea='$campos[27]',
ingles='$campos[28]',
espaniol='$campos[29]',
otro='$campos[30]',
foto_dir='$campos[32]',
foto_nom='$campos[33]',
file_dir='$campos[34]',
file_nom='$campos[35]',
fecha_ent='$campos[36]', 
hora_ent='$campos[37]', 
lugar_ent='$campos[38]'
WHERE cand_key='$campos[31]'"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	          {  echo "Candidato actualizado";  
               $candidato=$campos[31];
               $estatus=$campos[11];
               $vacante=$campos[13];
            actualiza_cand_x_vac($candidato,$vacante,$estatus);
           }
           else { 
              $mensaje = "Fallo la actualización del candidato: ".$campos[31];
              echo ($mensaje);
            }
           mysqli_stmt_close($stmt);
        }
   else { echo "Fallo apertura de la DB de Candidatos";}

function actualiza_cand_x_vac($candidato,$vacante,$estatus)
{
require 'arhsi_connect.php';

if(mysqli_stmt_prepare($stmt,"UPDATE Cand_x_vac 
SET estatus='$estatus'
WHERE (Cand_x_vac.cand_key='$candidato' AND Cand_x_vac.clv_vacante='$vacante')"))
	{
	   mysqli_stmt_execute($stmt);
	   $affected_rows = mysqli_stmt_affected_rows($stmt);
           if($affected_rows ==1)
	          {  echo "<br>Estatus actualizado";}
           else { 
              $mensaje = "<br>Fallo la actualización del estatus: ".$estatus;
              echo ($mensaje);
            }
           mysqli_stmt_close($stmt);
        }
   else { echo "<br>Fallo apertura de la DB de Cand_x_vac";}
}
mysqli_close($dbc);
?>