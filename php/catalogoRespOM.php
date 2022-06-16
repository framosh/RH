<?php 
$evaluacion=$_GET["Evaluacion"];
$condicion = "";

if($evaluacion ==0){
    echo("0|No hay respuestas de opcion multiple");
    return;
} else {
  $condicion = "((Preg_xeval.clv_evaluacion='$evaluacion') AND (Preg_xeval.clv_preg_om != 0))";
}

require 'arhsi_connect.php';

$query="SELECT Preg_xeval.clv_preg_om, Preg_om.nombre_pregom, Preg_xeval.clv_evaluacion, posicion 
FROM Preg_xeval 
LEFT JOIN Preg_om ON Preg_om.clv_preg_om = Preg_xeval.clv_preg_om
WHERE $condicion ORDER BY Preg_xeval.posicion";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
         echo("0|No hay respuestas de opcion multiple");
        }

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay respuestas de opcion multiple");
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