<?php 
// Extracción de los registros de experiencia del candidato seleccionado
$Candidato=$_GET["Candidato"];
$Experiencia=$_GET["Experiencia"];

require 'arhsi_connect.php';


if($Experiencia != ""){
  $query="SELECT * FROM Experiencia WHERE ((cand_key LIKE '$Candidato') AND (exp_clv LIKE '$Experiencia'))";
} else {
//  $query="SELECT * FROM Experiencia WHERE (cand_key='$Candidato') ORDER BY periodo DESC";  
  $query="SELECT * FROM Experiencia WHERE (cand_key='$Candidato')";  
}

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Experiencia");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay Experiencia");
            }
         return $rc;
         }


       function llenaDatos($stream, $result) {
         $nrows = 0;
         $delimiter='|';
//         $separator='|';
//         $eol=chr(13);
//         $delimiter=chr(124);
//         $escape_char ="\";
         while($row = mysqli_fetch_row($result)) {

          $row[7] = str_replace("\n","<br>",$row[7]);
          $row[8] = str_replace("\n","<br>",$row[8]);
          $row[9] = str_replace("\n","<br>",$row[9]);

           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         return $nrows;
         }       
?>