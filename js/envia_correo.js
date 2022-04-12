/* este programa debe quedar guardado en https://arhsi.com.mx/httpdocs/progjs
la parte de php debe quedar guardada en https://arhsi.com.mx/httpdocs
*/
function envia_correo() {
    alert("Envia Correo 3");
    //    var camposx55 = new Array(7);
    var camposx55 = [];

    camposx55[0] = document.getElementById("Nombre").value;
    camposx55[1] = document.getElementById("Empresa").value;
    camposx55[2] = document.getElementById("correo").value;
    camposx55[3] = document.getElementById("Telefono").value;
    camposx55[4] = document.getElementById("Comentarios").value;
    camposx55[5] = document.getElementById("Producto").value;

    alert("Paso x1");

    for (var i = 0; i < camposx55.length; i++) {
        if (camposx55[i] == null) {
            camposx55[i] = "";
        }
    }

    alert("Paso x2");

    for (var i1 = 0; i1 < camposx55.length; i1++) {
        if (camposx55[i1] == "") {
            alert("Debe llenar todos los campos, por favor");
            return;
        }
    }

    alert("Paso x3");

    var servidor1 = "https://www.arhsi.com.mx/httpdocs/envia_correo.php";
    var actual_url;
    actual_url = window.location.href;
    alert("Actual Url: " + actual_url);

    //    var servidor1 = "httpdocs/envia_correo.php";
    //    var servidor1 = "../envia_correo.php";
    var archivo1 = servidor1;
    var archivo2 = archivo1 + "?solicitante=" + camposx55[0] + "&empresa=" + camposx55[1] + "&correo=" + camposx55[2] + "&telefono=" + camposx55[3] + "&mensaje=" + camposx55[4] + "&tipo_servicio=" + camposx55[5];
    var xhttp;

    alert("archivo2: " + archivo2);

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
        alert("Paso 1");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert("Paso 2");
            var cadena = xhttp.responseText;
            //            document.getElementById("mensaje_enviado").textContent = cadena;
            alert("Cadena:" + cadena);
        } else {
            alert("No puede conectarse al servidor remoto");
        }
    };
    xhttp.open("GET", archivo2, true);
    xhttp.send();
    alert("Revisar correos");
}