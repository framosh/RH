<?php 
$vacante=$_GET["Vacante"];
$condicion = "";
$condicion = "Con_req.clv_vacante='$vacante'";

require 'arhsi_connect.php';

  $query="SELECT Con_req.clv_conocim, conocimientos.cono_desc, Con_req.nivel_conocim, Con_req.exp_anio_min, Con_req.exp_mes_min 
  FROM Con_req 
  LEFT JOIN conocimientos ON conocimientos.clv_conocim = Con_req.clv_conocim
  WHERE $condicion 
  ORDER BY conocimientos.cono_desc DESC";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
        mysqli_close($dbc);
        echo("No hay Conocimientos");
        return;
    }

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("No hay Conocimientos");
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