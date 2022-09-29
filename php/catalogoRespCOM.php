<?php 
$evaluacion=$_GET["Evaluacion"];
$candidato=$_GET["candidato"];
$condicion = "";

if($evaluacion ==0){
    echo("0|No hay respuestas por complemento");
    return;
} else {
  $condicion = "((Preg_xeval.clv_tipo_eval='$evaluacion') AND (Preg_xeval.clv_preg_pc != 0))";
}

require 'arhsi_connect.php';

$query="SELECT Preg_xeval.clv_preg_pc, Preg_xcom.nombre_pregpc, Preg_xeval.clv_tipo_eval, posicion 
FROM Preg_xeval 
LEFT JOIN Preg_xcom ON Preg_xcom.clv_preg_pc = Preg_xeval.clv_preg_pc
WHERE $condicion ORDER BY Preg_xeval.posicion";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
         echo("0|No hay respuestas por complemento");
        }

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay respuestas por complemento");
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