<?php 
$puesto=$_GET["puesto"];
$aplicacion=$_GET["aplicacion"];
//echo "Clave: $Clave";
require 'arhsi_connect.php';

$query="SELECT aplicacion.apli_nom, aplicacion.apli_dir, apl_puesto.apl_pue_perm, aplicacion.apli_desc FROM apl_puesto
LEFT JOIN aplicacion ON aplicacion.apli_clv = apl_puesto.apli_clv
WHERE ((apl_puesto.puesto_clv LIKE '$puesto') AND (apl_puesto.apli_clv LIKE '$aplicacion'))";

$result = mysqli_query($dbc,$query);

$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No hay permisos asignados");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("No hay permisos asignados");
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