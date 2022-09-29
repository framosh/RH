<?php 
$evaluacion=$_GET["evaluacion"];
$pregunta=$_GET["pregunta"];

require 'arhsi_connect.php';

$query="SELECT Res_pom.sol_resp1, Res_pom.sol_resp2, Res_pom.calif_resp_pom 
FROM Preg_xeval 
LEFT JOIN Res_pom ON Res_pom.clv_preg_om = Preg_xeval.clv_preg_om
WHERE ((Preg_xeval.clv_tipo_eval = $evaluacion) AND (Preg_xeval.clv_preg_om = $pregunta))";

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