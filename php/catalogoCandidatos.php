<?php 
$vacante=$_GET["vacante"];

require 'arhsi_connect.php';

if($vacante != "" && $vacante != null){
  $query="SELECT Cand_x_vac.cand_key, Candidatos.cand_nom FROM Cand_x_vac  
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  WHERE Cand_x_vac.clv_vacante='$vacante' ORDER BY Candidatos.cand_nom DESC";  
} else {
  $vacante = "1";
  $query="SELECT cand_key, cand_nom FROM Candidatos WHERE '$vacante' ORDER BY cand_nom DESC";
}

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Candidatos");
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
?>