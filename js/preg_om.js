// Mantenimiento al catalogo de evaluaciones
/* LANZA REPORTE EN PANTALLA */
function rep_Pantalla() {
    //    alert("Despliega reporte por pantalla");
    /*
    var puesto = document.getElementById("puestos").value;

    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var renglones = puestos2.length;
    renglones--;
    var posicion22 = document.getElementById("puestos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = puestos2[posicion22].split("|");
    var puesto_clv = clavex22[0];

    window.location.href = "httpdocs/rdva3_Evaluaciones.php?Puesto=" + puesto_clv;
    */
}

/* LANZA REPORTE EN EXCEL */
function rep_Excel() {
    //    alert("Despliega reporte por Excel");
    /*
    var puesto = document.getElementById("puestos").value;

    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var renglones = puestos2.length;
    renglones--;
    var posicion22 = document.getElementById("puestos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = puestos2[posicion22].split("|");
    var puesto_clv = clavex22[0];

    window.location.href = "httpdocs/sp_Evaluaciones.php?Puesto=" + puesto_clv;
*/
}

function limpiaPantalla_preg() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("preguntas").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clave").value = vacio;
    document.getElementById("descripcion").innerHTML = vacio;
    document.getElementById("resp1").value = vacio;
    document.getElementById("resp2").value = vacio;
    document.getElementById("resp3").value = vacio;
    document.getElementById("resp4").value = vacio;
    document.getElementById("resp5").value = vacio;
    document.getElementById("solucion").value = vacio1;

    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = false;
}

function nuevaPregunta() {
    limpiaPantalla_preg();
}

var tipo_funcion = "";

function altaPregunta() {
    tipo_funcion = "alta";
    modificaPregunta();

    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;
}

function actualizaPregunta() {
    tipo_funcion = "modifica";
    modificaPregunta();
    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;
}


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
    var solucion = document.getElementById("solucion").value;

    if (solucion == 0 || solucion == null) {
        alert("Asigne la renglon de la solucion correspondiente");
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

    if (tipo_funcion == "alta") {
        if (nombre == "") {
            alert("Ponga el nombre de la pregunta");
            return;
        }

        if (descripcion == "") {
            alert("Ponga la descripción");
            return;
        }
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
    camposx22[9] = solucion;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    if (tipo_funcion == "modifica") {
        archivo1 = servidor + "httpdocs/act_pregunta.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_pregunta.php";
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
                if (valor[0] == "Nueva pregunta") {
                    document.getElementById("clave").value = valor[1];
                }
            }
        }
    };
}

var preguntas2 = [];

function leePreguntas() {
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

    var archivo1 = servidor + "httpdocs/catalogoPreguntas.php";
    var archivo2 = archivo1 + "?Conocimiento=" + conocimiento_clv;
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

function consultaPregunta() {
    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;

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
    alert("posicion22: " + posicion22);

    var clavex22 = preguntas2[posicion22].split("|");
    var pregunta_clv = clavex22[0];

    alert("renglones: " + renglones);
    alert("pregunta_clv: " + pregunta_clv);
    alert("preguntas2: " + preguntas2[posicion23]);

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
            document.getElementById("solucion").value = ids[10];

            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;

        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}