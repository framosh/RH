// Mantenimiento a las preguntas asignadas por evaluación

function limpiaPantalla_eval() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    //    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("preguntasOM").selectedIndex = vacio1;
    document.getElementById("preguntasXC").selectedIndex = vacio1;
    document.getElementById("posicion").value = vacio;
    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = false;
    document.getElementById("mensaje_gral").value = vacio;
    document.getElementById("preguntasOM").disabled = false;
    document.getElementById("preguntasXC").disabled = false;
}

var clv_conocimiento;
var clv_tipo_eval;
var nom_conocimiento;

function determina_conocimiento() {
    clv_conocimiento = 0;
    clv_tipo_eval = 0;
    nom_conocimiento = "";

    var evaluacion = document.getElementById("evaluaciones").value;

    if (evaluacion == "Seleccione la evaluacion") {
        var aviso = "Por favor seleccione una evaluación";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    for (var i = 0; i < evaluaciones2.length; i++) {
        var nombre = evaluaciones2[i].split("|");
        var campo = nombre[1];
        if (campo == evaluacion) {
            clv_tipo_eval = nombre[0].trim();
            clv_conocimiento = nombre[2].trim();
            nom_conocimiento = nombre[3].trim();
            break;
        }
    }

    //    alert("Conocimiento: " + nom_conocimiento);

    document.getElementById("clv_eval").value = clv_tipo_eval;
    document.getElementById("conocimiento").value = nom_conocimiento;
    leePreguntasOM();
    leePreguntasXC();
    consultaPreguntasAsignadas();
}

var registra = false;
var baja = false;
var cambio = false;
var consulta = false;

function checaPermisos() {
    var tipoPermiso = dato4[4].split("-");
    var alta1 = tipoPermiso[0];
    var baja1 = tipoPermiso[1];
    var cambio1 = tipoPermiso[2];
    var consulta1 = tipoPermiso[3];

    if (alta1 == "1") {
        registra = true;
    }
    if (baja1 == "1") {
        baja = true;
    }
    if (cambio1 == "1") {
        cambio = true;
    }
    if (consulta1 == "1") {
        consulta = true;
    }
}

function deshabilita() {
    //    alert("Desabilita seleccion no utilizada");

    var preguntaOM = document.getElementById("preguntasOM").value;
    var preguntaXC = document.getElementById("preguntasXC").value;

    if (preguntaOM == "Seleccione la pregunta de opcion multiple") {
        document.getElementById("preguntasOM").disabled = true;
        document.getElementById("preguntasXC").disabled = false;
    }

    if (preguntaXC == "Seleccione la pregunta por complemento") {
        document.getElementById("preguntasOM").disabled = false;
        document.getElementById("preguntasXC").disabled = true;
    }
}

// Borra la pregunta seleccionada de la evaluación activa
function baja_pregunta() {
    //    alert("Entra a baja de registro");
    var evaluacion = document.getElementById("evaluaciones").value;
    var preguntaOM = document.getElementById("preguntasOM").value;
    var preguntaXC = document.getElementById("preguntasXC").value;

    //    var usuario2 = dato4[0];
    var aviso;
    var nombre, campo, i;

    if (evaluacion == "Seleccione la evaluacion") {
        aviso = "Por favor seleccione una evaluación";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    clv_tipo_eval = 0;
    for (i = 0; i < evaluaciones2.length; i++) {
        nombre = evaluaciones2[i].split("|");
        campo = nombre[1];
        if (campo == evaluacion) {
            clv_tipo_eval = nombre[0].trim();
            break;
        }
    }

    var clv_preguntaOM = 0;
    if (preguntaOM != "Seleccione la pregunta de opcion multiple") {
        for (i = 0; i < preguntasOM2.length; i++) {
            nombre = preguntasOM2[i].split("|");
            campo = nombre[1];
            if (campo == preguntaOM) {
                clv_preguntaOM = nombre[0].trim();
                break;
            }
        }
    }

    var clv_preguntaXC = 0;
    if (preguntaXC != "Seleccione la pregunta por complemento") {
        for (i = 0; i < preguntasXC2.length; i++) {
            nombre = preguntasXC2[i].split("|");
            campo = nombre[1];
            if (campo == preguntaXC) {
                clv_preguntaXC = nombre[0].trim();
                break;
            }
        }
    }

    var camposx22 = [];
    camposx22[0] = clv_tipo_eval;
    camposx22[1] = clv_preguntaXC;
    camposx22[2] = clv_preguntaOM;

    var camposx23 = camposx22.join("|");

    var archivo1 = servidor + "httpdocs/baja_PregXevaluacion.php";
    var archivo2 = archivo1 + "?Campos=" + camposx23;
    var xhttp;

    //    alert("archivo1: " + archivo1);

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
            document.getElementById("mensaje_gral").innerHTML = cadena;
            document.getElementById("preguntasOM").disabled = false;
            document.getElementById("preguntasXC").disabled = false;
            limpiaTabla();
            consultaPreguntasAsignadas();
        }
    };
}

var tipo_funcion = "";

function alta_pregunta() {
    var posicion = document.getElementById("posicion").value;

    if (posicion == null || posicion == "" || posicion == 0) {
        alert("Asigne una posicion de la pregunta dentro de la evaluación");
        return;
    }

    var cantidad = preguntas.length;

    for (var i = 0; i < cantidad; i++) {
        var renglon = preguntas[i].split("|");
        if (renglon[0] == posicion) {
            alert("La posicion ya existe, asigne otra");
            return;
        }
    }

    tipo_funcion = "alta";
    actualizaEvaluacion();
}

function actualiza() {
    tipo_funcion = "modifica";
    actualizaEvaluacion();
    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;
}


function actualizaEvaluacion() {
    //    alert("Alta o modifica registro");
    /*
        if (cambio == false || baja == false) {
            alert("No tiene permiso para modificar");
            return;
        }
    */
    var evaluacion = document.getElementById("evaluaciones").value;
    var preguntaOM = document.getElementById("preguntasOM").value;
    var preguntaXC = document.getElementById("preguntasXC").value;
    var posicion = document.getElementById("posicion").value;

    //    var usuario2 = dato4[0];
    var aviso;
    var nombre, campo, i;

    if (posicion == null || posicion == "" || posicion == 0) {
        alert("Asigne una posicion de la pregunta dentro de la evaluación");
        return;
    }

    if (evaluacion == "Seleccione la evaluacion") {
        aviso = "Por favor seleccione una evaluación";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    clv_tipo_eval = 0;
    clv_conocimiento = 0;
    for (i = 0; i < evaluaciones2.length; i++) {
        nombre = evaluaciones2[i].split("|");
        campo = nombre[1];
        if (campo == evaluacion) {
            clv_tipo_eval = nombre[0].trim();
            clv_conocimiento = nombre[2].trim();
            break;
        }
    }

    var clv_preguntaOM = 0;
    if (preguntaOM != "Seleccione la pregunta de opcion multiple") {
        for (i = 0; i < preguntasOM2.length; i++) {
            nombre = preguntasOM2[i].split("|");
            campo = nombre[1];
            if (campo == preguntaOM) {
                clv_preguntaOM = nombre[0].trim();
                break;
            }
        }
    } else {
        clv_preguntaXC = 0;
    }

    var clv_preguntaXC = 0;
    if (preguntaXC != "Seleccione la pregunta por complemento") {
        for (i = 0; i < preguntasXC2.length; i++) {
            nombre = preguntasXC2[i].split("|");
            campo = nombre[1];
            if (campo == preguntaXC) {
                clv_preguntaXC = nombre[0].trim();
                break;
            }
        }
    } else {
        clv_preguntaOM = 0;
    }
    //    alert("Tipo funcion: " + tipo_funcion);

    var camposx22 = [];

    camposx22[0] = clv_tipo_eval;
    camposx22[1] = clv_preguntaXC;
    camposx22[2] = clv_preguntaOM;
    camposx22[3] = posicion;

    var camposx23 = camposx22.join("|");

    var archivo1;

    if (tipo_funcion == "modifica") {
        archivo1 = servidor + "httpdocs/act_PregXevaluacion.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_preguntaXevaluacion.php";
    }

    var archivo2 = archivo1 + "?Campos=" + camposx23;
    var xhttp;

    //  alert("archivo2: " + archivo2);

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("cadena: " + cadena);
            var valorx1 = "";
            document.getElementById("mensaje_gral").innerHTML = cadena;
            document.getElementById("posicion").value = valorx1;
            document.getElementById("preguntasOM").disabled = false;
            document.getElementById("preguntasXC").disabled = false;
            consultaPreguntasAsignadas();
        }
    };
}

function consultaPreguntasAsignadas() {
    var aviso = "";
    //    document.getElementById("mensaje_gral").innerHTML = aviso;

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaAplicaciones.php";
    var archivo1 = servidor + "httpdocs/consultaPregAsignadas.php";
    var archivo2 = archivo1 + "?evaluacion=" + clv_tipo_eval;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //    alert("Cadena: " + cadena);

            if (cadena == "No hay Preguntas asignadas") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }

            //        document.getElementById("mensaje_permisos").innerHTML=cadena;
            //alert("cadena: " + cadena);
            var subtitulo = ["POSICION", "PREGUNTA POR COMPLEMENTO", "PREGUNTA DE OPCION MULTIPLE"];

            var aplicacion = cadena.split("\n");
            preguntas = aplicacion;
            var tablax1 = "tablax21";
            var cuerpox1 = "cuerpox21";
            var apli4 = 0;
            apli4 = aplicacion.length;
            apli4--;
            if (apli4 > 0) {
                quickReport(aplicacion, tablax1, cuerpox1, subtitulo);
            }
            renglones2 = apli4;
        }
    };
}

var preguntas = [];

var preguntasXC2 = [];

function leePreguntasXC() {
    //    alert("Carga catalogo de preguntas por complemento");
    //    limpiaPantalla_eval();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("preguntasXC").innerHTML = vacio;

    var archivo1 = servidor + "httpdocs/catalogo_PregXcomp.php";
    var archivo2 = archivo1 + "?Conocimiento=" + clv_conocimiento;
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
            //            alert("Registros: " + preguntas.length);

            for (var i = 0; i < preguntas.length; i++) {
                var campo = preguntas[i];
                if (campo != null && campo != "") {
                    preguntasXC2[i2] = campo.trim();
                    preguntasXC2[i2] = preguntasXC2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            preguntasXC2[i2] = "0|Seleccione la pregunta por complemento";
            var select = document.getElementById("preguntasXC");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = preguntasXC2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

var preguntasOM2 = [];

function leePreguntasOM() {
    //  alert("Carga catalogo de preguntas de opcion multiple");
    //  limpiaPantalla_eval();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("preguntasOM").innerHTML = vacio;

    var archivo1 = servidor + "httpdocs/catalogoPreg_om.php";
    var archivo2 = archivo1 + "?Conocimiento=" + clv_conocimiento;
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
                    preguntasOM2[i2] = campo.trim();
                    preguntasOM2[i2] = preguntasOM2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            preguntasOM2[i2] = "0|Seleccione la pregunta de opcion multiple";
            var select = document.getElementById("preguntasOM");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = preguntasOM2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}