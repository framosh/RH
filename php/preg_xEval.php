
<?php
setlocale(LC_ALL,"es_ES");
$encoding = "UTF-8";
$evaluacion=$_GET['evaluacion'];
$estatus=1;

require 'arhsi_connect.php';

$condicion="preg_eval_cand.clv_evaluacion='$evaluacion' AND Eval_xcand.estatus_eval='$estatus'";

$query="SELECT preg_eval_cand.clv_evaluacion, preg_eval_cand.clv_tipo_preg, preg_eval_cand.clv_pregunta FROM preg_eval_cand 
LEFT JOIN Eval_xcand ON Eval_xcand.clv_evaluacion = preg_eval_cand.clv_evaluacion
WHERE ($condicion)";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

    if($numero_filas >0){
        Archivo($result);
        mysqli_close($dbc);
    } else {
        echo("No hay Preguntas para la evaluación: ".$evaluacion);
    }
    
            function Archivo($result) {
               return creArchivo('php://output', $result);
              }
    
            function creArchivo($filename, $result) {
             $fp = fopen($filename, 'w');
             $rc = llenaDatos($fp, $result);
             fclose($fp);
             if($rc==0) {
                echo("No hay Preguntas para la evaluación");
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

mysqli_free_result($result);
mysqli_close($dbc);
?>
