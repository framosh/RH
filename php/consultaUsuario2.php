<?php 
$Clave=$_GET['Uclave'];

require 'arhsi_connect.php';
$query="SELECT usuarioclv, nombre, correo, nivel, estatus, clave, puesto FROM Acceso 
WHERE Acceso.usuarioclv='$Clave'";
/*
$query="SELECT Acceso.usuarioclv, Acceso.nombre, Acceso.correo, Acceso.nivel, Acceso.estatus, Acceso.clave, puesto.puesto_nom FROM Acceso 
LEFT JOIN puesto ON puesto.puesto_clv = Acceso.puesto
WHERE Acceso.usuarioclv='$Clave'";
*/

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No hay registros");
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
         $delimiter='|';
         while($row = mysqli_fetch_row($result)) {
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         return $nrows;
         }       
?>