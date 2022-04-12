<?php 
//    var archivo2 = archivo1 + "?vacante=" + vacante_clv + "&empresa=" + empresa_clv + 
//"&conocimiento=" + conocimiento_clv;

$conocimiento=$_GET["conocimiento"];
$vacante=$_GET["vacante"];
$empresa=$_GET["empresa"];

require 'arhsi_connect.php';
$query="SELECT * FROM Con_req WHERE (clv_conocim='$conocimiento' AND clv_vacante='$vacante')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Conocimientos");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay Conocimientos");
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