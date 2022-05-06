// Mantenimiento de conocimientos tecnicos por candidato
/* LANZA REPORTE EN PANTALLA */
function repCono() {
    //    alert("Despliega reporte por pantalla");
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
}

/* LANZA REPORTE EN EXCEL */
function repExcelCono() {
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
}

function limpiaGeneral() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("empresas").selectedIndex = vacio1;
    document.getElementById("vacantes").innerHTML = vacio;
    document.getElementById("candidatos").innerHTML = vacio;
    document.getElementById("conocimientos").innerHTML = vacio;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("altaconr").disabled = false;
    document.getElementById("actuaconr").disabled = true;
}

function limpiaPantalla() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("altaconr").disabled = false;
    document.getElementById("actuaconr").disabled = true;
}


// Registro de conocimientos por candidato
function actualizaConocim() {
    //    alert("Actualiza Conocimiento Requerido");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var vacante = document.getElementById("vacantes").value;
    var candidato = document.getElementById("candidatos").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var nivel = document.getElementById("nivel").value;
    var anios = document.getElementById("anios").value;
    var meses = document.getElementById("meses").value;

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    if (candidato == "Seleccione un Candidato") {
        alert("Seleccione un Candidato");
        return;
    }

    if (nivel == "Seleccione el Nivel") {
        alert("Seleccione el nivel del conocimiento requerido");
        return;
    }

    if (anios == null) {
        anios = "";
    }
    if (meses == null) {
        meses = "";
    }

    if (anios == "" && meses == "") {
        alert("Teclee los años o meses requeridos de experiencia en el conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    renglones = candidatos2.length;
    renglones--;
    posicion22 = document.getElementById("candidatos").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = candidatos2[posicion22].split("|");
    var candidato_clv = clavex22[0];

    var nivel22 = 4;
    renglones = nivel22;
    renglones--;
    posicion22 = document.getElementById("nivel").selectedIndex;
    var nivel_clv = posicion22;

    var archivo1 = servidor + "httpdocs/act_Con_Cand.php";
    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Candidato=" + candidato_clv + "&Nivel=" + nivel_clv + "&Anio=" + anios + "&Mes=" + meses;
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
        }
    };
}

// Registro de conocimientos necesarios por vacante
function altaConocim() {
    //    alert("Alta Conocimiento requerido");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var vacante = document.getElementById("vacantes").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var nivel = document.getElementById("nivel").value;
    var anios = document.getElementById("anios").value;
    var meses = document.getElementById("meses").value;
    var empresa = document.getElementById("empresas").value;

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    if (nivel == "Seleccione el Nivel") {
        alert("Seleccione el nivel del conocimiento requerido");
        return;
    }

    if (anios == null) {
        anios = "";
    }
    if (meses == null) {
        meses = "";
    }

    if (anios == "" && meses == "") {
        alert("Teclee los años o meses requeridos de experiencia en el conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];
    /*
        renglones = cliente2.length;
        renglones--;
        var posicion22 = document.getElementById("empresas").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = cliente2[posicion22].split("|");
        var empresa_clv = clavex22[0];
    */
    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    var nivel22 = 4;
    renglones = nivel22;
    renglones--;
    posicion22 = document.getElementById("nivel").selectedIndex;
    var nivel_clv = posicion22;

    var archivo1 = servidor + "httpdocs/reg_Cono_Req.php";
    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Vacante=" + vacante_clv + "&Nivel=" + nivel_clv + "&Anio=" + anios + "&Mes=" + meses;
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
        }
    };
}

//Consulta de conocimiento por candidato
function consultaConocimiento() {
    //    alert("Consulta conocimiento requerido por vacante");
    var vacio = "";
    var vacio1 = 0;

    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;

    var candidato = document.getElementById("candidatos").value;
    var conocimiento = document.getElementById("conocimientos").value;

    if (candidato == "Seleccione un Candidato") {
        alert("Seleccione un Candidato");
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

    renglones = candidatos2.length;
    renglones--;
    var posicion22 = document.getElementById("candidatos").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = candidatos2[posicion22].split("|");
    var candidato_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/con_Con_Cand.php";
    var archivo2 = archivo1 + "?candidato=" + candidato_clv + "&conocimiento=" + conocimiento_clv;
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
            //            alert("Cadena:" + cadena);
            var vacio2 = 0;
            var vacio22 = "";

            if (ids[1] == "No hay Conocimientos") {
                document.getElementById("nivel").selectedIndex = vacio2;
                document.getElementById("anios").value = vacio22;
                document.getElementById("meses").value = vacio22;

                document.getElementById("altaconr").disabled = false;
                document.getElementById("actuaconr").disabled = true;
                return;
            }

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            var lugar = 0;
            lugar = 4 - ids[2];
            //            alert("Lugar: " + lugar);

            document.getElementById("nivel").selectedIndex = lugar;
            document.getElementById("anios").value = ids[3];
            document.getElementById("meses").value = ids[4];
            document.getElementById("altaconr").disabled = true;
            document.getElementById("actuaconr").disabled = false;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

var conocimientos2 = [];
// Catalogo de conocimientos por candidato
function leeConocimientos() {
    //    alert("Lee Conocimientos:");
    //    limpiaPantalla();
    var limpia = "";
    var vacio1 = 0;

    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;
    document.getElementById("mensaje_gral").innerHTML = limpia;

    var candidato = document.getElementById("candidatos").value;

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

    var archivo1 = servidor + "httpdocs/cat_cono_x_cand.php";
    var archivo2 = archivo1 + "?Candidato=" + candidato_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //          alert("Cadena: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var conocimientos = cadena.split("\n");
            var cantidad = conocimientos.length;
            var i2 = 0;

            for (var i = 0; i < cantidad; i++) {
                var campo = conocimientos[i];
                if (campo) {
                    conocimientos2[i2] = campo.trim();
                    conocimientos2[i2] = conocimientos2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            conocimientos2[i2] = "0|Seleccione el Conocimiento";
            var select = document.getElementById("conocimientos");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = conocimientos2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}

var candidatos2 = [];
// Catalogo de candidatos por vacante
function leeCandidatos() {
    //    alert("Lee Conocimientos:");
    //    limpiaPantalla();
    var limpia = "";
    var vacio1 = 0;

    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;
    document.getElementById("mensaje_gral").innerHTML = limpia;

    var vacante = document.getElementById("vacantes").value;

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione una Vacante");
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/catalogoCandidatos.php";
    var archivo2 = archivo1 + "?vacante=" + vacante_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var candidatos = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < candidatos.length; i++) {
                var campo = candidatos[i];
                if (campo) {
                    candidatos2[i2] = campo.trim();
                    candidatos2[i2] = candidatos2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            candidatos2[i2] = "0|Seleccione el Candidato";
            var select = document.getElementById("candidatos");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = candidatos2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}

var vacantes2 = [];
// Catalogo de vacantes por empresa
function leeVacantes() {
    //alert("Entra a Carga de Clientes ");
    var limpia = "";
    var vacio1 = 0;
    //    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("candidatos").innerHTML = limpia;
    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;
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
            nombre1 = nombre3[1];
            //            alert("Cliente: (" + cliente_clv + ") - (" + nombre1 + ")");
            break;
        }
    }

    var estatus = 1;

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/catalogoVacantes.php";
    var archivo2 = archivo1 + "?Empresa=" + cliente_clv + "&estatus=" + estatus;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "        longitud: (" + cadena.length + ")";

            var clientes = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < clientes.length; i++) {
                var campo = clientes[i];
                if (campo) {
                    vacantes2[i2] = campo.trim();
                    vacantes2[i2] = vacantes2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }

            vacantes2[i2] = "0|Seleccione una Vacante";
            var select = document.getElementById("vacantes");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = vacantes2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}

// Catalogo de empresas (Clientes)
function leeClientes2() {
    limpiaPantalla();
    var limpia = "";
    var vacio1 = 0;
    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("candidatos").innerHTML = limpia;
    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;

    leeClientes();
}