<?php
if (isset($_FILES['myFile'])) {
    $archivo = "../cvs/".$_FILES["myFile"]['name'];
    $temporal = $_FILES['myFile']['tmp_name'];
    $tipo= $_FILES['myFile']['type'];
    $tamanio = $_FILES['myFile']['size'];
    $error = $_FILES['myFile']['error'];

    if($tipo == "application/pdf" || $tipo == "application/doc"){
        if($tamanio <= 250000){
            if($error == 0) {
                move_uploaded_file($temporal, $archivo);
                $archivox ="Archivo cargado:".$archivo.": Tamaño:".$tamanio.": Tipo:".$tipo; 
                echo($archivox);
//                exit;
            } else { echo("Error: ".$error);}
        } else { echo("Tamaño de archivo supera el limite de 250 kb.: (".($tamanio/1000).") kb.");}
    } else { echo("Tipo de archivo diferente: ".$archivo.": Tamaño:".$tamanio.": Tipo:".$tipo);}
}
?>