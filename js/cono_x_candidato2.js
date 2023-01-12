/*
Mantenimiento a los conocimientos tecnicos del candidato
*/

function limpiaPantalla_Con() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("mensaje_conocimiento").innerHTML = vacio;
    document.getElementById("altacon").disabled = false;
    document.getElementById("actuacon").disabled = true;
}

function actualizaConocim() {
    //    alert("Actualiza Conocimiento del Candidato");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("mensaje_conocimiento").innerHTML = vacio;

    var conocimiento = document.getElementById("conocimientos").value;
    var nivel = document.getElementById("nivel").value;
    var anios = document.getElementById("anios").value;
    var meses = document.getElementById("meses").value;
    var candidato_clv = document.getElementById("cand_key").value;

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
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

    if (anios == "") {
        anios = "0";
    }

    if (meses == "") {
        meses = "0";
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var indice = document.getElementById("conocimientos").selectedIndex;
    indice = (renglones - indice);
    clavex22 = conocimientos2[indice].split("|");
    var conocimiento_clv = clavex22[0];

    /*
        if (candidato_clv == "" || candidato_clv == null) {
            renglones = candidatos2.length;
            renglones--;
            indice = document.getElementById("candidatos").selectedIndex;
            indice = (renglones - indice);
            clavex22 = candidatos2[indice].split("|");
            candidato_clv = clavex22[0];
        }
    */
    var nivel22 = 4;
    renglones = nivel22;
    renglones--;
    indice = document.getElementById("nivel").selectedIndex;
    var nivel_clv = indice;

    var archivo1 = servidor + "httpdocs/act_Con_Cand.php";
    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Candidato=" + candidato_clv + "&Nivel=" + nivel_clv + "&Anio=" + anios + "&Mes=" + meses;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);

    xhttp.onreadystatechange = function () {
        //        alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //          alert("paso 1.8");
            var cadena = xhttp.responseText;
            //        alert("Cadena:" + cadena);
            document.getElementById("mensaje_gral").innerHTML = cadena;
        } else {
            //      alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function altaConocim() {
    //    alert("Alta Conocimiento por Candidato");
    var vacio = "";
    //    var vacio1 = 0;
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("mensaje_conocimiento").innerHTML = vacio;

    //    var candidato = document.getElementById("candidatos").value;
    //    var candidato_clv = document.getElementById("cand_key").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var nivel = document.getElementById("nivel").value;
    var anios = document.getElementById("anios").value;
    var meses = document.getElementById("meses").value;
    //    var empresa = document.getElementById("empresas").value;
    /*
        if (candidato_clv == "" || candidato_clv == null) {
            alert("Seleccione el Candidato o realice su alta primero");
            return;
        }
    */
    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione la Vacante");
        return;
    }

    if (nivel == "Seleccione el nivel") {
        alert("Seleccione el nivel del conocimiento");
        return;
    }

    if (anios == null) {
        anios = "";
    }
    if (meses == null) {
        meses = "";
    }

    if (anios == "" && meses == "") {
        alert("Teclee los años o meses de experiencia");
        return;
    }

    if (anios == "") {
        anios = "0";
    }

    if (meses == "") {
        meses = "0";
    }

    //    alert("Conocimientos2: " + conocimientos2);
    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var indice = document.getElementById("conocimientos").selectedIndex;
    indice = (renglones - indice);
    clavex22 = conocimientos2[indice].split("|");
    var conocimiento_clv = clavex22[0];
    var nombre = clavex22[1];
    /*
        if (candidato_clv == "" || candidato_clv == null) {
            renglones = candidatos2.length;
            renglones--;
            indice = document.getElementById("candidatos").selectedIndex;
            indice = (renglones - indice);
            clavex22 = candidatos2[indice].split("|");
            candidato_clv = clavex22[0];
        }
    */
    var nivel22 = 4;
    renglones = nivel22;
    renglones--;
    indice = document.getElementById("nivel").selectedIndex;
    var nivel_clv = indice;

    if (conocimiento_clv == 0 || conocimiento_clv == "") {
        alert("Conocimiento no seleccionado: " + conocimiento_clv);
        return;
    }
    /*
        if (candidato_clv == 0 || candidato_clv == "") {
            alert("Candidato no seleccionado: " + candidato_clv);
            return;
        }
    */
    //    alert("Candidato: " + candidato_clv + "  Conocimiento: " + conocimiento_clv);

    var archivo1 = servidor + "httpdocs/reg_Con_x_Cand.php";
    var archivo2 = archivo1 + "?Conocimiento=" + conocimiento_clv + "&Candidato=" + candidato_clv + "&Nivel=" + nivel_clv + "&Anio=" + anios + "&Mes=" + meses;
    var xhttp;
    //    alert("Archivo2: " + archivo2);

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, false);
    //  $query="SELECT Con_candidato.clv_conocim, conocimientos.cono_desc, Con_candidato.con_nivel, 
    //Con_candidato.con_anios, Con_candidato.con_meses FROM Con_candidato

    xhttp.onreadystatechange = function () {
        //        alert("paso 1.7");
        if ((xhttp.readyState == 4) && (xhttp.status == 200)) {
            //            limpiaTabla();
            //            alert("paso 1.8");
            var cadena = xhttp.responseText; // Regresa le mensaje enviado por el servidor en el proceso php 
            var cadena2 = xhttp.statusText; // Regresa el texto del estatus del proceso
            var cadena3 = xhttp.responseURL; // Regresa la URL que se proceso
            var cadena4 = xhttp.getAllResponseHeaders(); // Regresa todo el estatus del proceso completo
            //          alert("Web server:  " + cadena);
            document.getElementById("mensaje_conocimiento").innerHTML = cadena;
            leeConocimCand(candidato_clv);
            //        alert("Estatus del proceso:  " + cadena2);
            //            alert("URL del proceso:  " + cadena3);
            //          alert("Informe general del proceso:  " + cadena4);
            //            document.getElementById("mensaje_gral").innerHTML = cadena;
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function consultaConocimiento() {
    //    alert("Consulta conocimiento seleccionado para el candidato");
    var vacio = "";
    var vacio1 = 0;

    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;
    document.getElementById("mensaje_conocimiento").innerHTML = vacio;

    // var candidato = document.getElementById("candidatos").value;
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
    /*
        renglones = candidatos2.length;
        renglones--;
        var posicion22 = document.getElementById("candidatos").selectedIndex;
        posicion22 = (renglones - posicion22);
        clavex22 = candidatos2[posicion22].split("|");
        var candidato_clv = clavex22[0];
    */
    var archivo1 = servidor + "httpdocs/con_Con_Cand.php";
    var archivo2 = archivo1 + "?candidato=" + candidato_clv + "&conocimiento=" + conocimiento_clv;
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
            var ids = cadena.split("|");
            //            alert("Cadena:" + cadena);

            var vacio2 = 0;
            var vacio22 = "";

            if (ids[1] == "No hay Conocimientos") {
                document.getElementById("nivel").selectedIndex = vacio2;
                document.getElementById("anios").value = vacio22;
                document.getElementById("meses").value = vacio22;

                document.getElementById("altacon").disabled = false;
                document.getElementById("actuacon").disabled = true;
                return;
            }

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo != null && campo != "") {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            var nivel = ids[2];
            document.getElementById("nivel").selectedIndex = nivel;
            document.getElementById("anios").value = ids[3];
            document.getElementById("meses").value = ids[4];
            document.getElementById("altacon").disabled = true;
            document.getElementById("actuacon").disabled = false;
        } else {
            //            alert("Estado=" + xhttp.readyState + "        Status=" + xhttp.status);
        }
    };
    xhttp.send();
}


// Conocimientio por candidato
function leeConocimCand(candidato_clv) {
    //    alert("Lee Conocimientos de candidato: " + candidato_clv);
    //    limpiaPantalla_Con();
    //    limpiaTabla(); // Limpia tabla de conocimientos del candidato consultado anteriormente
    var limpia = "";
    var vacio1 = 0;

    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = vacio1;
    document.getElementById("meses").valor = vacio1;
    document.getElementById("mensaje_gral").innerHTML = limpia;
    document.getElementById("mensaje_conocimiento").innerHTML = limpia;

    var archivo1 = servidor + "httpdocs/cat_cono_x_cand.php";
    var archivo2 = archivo1 + "?Candidato=" + candidato_clv;
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
            cadena = cadena.replace(/\"/g, "");
            //cadena = cadena.split("\n");
            //            alert(cadena);
            //            var conox1 = cadena.split(/\r?\n/);

            if (cadena == "No hay Conocimientos") {
                alert("El candidato no tiene conocimientos registrados");
                return;
            }

            var tabla = "tablaCon";
            var cuerpo = "body9";
            conoReport(cadena, tabla, cuerpo);
        } else {
            // alert("conocimientos: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}