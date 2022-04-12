<?php 
$Clave=$_GET['Uclave'];

echo "Clave: $Clave";

/* ABRE LA BASE DE DATOS */
require 'arhsi_connect.php';

$query="SELECT usuarioclv, nombre, correo, nivel, estatus, clave, puesto FROM Acceso WHERE usuarioclv='$Clave'";

$result = mysqli_query($dbc,$query);

        Archivo($result);

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
         return $nrows;
         }       
mysqli_close($dbc);
?>