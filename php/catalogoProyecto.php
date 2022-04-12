<?php 
$Cliente=$_GET['cliente'];
$Estatus="Activo";

/* ABRE LA BASE DE DATOS */
require 'arhsi_connect.php';

$query="SELECT Proyecto.proy_clave, Proyecto.servicio,  Servicios.nombre FROM Proyecto
LEFT JOIN Servicios ON Servicios.servicio_clv = Proyecto.servicio WHERE Proyecto.emp_clave='$Cliente'";

$result = mysqli_query($dbc,$query);

        Archivo($result);

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
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