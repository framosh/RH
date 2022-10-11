
<?php
setlocale(LC_ALL,"es_ES");
$encoding = "UTF-8";
$evaluacion=$_GET['evaluacion'];

require 'arhsi_connect.php';

$condicion="clv_evaluacion='$evaluacion'";

$query="SELECT * FROM preg_eval_cand WHERE ($condicion)";

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
