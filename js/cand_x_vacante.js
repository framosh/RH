/* LANZA REPORTE EN PANTALLA */
function repCxV() {
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;

    if (vacante == "0-Seleccione una Vacante") {
        vacante = "";
        //        alert("Seleccione la Vacante");
        //      return;
    }

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    var vacante_clv = "";
    var vacante_nom = "";
    var renglones = "";
    var posicion22 = "";
    var clavex22 = "";

    if (vacante != "") {
        renglones = vacantes2.length;
        renglones--;
        posicion22 = document.getElementById("vacantes").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = vacantes2[posicion22].split("|");
        vacante_clv = clavex22[0];
        vacante_nom = clavex22[1];
    } else {
        vacante_nom = "Todas las vacantes";
    }

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var empresa_clv = clavex22[0];
    var empresa_nom = clavex22[1];

    alert("Vacante: " + vacante_clv + " Empresa: " + empresa_clv);

    window.location.href = servidor + "httpdocs/rdva3_Reg_Cand_x_Vac.php" + "?Vacante=" + vacante_clv + "&Vac_nom=" + vacante_nom + "&Empresa=" + empresa_clv + "&Emp_nom=" + empresa_nom;
}

/* LANZA REPORTE EN EXCEL */
function repExcelCxV() {
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;

    if (vacante == "0-Seleccione una Vacante") {
        vacante = "";
        //        alert("Seleccione la Vacante");
        //      return;
    }

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    var vacante_clv = "";
    var vacante_nom = "";
    var renglones = "";
    var posicion22 = "";
    var clavex22 = "";

    if (vacante != "") {
        renglones = vacantes2.length;
        renglones--;
        posicion22 = document.getElementById("vacantes").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = vacantes2[posicion22].split("|");
        vacante_clv = clavex22[0];
        vacante_nom = clavex22[1];
    } else {
        vacante_nom = "Todas las vacantes";
    }

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var empresa_clv = clavex22[0];
    var empresa_nom = clavex22[1];

    //    alert("Empresa: " + empresa_clv + "  Nombre: " + empresa_nom + " Vacante: " + vacante_clv + " Nombre: " + vacante_nom);

    window.location.href = servidor + "httpdocs/sp_Reg_Cand_x_Vac.php" + "?Vacante=" + vacante_clv + "&Vac_nom=" + vacante_nom + "&Empresa=" + empresa_clv + "&Emp_nom=" + empresa_nom;
}

function limpiaPantalla() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("vacantes").selectedIndex = vacio1;
    document.getElementById("candidatos").selectedIndex = vacio1;
    document.getElementById("cand_x_vac_msg").innerHTML = vacio;
    //    document.getElementById("altacxv").disabled = false;
    //  document.getElementById("actuacxv").disabled = true;
}

function actualizaCxV() {
    alert("Actualiza Conocimiento Requerido");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("cand_x_vac_msg").innerHTML = vacio;

    var vacante = document.getElementById("vacantes").value;
    var candidato = document.getElementById("candidatos").value;

    if (vacante == "0-Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    if (candidato == "Seleccione un Candidato") {
        alert("Seleccione un Candidato");
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    renglones = candidato2.length;
    renglones--;
    posicion22 = document.getElementById("candidatos").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = candidato2[posicion22].split("|");
    var candidato_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/act_cand_x_vac.php";
    var archivo2 = archivo1 + "?Candidato=" + candidato_clv + "&Vacante=" + vacante_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            document.getElementById("cand_x_vac_msg").innerHTML = cadena;
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function altaCxV() {
    //    alert("Asigna Candidato a Vacante");
    var vacio = "";
    document.getElementById("cand_x_vac_msg").innerHTML = vacio;

    var vacante = document.getElementById("vacantes").value;
    var candidato = document.getElementById("candidatos").value;

    if (candidato == "Seleccione un Candidato") {
        alert("Seleccione un Candidato");
        return;
    }

    if (vacante == "0-Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    var renglones = candidatos2.length;
    renglones--;
    var posicion22 = document.getElementById("candidatos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = candidatos2[posicion22].split("|");
    var candidato_clv = clavex22[0];

    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    //    alert("Candidato: " + candidato_clv + "  Vacante: " + vacante_clv);

    var archivo1 = servidor + "httpdocs/reg_Cand_x_Vac.php";
    var archivo2 = archivo1 + "?Vacante=" + vacante_clv + "&Candidato=" + candidato_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            document.getElementById("cand_x_vac_msg").innerHTML = cadena;
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function leeCandidatos2() {
    var limpia = "";
    document.getElementById("cand_x_vac_msg").innerHTML = limpia;
    var vacante = document.getElementById("vacantes").value;
    var vacante_clv = "";

    if (vacante == "0-Seleccione una Vacante") {
        alert("0-Seleccione una Vacante");
        document.getElementById("candidatos").innerHTML = limpia;
        //        return;
    } else {
        var renglones = vacantes2.length;
        renglones--;

        var posicion22 = document.getElementById("vacantes").selectedIndex;
        posicion22 = (renglones - posicion22);
        var clavex22 = vacantes2[posicion22].split("|");
        vacante_clv = clavex22[0];
    }
    //    vacante_clv = ""; // Asignacion temporal exclisuva para desplegar todos los candidatos y actualizarlos

    leeCandidatos(vacante_clv);
}

function leeVacantes2() {
    var limpia = "";
    var vacio1 = 0;
    //    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("candidatos").innerHTML = limpia;
    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("cand_x_vac_msg").innerHTML = limpia;

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
    document.getElementById("candidatos").innerHTML = limpia;

    leeClientes();
}