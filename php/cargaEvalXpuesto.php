<?php 
$puesto=$_GET["puesto"];

require 'arhsi_connect.php';
$query="SELECT Evaluaciones.clv_evaluacion, Evaluaciones.nombre_eval, Evaluaciones.nivel_cono, 
conocimientos.cono_desc FROM eval_XPuesto 
LEFT JOIN Evaluaciones ON Evaluaciones.clv_evaluacion = eval_XPuesto.clv_evaluacion
LEFT JOIN conocimientos ON conocimientos.clv_conocim = Evaluaciones.clv_conocim
WHERE eval_XPuesto.clv_puesto = $puesto ORDER BY Evaluaciones.nombre_eval DESC";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No hay Evaluaciones");
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
            $nivel = $row[2];
            $nivelx="";

            switch($nivel){
                case "1":
                    $nivelx = "Alto";
                    break;
                case "2":
                    $nivelx = "Medio";
                    break;
                case "3":
                    $nivelx = "Bajo";
                    break;
                default:
                    $nivelx = "No definido";
            }
            $row[2] = $nivelx;
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }       
?>