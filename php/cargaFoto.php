
<?php
if (isset($_FILES['myFile'])) {
    $archivo = "../img/".$_FILES["myFile"]['name'];
    $temporal = $_FILES['myFile']['tmp_name'];
    $tipo= $_FILES['myFile']['type'];
    $tamanio = $_FILES['myFile']['size'];
    $error = $_FILES['myFile']['error'];

//    echo("Tamaño de archivo: ".$tamanio);

    if($tipo == "image/jpg" or $tipo == "image/png" or $tipo == "image/gif" or $tipo == "image/jpeg"){
        if($tamanio <= 60000){
            if($error == 0) {
                move_uploaded_file($temporal, $archivo);
                echo("Se sube el archivo: ".$archivo);
                exit;
            } else { echo("Error: ".$error);}
        } else { echo("Tamaño de archivo supera el limite de 60 kb.: (".($tamanio/1000).") kb.");}
    } else { echo("Tipo de archivo diferente: ".$tipo);}
}
?>