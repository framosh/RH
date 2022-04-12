<?php 
$usuario=$_GET['Uclave'];
$Clave=$_GET['clvacceso'];
$estatus="Activo";

require 'arhsi_connect.php';

$query="SELECT usuarioclv, nombre, nivel, clave, puesto FROM Acceso WHERE ((usuarioclv LIKE '$usuario') AND (clave LIKE '$Clave') AND (estatus LIKE '$estatus'))";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
        Archivo($result);
    mysqli_close($dbc);
    } else { echo "No hay usuario activo"; }

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

      function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
  			if ($rc==0) {	echo "No hay usuario activo";	}
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
