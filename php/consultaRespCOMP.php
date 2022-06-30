<?php 
$evaluacion=$_GET["evaluacion"];
$pregunta=$_GET["pregunta"];

require 'arhsi_connect.php';

$query="SELECT Res_pc.resp_comp, Res_pc.calif_resp_pc FROM Preg_xeval 
LEFT JOIN Res_pc ON Res_pc.clv_preg_pc = Preg_xeval.clv_preg_pc
WHERE ((Preg_xeval.clv_evaluacion = $evaluacion) AND (Preg_xeval.clv_preg_pc = $pregunta))";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas > 0){
    Archivo($result);
    mysqli_close($dbc);
} else {
  $mensaje = "No hay respuestas a pregunta: ".$pregunta; 
    echo($mensaje);
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
            global $pregunta;

         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("No hay respuestas a pregunta: ".$pregunta);
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
         mysqli_free_result($result);
         return $nrows;
         }       
?>