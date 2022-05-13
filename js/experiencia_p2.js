// Mantenimiento de la educacion de candidatoas por pantalla
function limpiaPantalla1() {
    //    alert("Limpia pantalla 1");
    var valor = "";
    var opcion2 = 0;
    document.getElementById("empresas").selectedIndex = opcion2;
    document.getElementById("candidatos").selectedIndex = opcion2;
    document.getElementById("vacantes").selectedIndex = opcion2;
}

var alta = false;
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
        alta = true;
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


function leeClientes2() {
    //    alert("Checa permisos");
    elige_servidor();
    checaPermisos();
    //    alert("Lee Clientes 2");
    //  alert("limpia Pantalla");
    limpiaPantalla1(); // Limpia pantalla
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("candidatos").innerHTML = limpia;
    //alert("Lee Clientes");
    leeClientes();
}

var cand_clv;
var cand_nom;

function separaNombre() {
    var candidato = document.getElementById("candidatos").value;

    var renglones = candidatos2.length;
    renglones--;
    var posicion22 = document.getElementById("candidatos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = candidatos2[posicion22].split("|");
    cand_clv = clavex22[0];
    cand_nom = clavex22[1];

    document.getElementById("cand_nom").value = cand_nom;
    document.getElementById("cand_key").value = cand_clv;
    leeExperiencias();
}


function leeCandidatos2() {
    //    alert("Lee Candidatos:");
    //    limpiaPantalla2();
    //  consultaVacante();
    var limpia = "";

    document.getElementById("mensaje_gral").innerHTML = limpia;
    document.getElementById("candidatos").innerHTML = limpia;

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
    //    leeConocimientos2();
}

function leeVacantes2() {
    //    alert("Lee Vacantes 2");
    var limpia = "";
    //    var vacio1 = 0;
    //    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("candidatos").innerHTML = limpia;
    document.getElementById("mensaje_gral").innerHTML = limpia;

    var empresa = document.getElementById("empresas").value;
    var cliente_clv = "";

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    var nombre1 = "";

    for (var i4 = 0; i4 < cliente2.length; i4++) {
        var nombre3 = cliente2[i4].split("|");
        var campo3 = nombre3[1];
        if (campo3 == empresa) {
            cliente_clv = nombre3[0];
            nombre1 = nombre3[1];
            //            alert("Cliente: (" + cliente_clv + ") - (" + nombre1 + ")");
            break;
        }
    }
    leeVacantes(cliente_clv);
}