<?php 
$puesto=$_GET["puesto"];
$evaluacion=$_GET["evaluacion"];

require 'arhsi_connect.php';
$query="SELECT Evaluaciones.clv_evaluacion, Evaluaciones.nombre_eval, conocimientos.cono_desc, Evaluaciones.nivel_cono FROM eval_XPuesto 
LEFT JOIN Evaluaciones ON Evaluaciones.clv_evaluacion = eval_XPuesto.clv_evaluacion
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Evaluaciones.clv_conocim
WHERE ((eval_XPuesto.clv_puesto = $puesto) AND (eval_XPuesto.clv_evaluacion = $evaluacion))";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No hay evaluaciones para el puesto:".$puesto);
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