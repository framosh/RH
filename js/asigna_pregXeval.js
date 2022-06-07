// Mantenimiento a las preguntas asignadas por evaluación

function limpiaPantalla_eval() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("preguntasOM").selectedIndex = vacio1;
    document.getElementById("preguntasXC").selectedIndex = vacio1;
    document.getElementById("posicion").value = vacio;
    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = false;
    document.getElementById("mensaje_gral").value = vacio;
}

var clv_conocimiento;

function determina_conocimiento() {
    clv_conocimiento = 0;
    clv_evaluacion = 0;

    var evaluacion = document.getElementById("evaluaciones").value;

    if (evaluacion == "Seleccione la evaluacion") {
        aviso = "Por favor seleccione una evaluación";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    for (i = 0; i < evaluaciones2.length; i++) {
        nombre = evaluaciones2[i].split("|");
        campo = nombre[1];
        if (campo == evaluacion) {
            clv_evaluacion = nombre[0].trim();
            clv_conocimiento = nombre[2].trim();
            break;
        }
    }

    document.getElementById("clv_eval").value = clv_evaluacion;
}

function actualizaEvaluacion() {
    if (cambio == false || baja == false) {
        alert("No tiene permiso para modificar");
        return;
    }

    var evaluacion = document.getElementById("evaluaciones").value;
    var preguntaOM = document.getElementById("preguntasOM").value;
    var preguntaXC = document.getElementById("preguntasXC").value;
    var posicion = document.getElementById("posicion").value;

    var usuario2 = dato4[0];
    var aviso;
    var nombre, campo, i;

    if (evaluacion == "Seleccione la evaluacion") {
        aviso = "Por favor seleccione una evaluación";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    clv_evaluacion = 0;
    clv_conocimiento = 0;
    for (i = 0; i < evaluaciones2.length; i++) {
        nombre = evaluaciones2[i].split("|");
        campo = nombre[1];
        if (campo == evaluacion) {
            clv_evaluacion = nombre[0].trim();
            clv_conocimiento = nombre[2].trim();
            break;
        }
    }

    var clv_preguntaOM = 0;
    if (preguntaOM != "Seleccione la pregunta de opcion multiple") {
        for (i = 0; i < preguntasOM2.length; i++) {
            nombre = puesto2[i].split("|");
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
            nombre = puesto2[i].split("|");
            campo = nombre[1];
            if (campo == preguntaOM) {
                clv_preguntaXC = nombre[0].trim();
                break;
            }
        }
    }


    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_AplicacionEst.php";
    var archivo1 = servidor + "httpdocs/act_PregXevaluacion.php";
    var archivo2 = archivo1 + "?eval=" + clv_evaluacion + "&pom=" + clv_preguntaOM + "&pxc=" + clv_preguntaXC + "&posicion=" + posicion;
    var xhttp;

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
            document.getElementById("mensaje_permisos").innerHTML = cadena;
            consultaApliAsignadas();
        }
    };
}

var preguntasXC2 = [];

function leePreguntasXC() {
    limpiaPantalla_preg();

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
    limpiaPantalla_preg();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("preguntas").innerHTML = vacio;

    var archivo1 = servidor + "httpdocs/catalogoPreguntas.php";
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