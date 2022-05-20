// Mantenimiento al catalogo de evaluaciones
/* LANZA REPORTE EN PANTALLA */
function repEvalPant() {
    //    alert("Despliega reporte por pantalla");
    /*
    var candidato = document.getElementById("candidatos").value;
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (candidato == "Seleccione un Candidato") {
        alert("Seleccione un Candidato");
        return;
    }

    var renglones = candidatos2.length;
    renglones--;
    var posicion22 = document.getElementById("candidatos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = candidatos2[posicion22].split("|");
    var candidato_clv = clavex22[0];

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var emp_nom = clavex22[1];

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    var vac_clv = clavex22[0];
    var vac_nom = clavex22[1];

    window.location.href = "httpdocs/rdva3_Cono_x_Cand.php?Candidato=" + candidato_clv + "&Nombre=" + candidato + "&Empresa=" + emp_nom + "&Vacante=" + vac_clv + "&Vac_nom=" + vac_nom;
    */
}

/* LANZA REPORTE EN EXCEL */
function repEvalExcel() {
    /*
        var candidato = document.getElementById("candidatos").value;
        var vacante = document.getElementById("vacantes").value;
        var empresa = document.getElementById("empresas").value;

        if (empresa == "Seleccione una Empresa") {
            alert("Seleccione una Empresa");
            return;
        }

        if (candidato == "Seleccione un Candidato") {
            alert("Seleccione un Candidato");
            return;
        }

        var renglones = candidatos2.length;
        renglones--;
        var posicion22 = document.getElementById("candidatos").selectedIndex;
        posicion22 = (renglones - posicion22);
        var clavex22 = candidatos2[posicion22].split("|");
        var candidato_clv = clavex22[0];

        renglones = cliente2.length;
        renglones--;
        posicion22 = document.getElementById("empresas").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = cliente2[posicion22].split("|");
        var emp_nom = clavex22[1];

        if (vacante == "Seleccione una Vacante") {
            alert("Seleccione la Vacante");
            return;
        }

        renglones = vacantes2.length;
        renglones--;
        posicion22 = document.getElementById("vacantes").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = vacantes2[posicion22].split("|");
        var vac_clv = clavex22[0];
        var vac_nom = clavex22[1];

        window.location.href = "httpdocs/sp_Cono_x_Cand.php?Candidato=" + candidato_clv + "&Nombre=" + candidato + "&Empresa=" + emp_nom + "&Vacante=" + vac_clv + "&Vac_nom=" + vac_nom;
    */
}

function limpiaPantalla() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("puestos").selectedIndex = vacio1;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("evaluaciones").selectedIndex = vacio1;
    document.getElementById("descipcion").innerHTML = vacio;
    document.getElementById("pmin").value = vacio1;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("observacion").innerHTML = vacio;
    document.getElementById("puestos").disabled = false;
    document.getElementById("conocimientos").disabled = false;
}

var tipo_funcion = "";

function altaEval() {
    tipo_funcion = "alta";
    modificaEval();
}

function actualizaEval() {
    tipo_funcion = "modifica";
    modificaEval();
}


// Registro de conocimientos por candidato
function modificaEval() {
    //    alert("Actualiza Conocimiento Requerido");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var puesto = document.getElementById("puestos").value;
    var evaluacion = document.getElementById("evaluaciones").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var descripcion = document.getElementById("descipcion").value;
    var pmin = document.getElementById("pmin").value;
    var nivel = document.getElementById("nivel").value;
    var observaciones = document.getElementById("observacion").value;

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

    if (tipo_funcion == "modifica") {
        if (evaluacion == "Seleccione la evaluacion") {
            alert("Seleccione la evaluacion");
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

    renglones = evaluaciones2.length;
    renglones--;
    posicion22 = document.getElementById("evaluaciones").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = evaluaciones2[posicion22].split("|");
    var evaluacion_clv = clavex22[0];

    camposx22[0] = conocimiento_clv;
    camposx22[1] = puesto_clv;
    camposx22[2] = evaluacion_clv;
    camposx22[3] = descripcion;
    camposx22[4] = nivel;
    camposx22[5] = pmin;
    camposx22[6] = observaciones;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    if (tipo_funcion == "modifica") {
        archivo1 = servidor + "httpdocs/act_evaluacion.php";
    } else {
        archivo1 = servidor + "httpdocs/alta_evaluacion.php";
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
            document.getElementById("mensaje_gral").innerHTML = cadena;
            if (tipo_funcion == "alta") {
                var valor = cadena.split(":");
                document.getElementById("clave").value = valor[1];
            }
        }
    };
}

function consultaEval() {
    //    alert("Consulta Conocimiento");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("puestos").disabled = true;
    document.getElementById("conocimientos").disabled = true;

    var evaluacion = document.getElementById("evaluaciones").value;

    if (evaluacion == "Seleccione la evaluacion") {
        alert("Seleccione la evaluacion");
        return;
    }

    renglones = evaluaciones2.length;
    renglones--;
    posicion22 = document.getElementById("evaluaciones").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = evaluaciones2[posicion22].split("|");
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

            if (ids[8] != "" && ids[8] != "0") {
                var cantPuestos = puestos2.length;
                cantPuestos--;

                for (var i1 = cantPuestos; i1 >= 0; i1--) {
                    var campo2 = puestos2[i1];
                    var clave = campo2.split("|");
                    if (campo2 && clave[0] != "0") {
                        opcion4++;
                        if (clave[0] == ids[8]) {
                            puesto = opcion4;
                            //                            estado--;
                            //                     alert("Estado: "+estado2[i1]+"  opcion5:("+opcion5+")  ids[7]:("+ids[7]+")   longitud:"+estado2.length);
                            break;
                        }
                    }
                }
            } else {
                puesto = 0;
            }

            var conocimiento = 0;
            opcion4 = 0;

            if (ids[8] != "" && ids[8] != "0") {
                var cantConocimientos = conocimientos2.length;
                cantConocimientos--;

                for (var i2 = cantConocimientos; i2 >= 0; i2--) {
                    var campo3 = conocimientos2[i2];
                    var clavex1 = campo3.split("|");
                    if (campo3 && clavex1[0] != "0") {
                        opcion4++;
                        if (clavex1[0] == ids[8]) {
                            conocimiento = opcion4;
                            break;
                        }
                    }
                }
            } else {
                conocimiento = 0;
            }

            document.getElementById("puestos").selectedIndex = puesto;
            document.getElementById("conocimientos").selectedIndex = conocimiento;

            document.getElementById("descripcion").value = ids[1];
            document.getElementById("pmin").value = ids[4];
            document.getElementById("nivel").selectedIndex = ids[5];
            document.getElementById("observacion").value = ids[6];
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}