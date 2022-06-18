// Mantenimiento al catalogo de evaluaciones
// Carga foto del candidato desde un archivo local
function despliega_foto(foto_url) {
    if (foto_url.length > 1) {
        var preview = document.querySelector(".display_image");
        preview.src = foto_url;

    } else {
        alert("No hay imagen de la pregunta");
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

/* LANZA REPORTE EN PANTALLA */
function rep_Pantalla() {
    //    alert("Despliega reporte por pantalla");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var conocimiento = document.getElementById("conocimientos").value;

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

    window.location.href = "httpdocs/rdva3_PreguntasOM.php?clave=" + conocimiento_clv + "&nombre=" + conocimiento;
}

/* LANZA REPORTE EN EXCEL */
function rep_Excel() {
    //    alert("Despliega reporte por Excel");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var conocimiento = document.getElementById("conocimientos").value;

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

    window.location.href = "httpdocs/sp_PreguntasOM.php?clave=" + conocimiento_clv + "&nombre=" + conocimiento;
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
    document.getElementById("resp1").value = vacio;
    document.getElementById("resp2").value = vacio;
    document.getElementById("calificacion").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
}

//Carga los candidatos asignados a la vacante
function cargaCandidatos() {

}

function nuevaPregunta() {
    limpiaPantalla_preg();
}

// Registro de conocimientos por candidato
function actualizaRespuesta() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;

    var respuesta = document.getElementById("respuestas").value;
    var evaluacion = document.getElementById("evaluaciones").value;
    var respuesta_clv = document.getElementById("clave").value;
    var calificacion = document.getElementById("calificacion").value;

    if (evaluacion == "Seleccione la evaluacion") {
        alert("Seleccione la evaluacion");
        return;
    }

    var clavex22 = [];
    var renglones = evaluaciones2.length;
    renglones--;
    var evaluacionx22 = document.getElementById("conocimientos").selectedIndex;
    evaluacionx22 = (renglones - evaluacionx22);
    clavex22 = evaluaciones2[evaluacionx22].split("|");
    var evaluacion_clv = clavex22[0];

    var camposx22 = [];

    camposx22[0] = evaluacion_clv;
    camposx22[1] = respuesta_clv;
    camposx22[2] = calificacion;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    archivo1 = servidor + "httpdocs/act_respuesta.php";

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

var respuestas2 = [];

function leeRespuestas() {
    limpiaPantalla_preg();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("respuestas").innerHTML = vacio;
    var evaluacion = document.getElementById("evaluaciones").value;

    if (evaluacion == "Seleccione la evaluacion") {
        alert("Seleccione la evaluacion");
        return;
    }

    var clavex22 = [];
    var renglones = evaluaciones2.length;
    renglones--;
    var evaluacionx22 = document.getElementById("evaluaciones").selectedIndex;
    evaluacionx22 = (renglones - evaluacionx22);
    clavex22 = evaluaciones2[evaluacionx22].split("|");
    var evaluacion_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/catalogoRespOM.php";
    var archivo2 = archivo1 + "?Evaluacion=" + evaluacion_clv;
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
            /*
            if (cadena == "0|No hay respuestas de opcion multiple") {
                alert("No hay respuestas de opcion multiple asignadas");
                return;
            }
            */
            //$query="SELECT Preg_xeval.clv_preg_om, Preg_om.nombre_pregom, Preg_xeval.clv_evaluacion, posicion 
            var respuestas = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < respuestas.length; i++) {
                var campo = respuestas[i];
                if (campo != null && campo != "") {
                    respuestas2[i2] = campo.trim();
                    respuestas2[i2] = respuestas2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            respuestas2[i2] = "0|Seleccione la Respuesta";
            var select = document.getElementById("respuestas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = respuestas2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function consultaPregunta() {
    //    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);

    var pregunta = document.getElementById("preguntas").value;

    if (pregunta == "Seleccione la Pregunta") {
        alert("Seleccione la Pregunta");
        return;
    }

    var renglones = preguntas2.length;
    renglones--;
    var posicion22 = document.getElementById("preguntas").selectedIndex;
    var posicion23 = posicion22;
    posicion22 = (renglones - posicion22);

    var clavex22 = preguntas2[posicion22].split("|");
    var pregunta_clv = clavex22[0];

    document.getElementById("clave").value = pregunta_clv;

    var archivo1 = servidor + "httpdocs/consultaPregunta.php";
    var archivo2 = archivo1 + "?clave=" + pregunta_clv;
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
            //          alert("Cadena: " + cadena);
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