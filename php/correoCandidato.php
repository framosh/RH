<?php 
$vacante=$_GET['vacante'];
$candidato=$_GET['candidato'];
$correo=$_GET['correo'];

/*
// Este modelo para enviar correos, funciona si se tiene instalado el Composer y el PHPMailer y 
// se conocen la direcciones para cargar las clases reuqeridas.conoce

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Clase Exception 
//require 'C:\Users\Federico\Documents\Arhsi\Admon\admonarh-2016\HeadHunting\vendor\phpmailer\phpmailer\src\Exception.php';
require 'class.Exception.php';

// Clase principal de PHPMailer 
//require 'C:\Users\Federico\Documents\Arhsi\Admon\admonarh-2016\HeadHunting\vendor\phpmailer\phpmailer\src\PHPMailer.php';
require 'class.PHPMailer.php';

// Clase SMTP, necesaria si quieres usar SMTP 
//require 'C:\Users\Federico\Documents\Arhsi\Admon\admonarh-2016\HeadHunting\vendor\phpmailer\phpmailer\src\SMTP.php';
require 'class.SMTP.php';

//require 'vendor/autoload.php';
$email = new PHPMailer();
//try {
    $email->isSMTP();
    $email->SMTPDebug =1;
    $email->Host = 'arhsi.com.mx';
    $email->SMTPAuth = true;
    $email->UserName = 'federico.ramos@arhsi.com.mx';
    $email->Password = 'sZih6#52';
    $email->SMTPSecure = 'TLS';
    $email->Port = 465;

    $email->setFrom ='federico.ramos@arhsi.com.mx';
    $email->isHTML(true);
    $email->Subject = "Test";
    $email->Body="Hola";
    $email->AddAddress("soporte@arhsi.com.mx");
//} catch (\Throwable $th) {
    //throw $th;
//}

if(!$email->Send()){
  $error_de_envio="Error de envio de correo".$mail->ErrorInfo;
echo ($error_de_envio);
} else {
  echo("Correo enviado");
}
*/

//Este modelo para enviar correos solo funciona para correos internos de la empresa

setlocale(LC_ALL,"es_ES");
require 'arhsi_connect.php';

$query="SELECT Vacantes.vac_desc, Vacantes.vac_sdo1, Vacantes.vac_sdo2, Empresa.emp_nom, 
Vacantes.Funciones, Vacantes.Requisitos, Vacantes.Lugar, Vacantes.horario, Vacantes.Observaciones 
FROM Vacantes 
LEFT JOIN Empresa ON Empresa.emp_clave = Vacantes.emp_clave 
WHERE (Vacantes.clv_vacante LIKE '$vacante')";

$result = mysqli_query($dbc,$query);
$numero_filas = mysqli_num_rows($result);

if($numero_filas >0){
    GeneraCoprreo($result);
    mysqli_close($dbc);
} else {
  $mensaje = "No se pudo engenerar el correo para: ".$candidato; 
    echo($mensaje);
    mysqli_close($dbc);
}

       function GeneraCoprreo($result) {
        global $candidato, $correo, $vacante;

        $row = mysqli_fetch_row($result);
        $row[4] = str_replace("\\n","<br>",$row[4]);
        $row[5] = str_replace("\\n","<br>",$row[5]);
        $row[8] = str_replace("\\n","<br>",$row[8]);

//          $row[5] = wordwrap($row[5],70,"\r\n");

$correo_soporte = "soporte@arhsi.com.mx";
$correo_send = "proyectosfrh@gmail.com";
$encabezado1 = "<b>Estimado Sr. </b>".$candidato."<br> <br> Le envío el detalle de la vacante, para cualquier duda quedo a sus órdenes: <br>";
$encabezado2 = "Por favor consulte la página web de la empresa para conocer mas sobre ella: https://www.power-street.com/"."<br><br>";

$cuerpo = $encabezado1.$encabezado2."<b>Requisitos:</b>" . "<br>" . $row[5] . "<br>" . "<br>" . "<b>Funciones: </b><br>" . $row[4] .
            "<br>" . "<br>" . "<b>Lugar de trabajo: </b>" . $row[6] .",  con horario: ".$row[7] .
            "<br>" . "<br><b> Observaciones: </b><br>" . $row[8] . "<br><br><br>";

          $to = $correo_soporte;
          $subjet = "Información de la vacante: ".$vacante;
//          $message = $cuerpo;
          $message = nl2br($cuerpo,false);
  //		  $message = wordwrap($message,70,"\r\n");
          $from = "federico.ramos@arhsi.com.mx";
          $header = "MIME-Version: 1.0"."\r\n";
          $header .= "Content-type: text/html; charset=utf-8"."\r\n";
          $header .= "From:".$from."\r\n".'X-Mailer: PHP/'.phpversion();
          $retval = mail($to,$subjet,$message,$header);

          if($retval == true){
              echo ("Correo enviado al candidato:".$candidato);
              } else { echo ("Correo no enviado al candidato:".$candidato);}

              mysqli_free_result($result);
            }
?>