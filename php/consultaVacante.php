<?php 
$vacante=$_GET['vacante'];

require 'arhsi_connect.php';

$query="SELECT Vacantes.vac_desc, Vacantes.vac_sdo1, Vacantes.vac_sdo2, Empresa.emp_nom, Vacantes.Estatus 
FROM Vacantes 
LEFT JOIN Empresa ON Empresa.emp_clave = Vacantes.emp_clave 
WHERE (Vacantes.clv_vacante LIKE '$vacante')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
} else {
  $mensaje = "No existe la vacante|".$vacante; 
    echo($mensaje);
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
//         $enclosure=chr(34);
         while($row = mysqli_fetch_row($result)) {
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }
mysqli_close($dbc);
?>