<?php
$estatus_vac=["","Activa","Cerrada","Cancelada"];
$nivel=["","Sr.","Medio","Jr."];

$estatus = 1;
$estatus2 ="(Vacantes.Estatus='$estatus')";
$consulta =$estatus2;

setlocale(LC_ALL,"es_ES");
setlocale(LC_MONETARY,'en_US');

require 'arhsi_connect.php';

$query="SELECT Vacantes.clv_vacante, Puestos.puesto_desc, Vacantes.Nivel,Vacantes.func2,Vacantes.req2, Vacantes.vac_sdo1, Vacantes.vac_sdo2,Vacantes.horario, Vacantes.Lugar,Vacantes.obs2 FROM Vacantes 
LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
WHERE $consulta ORDER BY Vacantes.clv_vacante DESC";

/*
$query="SELECT Vacantes.clv_vacante, Puestos.puesto_desc, Vacantes.Nivel,Vacantes.Funciones FROM Vacantes 
LEFT JOIN Puestos ON Puestos.clv_puesto = Vacantes.clv_puesto
WHERE $consulta ORDER BY Vacantes.clv_vacante DESC";
*/
$result=mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);
    $rc = 0;

    if($numero_filas>0) { 
    while($row = mysqli_fetch_array($result)) {
//        $row[3] = str_replace("\n","\\n",$row[3]);
        $nivel2 = $nivel[$row[2]];
        $response[$rc]['datos1']=$row[0];
        $response[$rc]['datos2']=$row[1];
        $response[$rc]['datos3']=$nivel2;
        $response[$rc]['datos4']=$row[3];
        $response[$rc]['datos5']=$row[4];
        $response[$rc]['datos6']=$row[5];
        $response[$rc]['datos7']=$row[6];
        $response[$rc]['datos8']=$row[7];
        $response[$rc]['datos9']=$row[8];
        $response[$rc]['datos10']=$row[9];
        $rc++;
        }
    }

  //      $response[$rc]['datos5']=$row[4];
    //    $response[$rc]['datos6']=$row[5];
      //  $response[$rc]['datos7']=$row[6];
        //$response[$rc]['datos8']=$row[7];
//        $response[$rc]['datos9']=$row[8];
  //      $response[$rc]['datos10']=$row[9];


if($rc==0) {
    $response[0]['error']=true;
    $response[0]['message']="No hay Vacantes";
    $response[0]['datos1']="sin datos";
    $response[0]['datos2']="sin datos";
    $response[0]['datos3']="sin datos";
    $response[0]['datos4']="sin datos";
    } else {
         $response[0]['error']=false;
         $response[0]['message']="Familias encontradas ";
//		     $response['datos']=$rc;
        }

header('Content-Type: application/json');
echo json_encode($response);
mysqli_close($dbc);
?>