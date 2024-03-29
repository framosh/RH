<?php 
$candidato=$_GET["candidato"];

require 'arhsi_connect.php';

$query="SELECT Evaluaciones.clv_tipo_eval, Evaluaciones.nombre_eval, Eval_xcand.estatus_eval, 
conocimientos.cono_desc FROM Eval_xcand 
LEFT JOIN Evaluaciones ON Evaluaciones.clv_tipo_eval = Eval_xcand.clv_tipo_eval
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Evaluaciones.clv_conocim
WHERE (Eval_xcand.cand_key=$candidato) ORDER BY Evaluaciones.nombre_eval DESC";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No hay Evaluaciones");
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
          $estatus = $row[2];
          $estatus_desc = ["No definido","Aplicar","Aplicada","Cancelada","Abortada","Reprobada","Aprobada"];
          $nivelx=$estatus_desc[$estatus];

          $row[2] = $nivelx;
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }       
?>