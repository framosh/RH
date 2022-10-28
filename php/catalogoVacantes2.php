<?php 

require 'arhsi_connect.php';
$query="SELECT clv_vacante, vac_desc FROM Vacantes  WHERE vac_desc <>''";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

$rc = 0;
while($row = mysqli_fetch_row($result)) {
    $response[$rc]['datos1']=$row[0];
    $response[$rc]['datos2']=$row[1];
    $rc++;
    }

if($rc==0) {
    $response[0]['error']=true;
    $response[0]['message']="No hay Vacantes";
    $response[0]['datos1']="sin datos";
    $response[0]['datos2']="sin datos";
    } else {
         $response[0]['error']=false;
         $response[0]['message']="Familias encontradas ";
//		     $response['datos']=$rc;
        }

mysqli_close($dbc);
header('Content-Type: application/json');
echo json_encode($response);


/*
if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("No hay vacantes");
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
             $mensaje = "No hay vacantes";
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
         */
?>