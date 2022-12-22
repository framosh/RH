<?php 
$vacante=$_GET["vacante"];
$todos="1";

require 'arhsi_connect.php';

if($vacante != "" && $vacante != null){
  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Cand_x_vac.estatus FROM Cand_x_vac  
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  LEFT JOIN Est_cand ON Est_cand.clv_est_cand = Candidatos.clv_est_cand
  WHERE Cand_x_vac.clv_vacante='$vacante' ORDER BY Candidatos.cand_nom DESC";  
} else {
  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Cand_x_vac.estatus FROM Cand_x_vac  
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  LEFT JOIN Est_cand ON Est_cand.clv_est_cand = Candidatos.clv_est_cand
  WHERE $todos ORDER BY Candidatos.cand_nom DESC";  
}

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Candidatos");
    mysqli_close($dbc);
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
          $estatus=["","Entrevistar","Enviar con cliente","Contratado","Rechazado","No localizable","No disponible","Fuera de presupuesto","No aplica"];
          $row[2]=$estatus[$row[2]]; 
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }       
?>