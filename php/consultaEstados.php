<?php 
require 'arhsi_connect.php';

$query="SELECT estadoclv FROM Estado WHERE 1";
$edo = mysqli_query($dbc,$query);
$filas = mysqli_affected_rows($edo);
if($filas >=32) {
//     echo "Catalogo de estados activo: $filas";
     mysqli_stmt_close($stmt);
    }
else
    {
     $query="DELETE FROM Estado WHERE estadoclv>=0";
     $edo = mysqli_query($dbc,$query);
     $row = mysqli_fetch_row($edo);
   
    $estados=32;
    $nestado1=array("Baja California Norte","Baja California Sur","Sonora","Chihuahua","Sinaloa","Coahuila","Nuevo Leon","Tamaulipas","Durango","Zacatecas","San Luis Potos�","Nayarit","Jalisco","Colima","Aguascalientes","Guanajuato","Hidalgo","Veracruz","Michoacan","Guerrero","Estado de Mexico","Distrito Federal","Tlaxcala","Queretaro","Puebla","Morelos","Oaxaca","Chiapas","Tabasco","Campeche","Quintana Roo","Yucatan");

    for($i=0;$i<=$estados;$i++) {
       if(mysqli_stmt_prepare($stmt,"INSERT INTO Estado (estadoclv,nombre) VALUES (?,?)"))
  	  {
	  mysqli_stmt_bind_param($stmt,"ss",$i,$nestado1[$i]);
	  if(mysqli_stmt_execute($stmt)) {
// 		echo "Estado grabado:$nestado1[$i] <br>";
		} else { 
                       echo "<br>Fallo la grabacion de: $nestado1[$i]<br>";
                       }		
	  }
     }
    mysqli_stmt_close($stmt);
  }

$query="SELECT * FROM Estado WHERE 1 ORDER BY estadoclv";
$result = mysqli_query($dbc,$query);

Archivo($result);

function Archivo($result) {
    return creArchivo('php://output',$result);
}

function creArchivo($filename,$result) {
    $fp = fopen($filename, 'w');
    $rc = llenaDatos($fp, $result);
    fclose($fp);
    mysqli_close($dbc);
    return $rc;
}


function llenaDatos($stream, $result) {
    $nrows = 0;
    $delimiter=chr(124);
    $enclosure=chr(34);

    while($row = mysqli_fetch_row($result)){
      fputcsv($stream, $row, $delimiter);
      $nrows++;
      }
    mysqli_free_result($result);
    return $nrows;
    }
?>