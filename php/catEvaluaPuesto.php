<?php 
$puesto=$_GET["puesto"];

require 'arhsi_connect.php';

$query="SELECT Evaluaciones.clv_tipo_eval, Evaluaciones.nombre_eval FROM eval_XPuesto 
LEFT JOIN Evaluaciones ON Evaluaciones.clv_tipo_eval = eval_XPuesto.clv_tipo_eval
WHERE (eval_XPuesto.clv_puesto = $puesto) ORDER BY Evaluaciones.nombre_eval DESC";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Evaluaciones");
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