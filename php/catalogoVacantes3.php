<?php 
$empresa=$_GET["Empresa"];

require 'arhsi_connect.php';
$query="SELECT clv_vacante, vac_desc FROM Vacantes WHERE (emp_clave LIKE '$empresa') ORDER BY clv_vacante DESC";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay vacantes");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         if($rc==0){
            $delimiter=chr(124);
            $enclosure=chr(34);
             $mensaje = "0|No hay vacantes";
             fputcsv($fp, $mensaje, $delimiter);
         }
         fclose($fp);
         mysqli_close($dbc);
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