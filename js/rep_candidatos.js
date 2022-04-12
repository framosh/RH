/* LANZA REPORTE EN PANTALLA */
function repCxV() {
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;
    var est_cand = document.getElementById("estatus_cand").value;
    var est_cv = document.getElementById("estatus_cv").value; // Estatus de cv.
    var est_entrevista = document.getElementById("estatus_entre").value; // Estatus de entrevista
    var est_evaluacion = document.getElementById("estatus_eval").value; // Estatus de evaluacion
    var tipo_rep = document.getElementById("tipo_rep").value; // Tipo de reporte
    //    var fecha1 = document.getElementById("fecha1").value; // Fecha de inicio
    //  var fecha2 = document.getElementById("fecha2").value; // fecha de fin

    if (vacante == "0-Seleccione una Vacante") {
        vacante = "";
        return;
    }

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (tipo_rep == "Seleccione el tipo de reporte") {
        alert("Seleccione un tipo de reporte");
        return;
    }

    var vacante_clv = "";
    var vacante_nom = "";
    var renglones = "";
    var posicion22 = "";
    var clavex22 = "";
    var campox21 = [];

    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    vacante_clv = clavex22[0];
    vacante_nom = clavex22[1];

    campox21[0] = vacante_clv;
    campox21[1] = vacante_nom;

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var empresa_clv = clavex22[0];
    var empresa_nom = clavex22[1];

    campox21[2] = empresa_clv;
    campox21[3] = empresa_nom;

    posicion22 = document.getElementById("estatus_cand").selectedIndex;
    est_cand = posicion22;

    posicion22 = document.getElementById("estatus_cv").selectedIndex;
    est_cv = posicion22;

    posicion22 = document.getElementById("estatus_entre").selectedIndex;
    est_entrevista = posicion22;

    posicion22 = document.getElementById("estatus_eval").selectedIndex;
    est_evaluacion = posicion22;

    posicion22 = document.getElementById("tipo_rep").selectedIndex;
    var tipo_reporte = posicion22;

    campox21[4] = est_cand;
    campox21[5] = est_cv;
    campox21[6] = est_entrevista;
    campox21[7] = est_evaluacion;
    /*
        alert("Estatus candidato:" + est_cand);
        alert("Estatus cv:" + est_cv);
        alert("Estatus entrevista:" + est_entrevista);
        alert("Estatus evaluacion:" + est_evaluacion);
    */
    campox21 = campox21.join("|");

    if (tipo_reporte == 1) {
        window.location.href = servidor + "httpdocs/rdva3_Cand_x_Vac.php" + "?Camposx21=" + campox21;
    }
    if (tipo_reporte == 2) {
        window.location.href = servidor + "httpdocs/rdva3_Cand_y_conocim.php" + "?Camposx21=" + campox21;
    }
    if (tipo_reporte == 3) {
        window.location.href = servidor + "httpdocs/rdva3_Cand_y_estudios.php" + "?Camposx21=" + campox21;
    }
    if (tipo_reporte == 4) {
        window.location.href = servidor + "httpdocs/rdva3_Cand_y_comentarios.php" + "?Camposx21=" + campox21;
    }
}

/* LANZA REPORTE EN EXCEL */
function repExcelCxV() {
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;
    var est_cand = document.getElementById("estatus_cand").value;
    var est_cv = document.getElementById("estatus_cv").value; // Estatus de cv.
    var est_entrevista = document.getElementById("estatus_entre").value; // Estatus de entrevista
    var est_evaluacion = document.getElementById("estatus_eval").value; // Estatus de evaluacion
    var tipo_rep = document.getElementById("tipo_rep").value; // Tipo de reporte
    //    var fecha1 = document.getElementById("fecha1").value; // Fecha de inicio
    //  var fecha2 = document.getElementById("fecha2").value; // fecha de fin

    if (vacante == "0-Seleccione una Vacante") {
        vacante = "";
        return;
    }

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (tipo_rep == "Seleccione el tipo de reporte") {
        alert("Seleccione un tipo de reporte");
        return;
    }


    var vacante_clv = "";
    var vacante_nom = "";
    var renglones = "";
    var posicion22 = "";
    var clavex22 = "";
    var campox21 = [];

    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    vacante_clv = clavex22[0];
    vacante_nom = clavex22[1];

    campox21[0] = vacante_clv;
    campox21[1] = vacante_nom;

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var empresa_clv = clavex22[0];
    var empresa_nom = clavex22[1];

    campox21[2] = empresa_clv;
    campox21[3] = empresa_nom;

    posicion22 = document.getElementById("estatus_cand").selectedIndex;
    est_cand = posicion22;

    posicion22 = document.getElementById("estatus_cv").selectedIndex;
    est_cv = posicion22;

    posicion22 = document.getElementById("estatus_entre").selectedIndex;
    est_entrevista = posicion22;

    posicion22 = document.getElementById("estatus_eval").selectedIndex;
    est_evaluacion = posicion22;

    posicion22 = document.getElementById("tipo_rep").selectedIndex;
    var tipo_reporte = posicion22;

    campox21[4] = est_cand;
    campox21[5] = est_cv;
    campox21[6] = est_entrevista;
    campox21[7] = est_evaluacion;

    campox21 = campox21.join("|");

    if (tipo_reporte == 1) {
        window.location.href = servidor + "httpdocs/sp_Cand_x_Vac.php" + "?Camposx21=" + campox21;
    }

    if (tipo_reporte == 2) {
        window.location.href = servidor + "httpdocs/sp_Cand_y_conocim.php" + "?Camposx21=" + campox21;
    }

    if (tipo_reporte == 3) {
        window.location.href = servidor + "httpdocs/sp_Cand_y_estudios.php" + "?Camposx21=" + campox21;
    }

    if (tipo_reporte == 4) {
        window.location.href = servidor + "httpdocs/sp_Cand_y_comentarios.php" + "?Camposx21=" + campox21;
    }
}

function limpiaPantalla() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("empresas").selectedIndex = vacio1;
    document.getElementById("vacantes").selectedIndex = vacio1;
    document.getElementById("estatus_cand").selectedIndex = vacio1;
    document.getElementById("estatus_cv").selectedIndex = vacio1;
    document.getElementById("estatus_entre").selectedIndex = vacio1;
    document.getElementById("estatus_eval").selectedIndex = vacio1;
    document.getElementById("tipo_rep").selectedIndex = vacio1;
    document.getElementById("mensaje_gral").innerHTML = vacio;
}


function leeVacantes2() {
    var limpia = "";
    var vacio1 = 0;
    //    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("mensaje_gral").innerHTML = limpia;

    var empresa = document.getElementById("empresas").value;
    var cliente_clv = "";

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    for (var i4 = 0; i4 < cliente2.length; i4++) {
        var nombre3 = cliente2[i4].split("|");
        var campo3 = nombre3[1];
        if (campo3 == empresa) {
            cliente_clv = nombre3[0];
            var nombre1 = nombre3[1];
            //            alert("Cliente: (" + cliente_clv + ") - (" + nombre1 + ")");
            break;
        }
    }
    leeVacantes(cliente_clv);
}


function leeClientes2() {
    limpiaPantalla();
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;

    leeClientes();
}