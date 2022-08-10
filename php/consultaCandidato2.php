<?php 
$candidato=$_GET['candidato'];

require 'arhsi_connect.php';
$query="SELECT Vacantes.vac_desc, Candidatos.cand_nom FROM Candidatos 
LEFT JOIN Cand_x_vac ON Cand_x_vac.cand_key = Candidatos.cand_key
LEFT JOIN Vacantes ON Vacantes.clv_vacante = Cand_x_vac.clv_vacante
WHERE Candidatos.cand_key='$candidato'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
} else {
    echo("No existe el Candidato");
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