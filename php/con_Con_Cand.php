<?php 
$conocimiento=$_GET["conocimiento"];
$candidato=$_GET["candidato"];

require 'arhsi_connect.php';
$query="SELECT Con_candidato.clv_conocim, conocimientos.cono_desc, Con_candidato.con_nivel, Con_candidato.con_anios, Con_candidato.con_meses FROM Con_candidato 
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_candidato.clv_conocim
WHERE (Con_candidato.clv_conocim='$conocimiento' AND Con_candidato.cand_key='$candidato')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Conocimientos");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay Conocimientos");
            }
         return $rc;
         }

       function llenaDatos($stream, $result) {
         $nrows = 0;
         $delimiter='|';
         while($row = mysqli_fetch_row($result)) {
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         return $nrows;
         }       
?>