// Mantenimiento al catalogo de evaluaciones
/* LANZA REPORTE EN PANTALLA */
function rep_Pantalla() {
    //    alert("Despliega reporte por pantalla");
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
}

/* LANZA REPORTE EN EXCEL */
function rep_Excel() {
    //    alert("Despliega reporte por Excel");
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
}

function limpiaPantalla_eval() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("puestos").selectedIndex = vacio1;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clave").value = vacio;
    document.getElementById("pmin").value = vacio1;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("descripcion").value = vacio;
    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = false;
}

function nuevoEval() {
    limpiaPantalla_eval();
}

var tipo_funcion = "";

function altaEval() {
    tipo_funcion = "alta";
    modificaEval();
}

function actualizaEval() {
    tipo_funcion = "modifica";
    modificaEval();
    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;
}


// Registro de conocimientos por candidato
function modificaEval() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;


    var puesto = document.getElementById("puestos").value;
    var evaluacion = document.getElementById("evaluaciones").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var descripcion = document.getElementById("descripcion").value;
    var pmin = document.getElementById("pmin").value;
    var nivel = document.getElementById("nivel").value;
    var nombre = document.getElementById("nombre").value;
    descripcion = descripcion.replace(/\n/g, "\\n");


    if (puesto == "Seleccione el Puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    if (nivel == "Seleccione el Nivel") {
        alert("Seleccione el Nivel");
        return;
    }

    var nivel_valor;
    switch (nivel) {
        case "Alto":
            nivel_valor = 1;
            break;
        case "Medio":
            nivel_valor = 2;
            break;
        case "Bajo":
            nivel_valor = 3;
            break;
        default:
            nivel_valor = 0;
    }

    if (tipo_funcion == "modifica") {
        if (evaluacion == "Seleccione la evaluacion") {
            alert("Seleccione la evaluacion");
            return;
        }
    } else {
        if (nombre == "") {
            alert("Registre el nombre de la evaluación");
            return;
        }
    }

    var camposx22 = [];

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    renglones = puestos2.length;
    renglones--;
    var posicion22 = document.getElementById("puestos").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = puestos2[posicion22].split("|");
    var puesto_clv = clavex22[0];

    evaluacion_clv = document.getElementById("clave").value;
    if (evaluacion_clv == null) {
        evaluacion_clv = 0;
    }

    camposx22[0] = conocimiento_clv;
    camposx22[1] = puesto_clv;
    camposx22[2] = evaluacion_clv;
    camposx22[3] = nombre;
    camposx22[4] = nivel_valor;
    camposx22[5] = pmin;
    camposx22[6] = descripcion;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    if (tipo_funcion == "modifica") {
        archivo1 = servidor + "httpdocs/act_evaluacion.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_evaluacion.php";
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
                if (valor[0] == "Nueva evaluación") {
                    document.getElementById("clave").value = valor[1];
                    document.getElementById("alta").disabled = true;
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
    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;

    var evaluacion = document.getElementById("evaluaciones").value;

    if (evaluacion == "Seleccione la evaluacion") {
        alert("Seleccione la evaluacion");
        return;
    }

    var renglones = evaluaciones2.length;
    renglones--;
    var posicion22 = document.getElementById("evaluaciones").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = evaluaciones2[posicion22].split("|");
    var evaluacion_clv = clavex22[0];

    document.getElementById("clave").value = evaluacion_clv;

    var archivo1 = servidor + "httpdocs/consultaEvaluacion.php";
    var archivo2 = archivo1 + "?clave=" + evaluacion_clv;
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

            puesto_clv = ids[2];
            conocimiento_clv = ids[3];

            var puesto = 0;
            var opcion4 = 0;

            if (ids[2] != "" && ids[2] != "0") {
                var cantPuestos = puestos2.length;
                cantPuestos--;

                for (var i1 = cantPuestos; i1 >= 0; i1--) {
                    var campo2 = puestos2[i1];
                    var clave = campo2.split("|");
                    if (puesto_clv == clave[0]) {
                        puesto = (cantPuestos - i1);
                        break;
                    }
                }
            } else {
                puesto = 0;
            }
            //            alert("posicion del puesto: " + puesto);

            var conocimiento = 0;
            opcion4 = 0;

            if (ids[3] != "" && ids[3] != "0") {
                var cantConocimientos = conocimientos2.length;
                cantConocimientos--;

                for (var i2 = cantConocimientos; i2 >= 0; i2--) {
                    var campo3 = conocimientos2[i2];
                    var clavex1 = campo3.split("|");
                    if (conocimiento_clv == clavex1[0]) {
                        conocimiento = (cantConocimientos - i2);
                        break;
                    }
                }
            } else {
                conocimiento = 0;
            }
            //            alert("posicion del conocimiento: " + conocimiento);

            var nivelx1 = ids[5];

            document.getElementById("puestos").selectedIndex = puesto;
            document.getElementById("conocimientos").selectedIndex = conocimiento;

            document.getElementById("descripcion").value = ids[6];
            document.getElementById("pmin").value = ids[4];
            document.getElementById("nivel").selectedIndex = nivelx1;
            document.getElementById("nombre").value = ids[1];

            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}