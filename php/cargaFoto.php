
<?php
if (isset($_FILES['myFile'])) {
    $archivo = "../img/".$_FILES["myFile"]['name'];
    $temporal = $_FILES['myFile']['tmp_name'];
    $tipo= $_FILES['myFile']['type'];
    $tamanio = $_FILES['myFile']['size'];
    $error = $_FILES['myFile']['error'];

//    echo("Tamaño de archivo: ".$tamanio);

    if($tipo == "image/jpg" or $tipo == "image/png" or $tipo == "image/gif" or $tipo == "image/jpeg"){
        if($tamanio <= 1000000){
            if($error == 0) {
                move_uploaded_file($temporal, $archivo);
                $atributos2 = getimagesize($archivo);
                $archivox ="Archo cargado:".$archivo.": Atributos1:".$atributos2[0].":Atributos2:".$atributos2[1]; 
                echo($archivox);
                exit;
            } else { echo("Error: ".$error);}
        } else { echo("Tamaño de archivo supera el limite de 1 mb.: (".($tamanio/1000).") kb.");}
    } else { echo("Tipo de archivo diferente: ".$tipo);}
}
?>