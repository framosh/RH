var cand1 = [];
var cand_clv;
var cand_nom;

window.onload = function () {
    //    alert("Elige servidor");
    elige_servidor();
    //    limpiaPantallaEC();

    //    alert("Separa campos del URL");
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    var l = params.length;

    if (l <= 1) {
        alert("No hay candidato a mostrar");
        //        salir();
    } else {
        //      alert("Asigna campos del URL");
        for (var i = 0; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1].replace(/%20/g, " ");
            cand1[i] = data[tmp[0]];
            cand1[i] = cand1[i].trim();
            //        alert("cand1: " + cand1[i] + "  i: " + i);
        }
        cand_clv = cand1[0];
        //        cand_nom = cand1[1];
        //        var nombre_candidato = cand_clv + " - " + cand_nom;

        //       alert("Candidato: (" + cand_clv + ")");

        document.getElementById("nombre").innerHTML = nombre_candidato;
        setTimeout(consultaCandidato(cand_clv), 3000);
        setTimeout(consultaEdu(), 3000);
        setTimeout(consultaExp(), 3000);
        setTimeout(consultaConocimientos(cand_clv), 3000);
    }
};

// Mantenimiento al catalogo de evaluaciones
// Carga foto del candidato desde un archivo local
function despliega_foto(foto_url) {
    var foto2 = "../img/sin_foto.jpg";
    var preview;

    if (foto_url.length > 1) {
        preview = document.querySelector(".display_image");
        preview.src = foto_url;

    } else {
        preview = document.querySelector(".display_image");
        preview.src = foto2;
    }
}

function carga_imagen() {
    var preview = document.querySelector(".display_image");
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        fileUpload(file);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

var foto_dir;
var foto_nom;
var ancho;
var alto;

function fileUpload(img) {
    elige_servidor();
    var xhttp;
    ancho = 0;
    alto = 0;


    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var archivo2 = servidor + "httpdocs/cargaFoto.php";
    var fd = new FormData();

    xhttp.open("POST", archivo2, true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            //       alert("Cadena: " + cadena);
            var cadena1 = cadena.split("\n");
            var cadena2 = cadena1[1].split(":");

            foto_dir = "";

            if (cadena2[0] == "Tamaño de archivo supera el limite de 1 mb.") {
                alert("La imagen supera el megabyte de tamaño, elija otra imagen: " + cadena2[1]);
                return;
            }
            if (cadena2[0] == "Error") {
                alert("Error en carga de imagen");
                return;
            }

            if (cadena2[0] == "Tipo de archivo diferente") {
                alert("Error en tipo de imagen");
                return;
            }

            var nombre = cadena1[1].split(":");
            foto_dir = nombre[1];
            var ancho1 = cadena1[2].split(":");
            ancho = ancho1[1];
            var alto1 = cadena1[3].split(":");
            alto = alto1[1];

            if (alto > 1200 || ancho > 1600) {
                var preview = document.querySelector(".display_image");
                preview.className = "al-40";
            }

            document.getElementById("mensaje_imagen").value = cadena;
        } else {
            //                  alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };

    fd.append('myFile', img);
    xhttp.send(fd);
}



function limpiaPantalla_preg() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    alto = 0;
    ancho = 0;

    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);

    //    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("preguntas").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clave").value = vacio;
    document.getElementById("descripcion").value = vacio;
    document.getElementById("resp1").value = vacio;
    document.getElementById("resp2").value = vacio;
    document.getElementById("resp3").value = vacio;
    document.getElementById("resp4").value = vacio;
    document.getElementById("resp5").value = vacio;
    document.getElementById("solucion1").value = vacio;
    document.getElementById("solucion2").value = vacio;

    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = false;

    document.getElementById("mensaje_gral").innerHTML = vacio;
}

function nuevaPregunta() {
    limpiaPantalla_preg();
}

var tipo_funcion = "";

// Registro de conocimientos por candidato
function modificaPregunta() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;

    var conocimiento = document.getElementById("conocimientos").value;
    var nombre = document.getElementById("nombre").value;
    var pregunta_clv = document.getElementById("clave").value;
    var descripcion = document.getElementById("descripcion").value;
    var respuesta1 = document.getElementById("resp1").value;
    var respuesta2 = document.getElementById("resp2").value;
    var respuesta3 = document.getElementById("resp3").value;
    var respuesta4 = document.getElementById("resp4").value;
    var respuesta5 = document.getElementById("resp5").value;
    var solucion1 = document.getElementById("solucion1").value;
    var solucion2 = document.getElementById("solucion2").value;
    descripcion = descripcion.replace(/\n/g, "\\n");

    if ((solucion1 == 0 || solucion1 == null) && (solucion2 == 0 || solucion2 == null)) {
        alert("Asigne el renglon de la solucion correspondiente");
        return;
    }


    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];


    if (foto_dir == null) {
        foto_dir = "";
    }

    var camposx22 = [];
    camposx22[0] = pregunta_clv;
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = respuesta3;
    camposx22[6] = respuesta4;
    camposx22[7] = respuesta5;
    camposx22[8] = conocimiento_clv;
    camposx22[9] = solucion1;
    camposx22[10] = solucion2;
    camposx22[11] = foto_dir;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    alert("Actualiza pregunta");
    alert("Datos: " + camposx23);
    archivo1 = servidor + "httpdocs/act_pregunta.php";

    var archivo2 = archivo1 + "?Campos=" + camposx23;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            //        alert("Cadena: " + cadena);
            document.getElementById("mensaje_gral").innerHTML = cadena;
        }
    };
}

var preguntas2 = [];

function cargaPreguntas(evaluacion) {
    limpiaPantalla_preg();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var conocimiento = document.getElementById("examen").value;

    var archivo1 = servidor + "httpdocs/preg_xEval.php";
    var archivo2 = archivo1 + "?evaluacion=" + evaluacion;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //            alert("Cadena del catalogo de conocimientos: " + cadena);
            var preguntas = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < preguntas.length; i++) {
                var campo = preguntas[i];
                if (campo != null && campo != "") {
                    preguntas2[i2] = campo.trim();
                    preguntas2[i2] = preguntas2[i2].split("|");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function consultaPregunta(pregunta_clv, tipo_preg) {
    //    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var archivo1 = servidor + "httpdocs/consultaPregunta.php";
    var archivo2 = archivo1 + "?clave=" + pregunta_clv + "&tipo_preg=" + tipo_preg;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            //          alert("cadena: " + cadena);

            var mensaje_cadena = cadena.split(":");
            if (mensaje_cadena[0] == "No hay Pregunta número") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }

            var ids = cadena.split("|");

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            document.getElementById("nombre").value = ids[1];
            document.getElementById("descripcion").value = ids[2];
            document.getElementById("resp1").value = ids[5];
            document.getElementById("resp2").value = ids[6];
            document.getElementById("resp3").value = ids[7];
            document.getElementById("resp4").value = ids[8];
            document.getElementById("resp5").value = ids[9];
            document.getElementById("solucion1").value = ids[10];
            document.getElementById("solucion2").value = ids[11];
            despliega_foto(ids[12]);
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function consultaCandidato(cand_clv) {
    //  alert("Consulta Candidato: (" + cand_clv + ")");

    var archivo1 = servidor + "httpdocs/consCandNom.php";
    var archivo2 = archivo1 + "?candidato=" + cand_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //   alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);

            if (cadena == "No existe el Candidato") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }

            var ids = cadena.split("|");
            for (var i1 = 0; i1 < ids.length; i1++) {
                if (ids[i1] == null) {
                    ids[i1] = "";
                }
                var campo = ids[i1];
                if (campo != null && campo != "") {
                    ids[i1] = ids[i1].replace(/\"/g, "");
                    ids[i1] = ids[i1].trim();
                    //           alert("campo: ("+i1+") - ("+ids[i1]+")");
                }
            }

            document.getElementById("nombre").innerHTML = ids[0];
        }
    };
    //    xhttp.disabled();
}