<?php
$evaluacion=$_GET['evaluacion'];

require 'arhsi_connect.php';

$query="SELECT Preg_xeval.posicion, Preg_xcom.nombre_pregpc, Preg_om.nombre_pregom FROM Preg_xeval 
LEFT JOIN Preg_om ON Preg_om.clv_preg_om = Preg_xeval.clv_preg_om
LEFT JOIN Preg_xcom ON Preg_xcom.clv_preg_pc = Preg_xeval.clv_preg_pc
WHERE (Preg_xeval.clv_tipo_eval = '$evaluacion')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
         echo("No hay Preguntas asignadas");
        }

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("No hay Preguntas asignadas");
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