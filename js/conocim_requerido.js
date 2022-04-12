/* LANZA REPORTE EN PANTALLA */
function repConoReq() {
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/con_x_vacante_x_pantalla.php";
    var archivo2 = archivo1 + "?Vacante=" + vacante_clv + "&Nombre=" + vacante + "&Empresa=" + empresa;
    window.location.href = archivo2;
}

/* LANZA REPORTE EN EXCEL */
function repExcelConoReq() {
    var vacante = document.getElementById("vacantes").value;
    var empresa = document.getElementById("empresas").value;

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/sp_Cono_Req.php";
    var archivo2 = archivo1 + "?Vacante=" + vacante_clv + "&Nombre=" + vacante + "&Empresa=" + empresa;
    window.location.href = archivo2;
}

function limpiaPantalla() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("vacantes").selectedIndex = vacio1;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;
    document.getElementById("con_requeridos_msg").innerHTML = vacio;
    //    document.getElementById("altaconr").disabled = false;
    //  document.getElementById("actuaconr").disabled = true;
}

function actualizaConocimReque() {
    //    alert("Actualiza Conocimiento Requerido");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("con_requeridos_msg").innerHTML = vacio;

    var vacante = document.getElementById("vacantes").value;
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
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    var nivel22 = 4;
    renglones = nivel22;
    renglones--;
    posicion22 = document.getElementById("nivel").selectedIndex;
    var nivel_clv = posicion22;

    var archivo1 = servidor + "httpdocs/act_Con_Req.php";
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
            document.getElementById("con_requeridos_msg").innerHTML = cadena;
        }
    };
}

function altaConocimReque() {
    //    alert("Alta Conocimiento requerido");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("con_requeridos_msg").innerHTML = vacio;

    var vacante = document.getElementById("vacantes").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var nivel = document.getElementById("nivel").value;
    var anios = document.getElementById("anios").value;
    var meses = document.getElementById("meses").value;
    var empresa = document.getElementById("empresas").value;

    if (anios > 0 || meses > 0) {
        alert("Ya existe este conocimiento en la vacante");
        return;
    }

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

    renglones = cliente2.length;
    renglones--;
    var posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var empresa_clv = clavex22[0];

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
            document.getElementById("con_requeridos_msg").innerHTML = cadena;
            limpiaTabla();
            despliegaConocimientos();
        }
    };
}

function consultaConocimiento() {
    //    alert("Consulta conocimiento requerido por vacante");
    var vacio = "";
    var vacio1 = 0;

    document.getElementById("con_requeridos_msg").innerHTML = vacio;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").value = vacio;
    document.getElementById("meses").value = vacio;

    var vacante = document.getElementById("vacantes").value;
    var conocimiento = document.getElementById("conocimientos").value;
    var empresa = document.getElementById("empresas").value;
    document.getElementById("mensaje_gral").valor = vacio;
    document.getElementById("con_requeridos_msg").valor = vacio;

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
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

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var empresa_clv = clavex22[0];

    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    //    alert("Vacante_clv:" + vacante_clv);
    //  alert("Conocimiento:" + conocimiento_clv);

    var archivo1 = servidor + "httpdocs/con_Con_req.php";
    var archivo2 = archivo1 + "?vacante=" + vacante_clv + "&empresa=" + empresa_clv + "&conocimiento=" + conocimiento_clv;
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

                //                document.getElementById("altaconr").disabled = false;
                //              document.getElementById("actuaconr").disabled = true;
                return;
            }

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            document.getElementById("nivel").selectedIndex = ids[2];
            document.getElementById("anios").value = ids[3];
            document.getElementById("meses").value = ids[4];
            //        document.getElementById("altaconr").disabled = true;
            //      document.getElementById("actuaconr").disabled = false;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

//Despliega conocimientos registrados para la vacante en la ventana inferior
function despliegaConocimientos() {
    var limpia = "";
    var vacio1 = 0;

    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = vacio1;
    document.getElementById("meses").valor = vacio1;
    //    document.getElementById("mensaje_gral").valor = limpia;
    var vacante = document.getElementById("vacantes").value;

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione la Vacante");
        return;
    }

    var renglones = vacantes2.length;
    renglones--;

    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    var vacante_clv = clavex22[0];

    //    alert("Vacante: " + vacante_clv);

    var archivo1 = servidor + "httpdocs/catalogoConocimientos.php";
    var archivo2 = archivo1 + "?Vacante=" + vacante_clv;
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
            var cadena = xhttp.responseText;
            var conocim_cand = cadena.split("\n");
            var conocimiento_clv = conocim_cand[0];
            var nombre = conocim_cand[0];
            var nivel = conocim_cand[1];
            var anios = conocim_cand[2];
            var meses = conocim_cand[3];

            var llave = 0;
            var nvo_index = conocim_cand.length;
            nvo_index++;
            var nvo_renglon = conocimiento_clv + "|" + nombre + "|" + nivel + "|" + anios + "|" + meses + "\n";
            if (conocim_cand.length == 0) {
                conocim_cand[0] = nvo_renglon;
            } else {
                conocim_cand[nvo_index] = nvo_renglon;
            }
            //Despliegan en el cuadro de conocimientos el conocimiento registrado
            //            alert("Conocim_cand: " + conocim_cand);
            quickReport(conocim_cand);

            // var cadena = xhttp.responseText; // Regresa le mensaje enviado por el servidor en el proceso php 
            var cadena2 = xhttp.statusText; // Regresa el texto del estatus del proceso
            var cadena3 = xhttp.responseURL; // Regresa la URL que se proceso
            var cadena4 = xhttp.getAllResponseHeaders(); // Regresa todo el estatus del proceso completo
            //          alert("Web server:  " + cadena);
            //            document.getElementById("mensaje_gral").innerHTML = cadena;
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

// Despliega el catalogo general de conocimientos para asignar a la vacante
var conocimientos2 = [];

function leeConocimientos() {
    despliegaConocimientos();
    //    alert("Lee Conocimientos:");
    //    limpiaPantalla();
    var limpia = "";
    var vacio1 = 0;

    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;
    document.getElementById("con_requeridos_msg").innerHTML = limpia;

    var vacante_clv = "";
    var archivo1 = servidor + "httpdocs/catalogoConocimientos.php";
    var archivo2 = archivo1 + "?Vacante=" + vacante_clv;
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
            //            document.getElementById("con_requeridos_msg").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var conocimientos = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < conocimientos.length; i++) {
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

var vacantes2 = [];

function leeVacantes() {
    //alert("Entra a Carga de Clientes ");
    var limpia = "";
    var vacio1 = 0;
    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;
    document.getElementById("con_requeridos_msg").innerHTML = limpia;

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
            //            document.getElementById("con_requeridos_msg").textContent = "(" + cadena + ")" + "        longitud: (" + cadena.length + ")";

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

var cliente2 = [];

function leeClientes() {
    //alert("Entra a Carga de Clientes ");
    limpiaPantalla();
    var limpia = "";
    var vacio1 = 0;
    document.getElementById("vacantes").innerHTML = limpia;
    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo2 = servidor + "httpdocs/catalogoClientes.php";
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
            //            document.getElementById("con_requeridos_msg").textContent = "(" + cadena + ")" + "  longitud: (" + cadena.length + ")";

            var clientes = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < clientes.length; i++) {
                var campo = clientes[i];
                if (campo) {
                    cliente2[i2] = campo.trim();
                    cliente2[i2] = cliente2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }

            cliente2[i2] = "0|Seleccione una Empresa";
            var select = document.getElementById("empresas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = cliente2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}