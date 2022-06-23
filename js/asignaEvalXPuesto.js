function nuevoPuesto() {
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("puestos").selectedIndex = vacio1;
    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("observacion").value = vacio;
    document.getElementById("asigna").disabled = false;
    document.getElementById("actualiza").disabled = false;
}

function limpiaPantalla_eval() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("clave").value = vacio;
    document.getElementById("observacion").value = vacio;
    document.getElementById("asigna").disabled = false;
    document.getElementById("actualiza").disabled = false;
}

function borraAsignacion() {
    alert("Borra asignacion");
    var vacio = "";
    document.getElementById("mensaje_gral").value = vacio;

    var evaluacion = document.getElementById("evaluaciones").value;
    var puesto = document.getElementById("puestos").value;

    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var clavex22 = [];
    var renglones = puestos2.length;
    renglones--;
    var posicion21 = document.getElementById("puestos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = puestos2[posicion21].split("|");
    var puesto_clv = clavex22[0];

    if (evaluacion == "Seleccione la Evaluacion") {
        alert("Seleccione la Evaluación");
        return;
    }

    renglones = evaluaciones2.length;
    renglones--;
    var posicion22 = document.getElementById("evaluaciones").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = evaluaciones2[posicion22].split("|");
    var evaluacion_clv = clavex22[0];

    evaluacion_clv = document.getElementById("clave").value;
    if (evaluacion_clv == null) {
        evaluacion_clv = 0;
        alert("No hay evaluación seleccionada");
        return;
    }

    var camposx22 = [];

    camposx22[0] = puesto_clv;
    camposx22[1] = evaluacion_clv;

    var camposx23 = camposx22.join("|");

    var archivo1 = servidor + "httpdocs/baja_AsignacionEval.php";
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
            var valor = cadena.split(":");
            if (valor[0] == "Asignacion borrada del puesto") {
                document.getElementById("asigna").disabled = true;
                document.getElementById("actualiza").disabled = false;
                evalXpuesto(puesto_clv);
            }
        }
    };
}

var tipo_funcion = "";

function asignaEval() {
    tipo_funcion = "alta";
    modificaEval();
}

function actualizaEval() {
    tipo_funcion = "actualiza";
    modificaEval();
}


// Registro de conocimientos por candidato
function modificaEval() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;

    var evaluacion = document.getElementById("evaluaciones").value;
    var observacion = document.getElementById("observacion").value;
    var puesto = document.getElementById("puestos").value;

    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var clavex22 = [];
    var renglones = puestos2.length;
    renglones--;
    var posicion21 = document.getElementById("puestos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = puestos2[posicion21].split("|");
    var puesto_clv = clavex22[0];

    if (evaluacion == "Seleccione la Evaluacion") {
        alert("Seleccione la Evaluación");
        return;
    }

    renglones = evaluaciones2.length;
    renglones--;
    var posicion22 = document.getElementById("evaluaciones").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = evaluaciones2[posicion22].split("|");
    var evaluacion_clv = clavex22[0];

    evaluacion_clv = document.getElementById("clave").value;
    if (evaluacion_clv == null) {
        evaluacion_clv = 0;
        alert("No hay evaluación seleccionada");
        return;
    }

    var camposx22 = [];

    camposx22[0] = puesto_clv;
    camposx22[1] = evaluacion_clv;
    camposx22[2] = observacion;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    if (tipo_funcion == "actualiza") {
        archivo1 = servidor + "httpdocs/act_evalXpuesto.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_evalXpuesto.php";
    }

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
            if (tipo_funcion == "alta") {
                var valor = cadena.split(":");
                if (valor[0] == "Asignación grabada puesto") {
                    document.getElementById("asigna").disabled = true;
                    document.getElementById("actualiza").disabled = false;
                    evalXpuesto(puesto_clv);
                }
            }
        }
    };
}

function consultaEval() {
    //    alert("Consulta Conocimiento");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var puesto = document.getElementById("puestos").value;

    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var clavex22 = [];
    var renglones = puestos2.length;
    renglones--;
    var posicion21 = document.getElementById("puestos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = puestos2[posicion21].split("|");
    var puesto_clv = clavex22[0];

    var evaluacion = document.getElementById("evaluaciones").value;

    if (evaluacion == "Seleccione la evaluacion") {
        alert("Seleccione la evaluacion");
        return;
    }

    renglones = evaluaciones2.length;
    renglones--;
    var posicion22 = document.getElementById("evaluaciones").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = evaluaciones2[posicion22].split("|");
    var evaluacion_clv = clavex22[0];

    document.getElementById("clave").value = evaluacion_clv;

    var archivo1 = servidor + "httpdocs/consultaEvalXPuesto.php";
    var archivo2 = archivo1 + "?evaluacion=" + evaluacion_clv + "&puesto=" + puesto_clv;
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
            var mensaje_cadena = cadena.split(":");
            //          alert("Cadena: " + cadena);
            if (mensaje_cadena[0] == "No existe la evaluacion") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                document.getElementById("asigna").disabled = false;
                document.getElementById("actualiza").disabled = true;
                var vacio2 = "";
                document.getElementById("observacion").value = vacio2;
                //                limpiaPantalla_eval();
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

            document.getElementById("observacion").value = ids[0];
            document.getElementById("asigna").disabled = true;
            document.getElementById("actualiza").disabled = false;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}


function cargaEvaluaciones() {
    //    alert("Entra a carga de evaluaciones del puesto");
    var puesto = document.getElementById("puestos").value;

    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var clavex22 = [];
    var renglones = puestos2.length;
    renglones--;
    var posicion21 = document.getElementById("puestos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = puestos2[posicion21].split("|");
    var puesto_clv = clavex22[0];
    evalXpuesto(puesto_clv);
}