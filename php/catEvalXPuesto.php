<?php 
$puesto=$_GET["puesto"];
$evaluacion=$_GET["evaluacion"];

require 'arhsi_connect.php';
$query="SELECT Evaluaciones.clv_tipo_eval, Evaluaciones.nombre_eval, conocimientos.cono_desc, Evaluaciones.nivel_cono FROM eval_XPuesto 
LEFT JOIN Evaluaciones ON Evaluaciones.clv_tipo_eval = eval_XPuesto.clv_tipo_eval
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Evaluaciones.clv_conocim
WHERE (eval_XPuesto.clv_puesto = '$puesto')";

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
          if($row[3]==3){$row[3]="bajo";}
          if($row[3]==2){$row[3]="medio";}
          if($row[3]==1){$row[3]="alto";}
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }       
?>