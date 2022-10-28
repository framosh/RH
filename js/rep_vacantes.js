/* LANZA REPORTE EN PANTALLA */
function rep_pantalla() {
    var empresa = document.getElementById("empresas").value;
    var est_vac = document.getElementById("estatus_vac").value;
    var tipo_rep = document.getElementById("tipo_rep").value; // Tipo de reporte
    var fecha1 = document.getElementById("fecha1").value; // Fecha de inicio
    var fecha2 = document.getElementById("fecha2").value; // fecha de fin

    //    alert("Fecha: " + fecha1);

    if (tipo_rep == "Seleccione el tipo de reporte") {
        alert("Seleccione un tipo de reporte");
        return;
    }

    var renglones = "";
    var posicion22 = "";
    var clavex22 = "";
    var campox21 = [];
    var empresa_clv = "";
    var empresa_nom = "";

    if (empresa != "Seleccione una Empresa") {
        renglones = cliente2.length;
        renglones--;
        posicion22 = document.getElementById("empresas").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = cliente2[posicion22].split("|");
        empresa_clv = clavex22[0];
        empresa_nom = clavex22[1];
    }

    campox21[0] = empresa_clv;
    campox21[1] = empresa_nom;

    posicion22 = document.getElementById("estatus_vac").selectedIndex;
    est_vac = posicion22;

    posicion22 = document.getElementById("tipo_rep").selectedIndex;
    var tipo_reporte = posicion22;

    campox21[2] = est_vac;
    campox21[3] = fecha1;
    campox21[4] = fecha2;
    campox21 = campox21.join("|");

    if (tipo_reporte == 1) { // Vacantes por cliente
        if (empresa == "Seleccione una Empresa") {
            alert("Seleccione una Empresa");
            return;
        }

        window.location.href = servidor + "httpdocs/rdva3_Vac_x_Cliente.php" + "?Camposx21=" + campox21;
    }
    if (tipo_reporte == 2) { // Vacantes por periodo
        if (fecha1 == "" || fecha1 == null) {
            alert("Seleccione un periodo");
            return;
        }

        window.location.href = servidor + "httpdocs/rdva3_Vac_x_Periodo.php" + "?Camposx21=" + campox21;
    }
}

function rep_grid() {
    alert("Reporte de vacantes en Gridjs");
    window.location.href = servidor + "vacantes.htm";
}

/* LANZA REPORTE EN EXCEL */
function rep_excel() {
    var empresa = document.getElementById("empresas").value;
    var est_vac = document.getElementById("estatus_vac").value;
    var tipo_rep = document.getElementById("tipo_rep").value; // Tipo de reporte
    var fecha1 = document.getElementById("fecha1").value; // Fecha de inicio
    var fecha2 = document.getElementById("fecha2").value; // fecha de fin

    if (tipo_rep == "Seleccione el tipo de reporte") {
        alert("Seleccione un tipo de reporte");
        return;
    }

    var renglones = "";
    var posicion22 = "";
    var clavex22 = "";
    var campox21 = [];
    var empresa_clv = "";
    var empresa_nom = "";

    if (empresa != "Seleccione una Empresa") {
        renglones = cliente2.length;
        renglones--;
        posicion22 = document.getElementById("empresas").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = cliente2[posicion22].split("|");
        empresa_clv = clavex22[0];
        empresa_nom = clavex22[1];
    }

    campox21[0] = empresa_clv;
    campox21[1] = empresa_nom;

    posicion22 = document.getElementById("estatus_vac").selectedIndex;
    est_vac = posicion22;

    posicion22 = document.getElementById("tipo_rep").selectedIndex;
    var tipo_reporte = posicion22;

    campox21[2] = est_vac;
    campox21[3] = fecha1;
    campox21[4] = fecha2;
    campox21 = campox21.join("|");

    if (tipo_reporte == 1) { // Vacantes por cliente
        if (empresa == "Seleccione una Empresa") {
            alert("Seleccione una Empresa");
            return;
        }

        window.location.href = servidor + "httpdocs/sp_Vac_x_Cliente.php" + "?Camposx21=" + campox21;
    }
    if (tipo_reporte == 2) { // Vacantes por periodo
        if (fecha1 == "" || fecha2 == "") {
            alert("Seleccione un periodo");
            return;
        }

        window.location.href = servidor + "httpdocs/sp_Vac_x_Periodo.php" + "?Camposx21=" + campox21;
    }
}

function limpiaPantalla() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("empresas").selectedIndex = vacio1;
    document.getElementById("estatus_vac").selectedIndex = vacio1;
    document.getElementById("fecha1").value = vacio;
    document.getElementById("fecha2").value = vacio;
    document.getElementById("tipo_rep").selectedIndex = vacio1;
    document.getElementById("mensaje_gral").innerHTML = vacio;
}

function leeClientes2() {
    //    alert("Lee Clientes");
    limpiaPantalla();

    leeClientes();
}