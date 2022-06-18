<?php 
$empresa=$_GET['clave'];

require 'arhsi_connect.php';
$query="SELECT emp_nom FROM Empresa WHERE emp_clave='$empresa'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($result){
    Archivo($result);
    mysqli_close($dbc);
} else {
    $mensaje = "No existe la Empresa: ".$empresa;
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
         $enclosure=chr(34);
         while($row = mysqli_fetch_row($result)) {
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }       
?>