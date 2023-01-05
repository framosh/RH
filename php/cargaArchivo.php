<?php
if (isset($_FILES['myFile'])) {
    $archivo = "../cvs/".$_FILES["myFile"]['name'];
    $temporal = $_FILES['myFile']['tmp_name'];
    $tipo= $_FILES['myFile']['type'];
    $tamanio = $_FILES['myFile']['size'];
    $error = $_FILES['myFile']['error'];

//    echo("Tamaño de archivo: ".$tamanio);

//    if($tipo == "file/pdf" or $tipo == "file/doc"){
  //      if($tamanio <= 512000){
            if($error == 0) {
                move_uploaded_file($temporal, $archivo);
//                $atributos2 = getimagesize($archivo);
//                $archivox ="Archivo cargado:".$archivo.": Atributos1:".$atributos2[0].":Atributos2:".$atributos2[1]; 
                $archivox ="Archivo cargado:".$archivo.": Tamaño:".$tamanio.": Tipo:".$tipo; 
                echo($archivox);
                exit;
            } else { echo("Error: ".$error);}
    //    } else { echo("Tamaño de archivo supera el limite de 500 kb.: (".($tamanio/1000).") kb.");}
    //} else { echo("Tipo de archivo diferente: ".$tipo);}
}
?>