<?php
$response = array();
$usuario=$_POST["usuario"];
$clave=$_POST['clave'];
$serie=$_POST['serie'];

//$datos = file_get_contents("php://input");
//$result2=json_decode($datos, true);
//$usuario=$result2['usuario'];
//$clave=$result2['clave'];
//$serie=$result2['serie'];

$busca ="((usuarioclv='$usuario') AND (clave='$clave'))";

require 'svr_connect.php';
$query="SELECT usuarioclv, clave, nombre, nivel FROM Acceso 
WHERE $busca";

$result = mysqli_query($dbc,$query);

$rc = 0;
while($row = mysqli_fetch_row($result)) {
    $response[0]['error']=false;
    $response[0]['message']="Usuario confirmado";
    $response[$rc]['datos']=$row;
    $rc++;
    }

if($rc == 0) {
    $response[0]['error']=true;
    $response[0]['message']="No hay usuario: ".$usuario;
    $response[0]['datos']="sin datos";
    } 

mysqli_close($dbc);
header('Content-Type: application/json');
echo json_encode($response);
?>