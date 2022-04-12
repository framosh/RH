<?php 
$Candidato=$_GET["Candidato"];
$Instituto=$_GET["Instituto"];
$Tipo_edu=$_GET["Tipo_edu"];

require 'arhsi_connect.php';

if($Instituto=="" && $Tipo_edu==""){
  $query="SELECT Edu_xcand.clv_tip_edu, inst_educativa.inst_nombre, Edu_xcand.carrera, Edu_xcand.campus, Edu_xcand.edu_generacion, Edu_xcand.edu_estatus FROM Edu_xcand 
  LEFT JOIN inst_educativa ON inst_educativa.clv_institucion = Edu_xcand.clv_institucion
  WHERE (Edu_xcand.cand_key='$Candidato')";
} else {
  $query="SELECT * FROM Edu_xcand 
  WHERE ((cand_key='$Candidato') AND (clv_institucion='$Instituto') AND (clv_tip_edu='$Tipo_edu'))";  
}

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Educacion");
}

        function Archivo($result) {
           return creArchivo('php://output', $result);
          }

        function creArchivo($filename, $result) {
         $fp = fopen($filename, 'w');
         $rc = llenaDatos($fp, $result);
         fclose($fp);
         if($rc==0) {
            echo("0|No hay Educacion");
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