<?php 
$encoding = "utf-8";
$candidato=$_GET['can'];

require 'arhsi_connect.php';
$query="SELECT cand_nom, cand_corr FROM Candidatos WHERE cand_key='$candidato'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    $cand_nombre = 
    $row = mysqli_fetch_row($result);
    $nombre = $row[0];
    $correo = $row[1];
    mysqli_free_result($result);
//    Archivo($result);
    valida_examenes($candidato,$nombre,$correo);
} else {
    echo("No existe el Candidato: ".$candidato);
}

function valida_examenes($candidato,$nombre,$correo){
    $estatus="1";
    require 'arhsi_connect.php';

    $query="SELECT * FROM Eval_xcand WHERE cand_key='$candidato' AND estatus_eval='$estatus'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    envia_correo($nombre,$correo);
    } else {
        echo("No hay examenes asignados para el candidato: ".$candidato);
    }
}

function envia_correo($nombre,$correo){
    $to = "contacto@arhsi.com.mx";
    $copia="federicoramos57@gmail.com";
    $subjet = "Aplicación de examenes";
//    $attach = $cand_cv;
    $message = nl2br("Candidato: $nombre\n   Correo: $correo\n   Favor de ingresar a la siguiente liga para aplicar los examenes para la vacante de referencia: \n https://admonarh.arhsi.com.mx/evaluaciones.htm",false);
    $from = "federico.ramos@arhsi.com.mx";
    $headers = "MIME-Version: 1.0"."\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1"."\r\n";
    $headers .= "From:".$from."\r\n";
    $headers .= "Bcc:".$copia."\r\n";
    $retval = mail($to,$subjet,$message,$headers);
    if($retval == true){
        echo "Correo enviado al candidato: ".$nombre;
        } else { echo "Correo no enviado al candidato: ".$nombre;}
}

mysqli_close($dbc);
?>