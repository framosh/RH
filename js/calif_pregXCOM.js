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

            document.getElementById("mensaje_gral").value = cadena;
        } else {
            //                  alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };

    fd.append('myFile', img);
    xhttp.send(fd);
}

function nueva_vacante() {
    //    alert("Nueva vacante");
    var vacio = "";
    var vacio1 = 0;
    preguntas2 = [];
    evaluaciones2 = [];
    candidatos2 = [];

    //    document.getElementById("candidatos").selectedIndex = vacio1;
    document.getElementById("candidatos").innerHTML = vacio;
    document.getElementById("evaluaciones").innerHTML = vacio;
    document.getElementById("preguntas").innerHTML = vacio;

    document.getElementById("clave_cand").value = vacio;
    nuevo_candidato();
}

function nuevo_candidato() {
    var vacio = "";
    var vacio1 = 0;
    preguntas2 = [];
    evaluaciones2 = [];

    //    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("evaluaciones").innerHTML = vacio;
    document.getElementById("preguntas").innerHTML = vacio;
    document.getElementById("clave_eval").value = vacio;
    limpiaPantalla_preg();
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
    document.getElementById("clave_preg").value = vacio;
    document.getElementById("descripcion").value = vacio;
    document.getElementById("resp1").value = vacio;
    document.getElementById("calificacion").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
}

function cargaEvaluaciones() {
    //    alert("carga evaluaciones");
    var candidato = document.getElementById("candidatos").value;
    var aviso = "";
    document.getElementById("mensaje_gral").innerHTML = aviso;
    //    limpiaPantalla_preg(); // Limpia campos

    if (candidato == "Seleccione el Candidato") {
        aviso = "Por favor seleccione un Candidato";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var cand_nombre = "";
    var candidato_clv = "";

    for (var i = 0; i < candidatos2.length; i++) {
        var nombre = candidatos2[i].split("|");
        var campo = nombre[1];
        if (campo == candidato) {
            candidato_clv = nombre[0].trim();
            cand_nombre = nombre[1].trim();
            break;
        }
    }
    document.getElementById("clave_cand").value = candidato_clv;
    //    alert("Candidato: " + candidato_clv);
    evalXcandidato(candidato_clv);
}

var evaluaciones2 = [];

function evalXcandidato(candidato) {
    //    alert("carga evaluaciones X candidato: " + candidato);

    var archivo1 = servidor + "httpdocs/evalXcandidato.php";
    var archivo2 = archivo1 + "?candidato=" + candidato;
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
            //            alert("Cadena de evaluaciones: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var evaluacion = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < evaluacion.length; i++) {
                var campo = evaluacion[i];
                if (campo) {
                    evaluaciones2[i2] = campo.trim();
                    evaluaciones2[i2] = evaluaciones2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            evaluaciones2[i2] = "0|Seleccione la Evaluación";
            var select = document.getElementById("evaluaciones");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = evaluaciones2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

//Carga los candidatos asignados a la vacante
function cargaCandidatos() {
    //    alert("Carga Candidatos");
    nuevo_candidato();
    var vacante_clv = document.getElementById("vacantes").value;

    if (vacante_clv == "0-Seleccione una Vacante") {
        var aviso = "Por favor seleccione una Vacante";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var vacante = vacante_clv.split("-");
    var vacante_clv2 = vacante[0];
    document.getElementById("clave_vac").value = vacante_clv2;
    leeCandidatos(vacante_clv2);
}


// Registro de conocimientos por candidato
function actualizaRespuesta() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;

    var pregunta = document.getElementById("preguntas").value;
    var evaluacion = document.getElementById("evaluaciones").value;
    var pregunta_clv = document.getElementById("clave_preg").value;
    var calificacion = document.getElementById("calificacion").value;

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

    var camposx22 = [];

    camposx22[0] = evaluacion_clv;
    camposx22[1] = pregunta_clv;
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

var preguntas2 = [];

function leePreguntas() {
    limpiaPantalla_preg();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("preguntas").innerHTML = vacio;
    var candidato = document.getElementById("candidatos").value;
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

    if (candidato == "Seleccione el Candidato") {
        aviso = "Por favor seleccione un Candidato";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var cand_nombre = "";
    var candidato_clv = "";

    for (var i = 0; i < candidatos2.length; i++) {
        var nombre = candidatos2[i].split("|");
        var campo = nombre[1];
        if (campo == candidato) {
            candidato_clv = nombre[0].trim();
            cand_nombre = nombre[1].trim();
            break;
        }
    }

    document.getElementById("clave_eval").value = evaluacion_clv;

    var archivo1 = servidor + "httpdocs/catalogoRespCOM.php";
    var archivo2 = archivo1 + "?Evaluacion=" + evaluacion_clv + "&candidato=" + candidato_clv;
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
            //$query="SELECT Preg_xeval.clv_preg_om, Preg_om.nombre_pregom, Preg_xeval.clv_tipo_eval, posicion 
            var preguntas = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < preguntas.length; i++) {
                var campo = preguntas[i];
                if (campo != null && campo != "") {
                    preguntas2[i2] = campo.trim();
                    preguntas2[i2] = preguntas2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            preguntas2[i2] = "0|Seleccione la Pregunta";
            var select = document.getElementById("preguntas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = preguntas2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

// Siguiente pregunta a consultar
function siguiente() {
    var cantidad = preguntas2.length;
    if (cantidad == 0) {
        alert("No hay preguntas a visualizar");
        return;
    }

    var posicion22 = document.getElementById("preguntas").selectedIndex;
    posicion22++;

    if (posicion22 >= cantidad) {
        posicion22 = 1;
    }

    document.getElementById("preguntas").selectedIndex = posicion22;
    consultaPregunta();
}

// Anterior pregunta a consultar
function anterior() {
    var cantidad = preguntas2.length;
    if (cantidad == 0) {
        alert("No hay preguntas a visualizar");
        return;
    }

    var posicion22 = document.getElementById("preguntas").selectedIndex;
    posicion22--;

    if (posicion22 <= 0) {
        posicion22 = (cantidad - 1);
    }

    document.getElementById("preguntas").selectedIndex = posicion22;
    consultaPregunta();
}


function consultaPregunta() {
    //    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var clv_tipo_eval = document.getElementById("clave_eval").value;

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
    posicion22 = (renglones - posicion22);
    var clavex22 = preguntas2[posicion22].split("|");
    var pregunta_clv = clavex22[0];

    document.getElementById("clave_preg").value = pregunta_clv;

    var archivo1 = servidor + "httpdocs/consultaPregXCOMP.php";
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
            //            alert("cadena: " + cadena);

            var mensaje_cadena = cadena.split(":");
            if (mensaje_cadena[0] == "No hay Pregunta clave") {
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
            despliega_foto(ids[4]);
            consultaRespuesta(clv_tipo_eval, pregunta_clv);
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function consultaRespuesta(evaluacion, pregunta) {
    var archivo1 = servidor + "httpdocs/consultaRespOM.php";
    var archivo2 = archivo1 + "?pregunta=" + pregunta + "&evaluacion=" + evaluacion;
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
            //            alert("cadena: " + cadena);

            var mensaje_cadena = cadena.split(":");
            if (mensaje_cadena[0] == "No hay respuestas a pregunta") {
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

            document.getElementById("resp1").value = ids[0];
            document.getElementById("calificacion").value = ids[1];
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}