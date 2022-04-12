<?php
//$Clave=$_GET["vacante"];
//    var archivo2 = archivo1 + "?solicitante=" + campos[0] + "&empresa=" + campos[1] + "&correo=" + campos[2] + 
//"&telefono=" + campos[3] + "&mensaje=" + campos[4] + "&tipo_servicio=" + campos[5];
echo("Entra a envio de correo de php");

$campos = array();
$campos[0]=$_GET["solicitante"];
$campos[1]=$_GET["empresa"];
$campos[2]=$_GET["correo"];
$campos[3]=$_GET["telefono"];
$campos[4]=$_GET["mensaje"];
$campos[5]=$_GET["tipo_servicio"];

for($i=0;$i<=5;$i++) {
	if($campos[$i]==null){
		$campos[$i]="";
	}
}

envia_correo();

function envia_correo(){
		$to = "soporte@arhsi.com.mx";
		$subjet = "Requerimiento de cliente";
		$message = nl2br("Solicitante: $campos[0]\n Empresa: $campos[1]\n  Correo: $campos[2]\n Telefono: $campos[3]\n  Mensaje: $campos[4]\n  Tipo Servicio: $campos[5]\n",false);
		$from = "federico.ramos@arhsi.com.mx";
		$header = "From:".$from;
		$header .= " MIME-Version: 1.0\r\n";
		$header .= "Content-type: text/html\r\n";
		$retval = mail($to,$subjet,$message,$header);
		if($retval == true){
			echo ("Gracias por contactarnos, pronto un ejecutivo se comunicara con usted");
			} else { echo ("Correo no enviado");}
		}
?>