<?php 
$Clave=$_GET["clave"];

require 'arhsi_connect.php';
$query="SELECT * FROM Evaluaciones WHERE clv_tipo_eval='$Clave'";

$result = mysqli_query($dbc,$query);
//$numero_filas = mysqli_num_rows($result);

if($result){
    Archivo($result);
    mysqli_close($dbc);
} else {
  $mensaje = "No hay Evaluacion número: ".$Clave; 
    echo($mensaje);
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay Evaluacion");
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
         mysqli_free_result($result);
         return $nrows;
         }       
?>