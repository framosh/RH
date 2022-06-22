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

function limpiaPantalla_eval() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("candidatos").selectedIndex = vacio1;
    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("fecha").value = vacio;
    document.getElementById("hora").value = vacio;
    document.getElementById("calificacion").value = vacio1;
    document.getElementById("estatus").selectedIndex = vacio1;
    document.getElementById("observacion").value = vacio;
    document.getElementById("asigna").disabled = false;
    document.getElementById("actualiza").disabled = false;
}

function asignaEval() {
    limpiaPantalla_eval();
}

var tipo_funcion = "";

function actualizaEval() {
    tipo_funcion = "alta";
    modificaEval();
}

function actualizaEval() {
    tipo_funcion = "modifica";
    modificaEval();
    document.getElementById("asigna").disabled = true;
    document.getElementById("actualiza").disabled = false;
}


// Registro de conocimientos por candidato
function modificaEval() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;

    var candidato = document.getElementById("candidatos").value;
    var evaluacion = document.getElementById("evaluaciones").value;
    var estatus = document.getElementById("estatus").value;
    var observacion = document.getElementById("observacion").value;

    if (candidato == "Seleccione el Candidato") {
        alert("Seleccione el Candidato");
        return;
    }

    if (evaluacion == "Seleccione la Evaluacion") {
        alert("Seleccione la Evaluación");
        return;
    }

    if (estatus == "Seleccione el estatus") {
        alert("Seleccione el Estatus");
        return;
    }

    /*
       <option>Aplicar</option>
       <option>Aplicada</option>
       <option>Cancelada</option>
       <option>Abortada</option>
       <option>Reprobada</option>
       <option>Aprobada</option>
    */

    var estatus_valor;
    switch (estatus) {
        case "Aplicar":
            estatus_valor = 1;
            break;
        case "Aplicada":
            estatus_valor = 2;
            break;
        case "Cancelada":
            estatus_valor = 3;
            break;
        case "Abortada":
            estatus_valor = 4;
            break;
        case "Reprobada":
            estatus_valor = 5;
            break;
        case "Aprobada":
            estatus_valor = 6;
            break;
        default:
            estatus_valor = 0;
    }

    var camposx22 = [];

    var clavex22 = [];
    var renglones = candidatos2.length;
    renglones--;
    var posicion21 = document.getElementById("candidatos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = candidatos2[posicion21].split("|");
    var candidato_clv = clavex22[0];

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

    camposx22[0] = candidato_clv;
    camposx22[1] = evaluacion_clv;
    camposx22[2] = estatus;
    camposx22[3] = observacion;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    if (tipo_funcion == "modifica") {
        archivo1 = servidor + "httpdocs/act_evalXCand.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_evalXCand.php";
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
                if (valor[0] == "Asignada") {
                    var estatusx = 1;
                    document.getElementById("estatus").value = estatusx;
                    document.getElementById("asigna").disabled = true;
                    document.getElementById("actualiza").disabled = false;
                }
            }
        }
    };
}

function consultaEval() {
    //    alert("Consulta Conocimiento");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("asigna").disabled = true;
    document.getElementById("actualiza").disabled = false;

    var candidato = document.getElementById("candidatos").value;

    if (candidato == "Seleccione el Candidato") {
        alert("Seleccione el Candidato");
        return;
    }

    var clavex22 = [];
    var renglones = candidatos2.length;
    renglones--;
    var posicion21 = document.getElementById("candidatos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = candidatos2[posicion21].split("|");
    var candidato_clv = clavex22[0];

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

    var archivo1 = servidor + "httpdocs/consultaEvalXCand.php";
    var archivo2 = archivo1 + "?evaluacion=" + evaluacion_clv + "?candidato=" + candidato_clv;
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
            if (mensaje_cadena[0] == "No hay Evaluacion número") {
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

            var nivelx1 = ids[5];

            document.getElementById("fecha").value = ids[2];
            document.getElementById("hora").value = ids[3];
            document.getElementById("calificacion").value = ids[4];
            document.getElementById("estatus").selectedIndex = nivelx1;
            document.getElementById("observaciones").value = ids[6];

            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function cargaCandidatos() {
    var vacante = document.getElementById("vacantes").value;

    if (vacante == "0-Seleccione una Vacante") {
        alert("0-Seleccione una Vacante");
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];
    leeCandidatos(vacante_clv);
}

function cargaEvaluaciones() {
    var candidato = document.getElementById("candidatos").value;

    if (candidato == "Seleccione el Candidato") {
        alert("Seleccione el Candidato");
        return;
    }

    var clavex22 = [];
    var renglones = candidatos2.length;
    renglones--;
    var posicion21 = document.getElementById("candidatos").selectedIndex;
    posicion21 = (renglones - posicion21);
    clavex22 = candidatos2[posicion21].split("|");
    var candidato_clv = clavex22[0];

    evalXcandidato(candidato_clv);
}