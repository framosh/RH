<?php 
$vacante=$_GET["vacante"];
$estatus=$_GET["estatus"];
$todos="1";
$condicion="";
$condicion1="";
$condicion2="";
$estatus2=0;

if($vacante != ""){
  $condicion1="Cand_x_vac.clv_vacante='$vacante'";
}

if($estatus != "" && $estatus != "1" && $estatus != "0"){
  $estatus2 = $estatus-1;
  $condicion2 = "Cand_x_vac.estatus='$estatus2'";
} else {
  $condicion2 = "Cand_x_vac.estatus >=1";
}

if($condicion1 != ""){
  $condicion = $condicion1;
  if($condicion2 != ""){
    $condicion = $condicion." AND ".$condicion2;
  }
}

require 'arhsi_connect.php';

if($vacante != "" && $vacante != null){
  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Cand_x_vac.estatus FROM Cand_x_vac  
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  WHERE $condicion ORDER BY Candidatos.cand_nom ASC";  
} else {
  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Cand_x_vac.estatus FROM Cand_x_vac  
  LEFT JOIN Candidatos ON Candidatos.cand_key = Cand_x_vac.cand_key
  WHERE $todos ORDER BY Candidatos.cand_nom ASC";  
}

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    Archivo($result);
    mysqli_close($dbc);
} else {
    echo("0|No hay Candidatos");
    mysqli_close($dbc);
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
        $estatus3=["","Entrevistar","Enviar a evaluación","Contratado","Rechazado","No localizable","No disponible","Fuera de presupuesto","No aplica","Rechazo la oferta"];

         $delimiter=chr(124);
         $enclosure=chr(34);
         while($row = mysqli_fetch_row($result)) {
          $row[2]=$estatus3[$row[2]]; 
           fputcsv($stream, $row, $delimiter);
           $nrows++;
           }
         mysqli_free_result($result);
         return $nrows;
         }       
?>