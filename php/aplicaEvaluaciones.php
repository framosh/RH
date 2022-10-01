<!DOCTYPE html>
<html lang="es">
<head>
<title>Envio de correos para aplicación de examenes remotos</title>
<meta charset="UTF-8">
</head>
<body style="background-color: #BDBDF0;">

<?php
setlocale(LC_ALL,"es_ES");
$encoding = "UTF-8";
$candidato=$_GET['can'];

require 'arhsi_connect.php';
$query="SELECT cand_nom, cand_corr FROM Candidatos WHERE cand_key='$candidato'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    $row = mysqli_fetch_row($result);
    $nombre = $row[0];
    $correo = $row[1];
    mysqli_free_result($result);
//    Archivo($result);
    valida_examenes($candidato,$nombre,$correo);
} else {
    echo("No existe el Candidato: ".$candidato);
}

// Se valida que haya examenes asignados al candidato
function valida_examenes($candidato,$nombre,$correo){
    $estatus="1";
    require 'arhsi_connect.php';

    $query="SELECT * FROM Eval_xcand WHERE cand_key='$candidato' AND estatus_eval='$estatus'";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
        //    crea_evaluacion($result);
    while($row = mysqli_fetch_row($result)) {
        $tipo_eval=$row[1];
        $evaluacion=$row[2];
        $mensaje="Tipo eval: ".$tipo_eval."  Evaluacion: ".$evaluacion."\n";
//        echo($mensaje);
        $query2="DELETE FROM preg_eval_cand WHERE clv_evaluacion = '$evaluacion'";
        $result2 = mysqli_query($dbc,$query2);

        alta_preguntas($tipo_eval, $evaluacion);
        }
    

    envia_correo($nombre,$correo);
    
    } else {
        echo("No hay examenes asignados para el candidato: ".$candidato);
    }
    mysqli_free_result($result);
    mysqli_close($dbc);
}

// Lee las preguntas del tipo de evaluacion seleccionado
function alta_preguntas($tipo_eval, $evaluacion){

    require 'arhsi_connect.php';
    $query="SELECT * FROM Preg_xeval WHERE clv_tipo_eval='$tipo_eval'";

    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);
    $campos = array();

    if($numero_filas >0){
        while($row = mysqli_fetch_row($result)) {    
            $tipo_pregunta="1";
            $pregunta=$row[1];
            $posicion=$row[3];
            if($pregunta == "0"){ 
                $pregunta = $row[2];
                $tipo_pregunta="2";
            }

            alta_pregunta_eval($evaluacion,$tipo_pregunta,$pregunta,$posicion);
            }
//          mysqli_free_result($result);
        }
}

// graba las preguntas seleccionadas para la nueva evaluación del candidato
function alta_pregunta_eval($evaluacion,$tipo_pregunta,$pregunta,$posicion){
    require 'arhsi_connect.php';

    $condicion="(clv_evaluacion='$evaluacion') AND (clv_tipo_preg='$tipo_pregunta') AND (clv_pregunta='$pregunta')";

    $query="SELECT * FROM preg_eval_cand WHERE ($condicion)";

    $result = mysqli_query($dbc,$query);
    $numero_filas = mysqli_num_rows($result);

    if($numero_filas >0){
//        echo("Ya existe la pregunta");
        return;
        }

    if(mysqli_stmt_prepare($stmt,"INSERT INTO preg_eval_cand (clv_evaluacion,clv_tipo_preg,clv_pregunta,posicion) 
VALUES (?,?,?,?)"))
	{
	mysqli_stmt_bind_param($stmt,"ssss",$evaluacion,$tipo_pregunta,$pregunta,$posicion);
	mysqli_stmt_execute($stmt);

	$affected_rows = mysqli_stmt_affected_rows($stmt);

	if($affected_rows ==1)
		{
//        $mensaje = "Pregunta asignada a evaluacion: ".$evaluacion."  pregunta:".$pregunta;
  //      echo $mensaje;
		} 
	else {
		echo("<br>Error de grabacion de preg_eval_cand: ".mysqli_error($dbc));
		}
	mysqli_stmt_close($stmt);
	}
else { echo "<br>Fallo apertura de DB en preg_eval_cand"; }
}

// Se le notifica al candidato sobre la evaluación y se le envia la liga
function envia_correo($nombre,$correo){
    global $candidato;
    setlocale(LC_ALL,"es_ES");

    $to = $correo;
    $copia="federicoramos57@gmail.com";
    $subjet = "Aplicación de examenes";
//    $attach = $cand_cv;
    $message = nl2br("Candidato: $nombre\n   Correo: $correo\n   Favor de ingresar a la siguiente liga para aplicar los examenes para la vacante de referencia: \n https://admonarh.arhsi.com.mx/evaluaciones.htm?cand=".$candidato."\n",false);
    $from = "federico.ramos@admonarh.arhsi.com.mx";
    $headers = "MIME-Version: 1.0"."\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8"."\r\n";
    $headers .= "From:".$from."\r\n";
    $headers .= "Bcc:".$copia."\r\n";
    $headers .= "X-Mailer: PHP/".phpversion();
    $retval = mail($to,$subjet,$message,$headers);
    if($retval == true){
        echo "Correo enviado al candidato: ".$nombre;
        } else { echo "Correo no enviado al candidato: ".$nombre;}
}

mysqli_close($dbc);
?>
</body>
</html>