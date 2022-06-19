<?php 
$evaluacion=$_GET["evaluacion"];
$pregunta=$_GET["pregunta"];

require 'arhsi_connect.php';

$query="SELECT Preg_om.clv_preg_om, Preg_om.nombre_pregom, Preg_om.desc_preg, Preg_om.clv_conocim,
Preg_om.resp1, Preg_om.resp2, Preg_om.resp3, Preg_om.resp4, Preg_om.resp5, Preg_om.sol_preg1, 
Preg_om.sol_preg2, Preg_om.img_dir, Res_pom.sol_resp1, Res_pom.sol_resp2, Res_pom.calif_resp_pom 
FROM Preg_xeval 
LEFT JOIN Res_pom ON Res_pom.clv_preg_om = Preg_xeval.clv_preg_om
WHERE ((Preg_xeval.clv_evaluacion = $evaluacion) AND (Preg_xeval.clv_preg_om = $pregunta))";

$result = mysqli_query($dbc,$query);
//$numero_filas = mysqli_num_rows($result);

if($result){
    Archivo($result);
    mysqli_close($dbc);
} else {
  $mensaje = "No hay Pregunta : ".$pregunta; 
    echo($mensaje);
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
            global $Clave;

         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay Pregunta clave: ".$Clave);
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