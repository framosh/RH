<?php 
$puesto=$_GET["puesto"];
$evaluacion=$_GET["evaluacion"];

require 'arhsi_connect.php';
$query="SELECT Evaluaciones.observaciones FROM eval_XPuesto 
LEFT JOIN Evaluaciones ON Evaluaciones.clv_evaluacion = eval_XPuesto.clv_evaluacion
WHERE ((eval_XPuesto.clv_puesto = $puesto) AND (eval_XPuesto.clv_evaluacion = $evaluacion))";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No existe la evaluacion:".$evaluacion);
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