<?php 
$candidato=$_GET['candidato'];

require 'arhsi_connect.php';
$query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Candidatos.cand_tel1, Candidatos.cand_tel2,
Candidatos.cand_corr, Candidatos.cand_skype, Candidatos.cand_fecha_nac, Candidatos.cand_direccion,
Candidatos.cand_estado, Candidatos.cand_edad, Candidatos.cand_edoc, Candidatos.cand_hijos, 
Candidatos.cand_sdo_ult,Candidatos.cand_sdo_sol, Candidatos.cand_ult_trab, Candidatos.cand_ult_pue, 
Candidatos.cand_obs_reclu,Candidatos.cand_obs_eval, Vacantes.vac_desc, Candidatos.nacionalidad, 
Candidatos.colonia, Candidatos.municipio,Candidatos.com_cand, Candidatos.act_recrea, Candidatos.act_cult, 
Candidatos.ingles, Candidatos.espaniol,Candidatos.otro, Candidatos.foto_dir FROM Candidatos 
LEFT JOIN Vacantes ON Vacantes.clv_vacante = Candidatos.clv_vacante
WHERE cand_key='$candidato'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
} else {
    echo("0|No existe el Candidato");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         return $rc;
         }

       function llenaDatos($stream, $result) {
         $nrows = 0;
         $delimiter=chr(124);
         $enclosure=chr(34);
         while($row = mysqli_fetch_row($result)) {
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }
mysqli_close($dbc);

?>