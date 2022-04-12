function puestos() {
    //window.location.href = "httpdocs/puestos.htm";
    var aplica = 'puestos';
    lanzaAplicacion(aplica);
    leePuestos();
}

// Reporte por pantalla
function reporte() {
    var empresa = document.getElementById("empresas").value;
    var estatus = document.getElementById("Estatus").value;

    var nombre;
    var campo;
    var cliente_clv = 0;

    for (var i = 0; i < cliente2.length; i++) {
        nombre = cliente2[i].split("|");
        campo = nombre[1];
        if (campo == empresa) {
            cliente_clv = nombre[0];
            //            alert("Cliente: (" + cliente_clv + ") - (" + nombre1 + ")");
            break;
        }
    }

    if (empresa == "Seleccione una Empresa") {
        empresa = "Todas";
    }

    window.location.href = "httpdocs/rdva2_Vacantes.php?Estatus=" + estatus + "&empresa=" + cliente_clv + "&nombre=" + empresa;
}

// Reporte por Excel
function rep_excel() {
    var empresa = document.getElementById("empresas").value;
    var estatus = document.getElementById("Estatus").value;

    var nombre;
    var campo;
    var cliente_clv = 0;

    for (var i = 0; i < cliente2.length; i++) {
        nombre = cliente2[i].split("|");
        campo = nombre[1];
        if (campo == empresa) {
            cliente_clv = nombre[0];
            //            alert("Cliente: (" + cliente_clv + ") - (" + nombre1 + ")");
            break;
        }
    }

    if (empresa == "Seleccione una Empresa") {
        empresa = "Todas";
    }

    window.location.href = "httpdocs/sp_vacantes.php?Estatus=" + estatus + "&empresa=" + cliente_clv + "&nombre=" + empresa;
}


function limpiaPantalla() {
    //    alert("limpiaPantalla");
    var vacio = "";
    var opcion = 0;
    document.getElementById("empresas").selectedIndex = opcion;
    document.getElementById("vacantes").selectedIndex = opcion;
    document.getElementById("vacante").value = vacio;
    document.getElementById("nvac").value = vacio;
    document.getElementById("altav").disabled = false;
    document.getElementById("actualizav").disabled = true;
    document.getElementById("Estatus").selectedIndex = opcion;

    limpiaPantalla2();
}

function limpiaPantalla2() {
    //   alert("limpiaPantalla2");
    var vacio = "";
    var opcion = 0;
    document.getElementById("vacante").value = vacio;
    document.getElementById("nvac").value = vacio;
    document.getElementById("puestos").selectedIndex = opcion;
    document.getElementById("Nivel").selectedIndex = opcion;
    document.getElementById("Requisitos").value = vacio;
    document.getElementById("Funciones").value = vacio;
    document.getElementById("Lugar").value = vacio;
    document.getElementById("Horario").value = vacio;
    document.getElementById("Obs").value = vacio;

    document.getElementById("sdo1").value = opcion;
    document.getElementById("sdo2").value = opcion;
    document.getElementById("edad1").value = opcion;
    document.getElementById("edad2").value = opcion;
    document.getElementById("fechar").value = vacio;
    document.getElementById("mensaje_vacante").textContent = "";
}

// Consulta vacante
function cargaDatos() {
    limpiaPantalla2();
    var vacante = document.getElementById("vacantes").value;
    document.getElementById("altav").disabled = true;
    document.getElementById("actualizav").disabled = false;
    //    document.getElementById("Clave").setAttribute('value', vacante);
    var vacante_clv;
    var nombre1;

    if (vacante == "Seleccione una Vacante") {
        alert("Seleccione una Vacante");
        return;
    }

    for (var i5 = 0; i5 < vacante2.length; i5++) {
        var nombre = vacante2[i5].split("|");
        var campo = nombre[1];
        if (campo == vacante) {
            vacante_clv = nombre[0];
            nombre1 = nombre[1];
            //            alert("Vacante: (" + vacante_clv + ") - (" + nombre1 + ")");
            break;
        }
    }

    document.getElementById("vacante").value = vacante_clv;
    document.getElementById("nvac").value = nombre1;

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/consultav.php";
    var archivo1 = servidor + "httpdocs/consultav.php";
    var archivo2 = archivo1 + "?Clave=" + vacante_clv;
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
            var ids = cadena.split("|");
            //            document.getElementById("mensaje_vacante").innerHTML = cadena;
            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo.length > 0) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //                    alert("campo: (" + i + ") - (" + ids[i] + ")");
                }
            }

            var opcion3 = 0;
            var opcion4 = 0;

            for (var i2 = 0; i2 < cliente2.length; i2++) {
                var campo2 = cliente2[i2];
                var clave = campo2.split("|");
                if (campo2) {
                    opcion3++;
                    if (clave[0] == ids[1]) {
                        opcion4 = (cliente2.length - opcion3);
                        break;
                    }
                }
            }

            for (var i3 = 0; i3 <= 0; i3++) {
                if (ids[i3] == null) {
                    ids[i3] = "";
                    if ((i3 >= 9 && i3 <= 13) || (i3 == 3) || (i3 == 6)) {
                        ids[i3] = 0;
                    }
                }
            }

            var posicion = 0;
            var clave2x = "";
            var clave3x = "";
            var clave4x = "";

            if (ids[3] != 0 && ids[3] != "") {
                for (var i5 = 0; i5 < puestos2.length; i5++) {
                    clave2x = puestos2[i5].split("|");
                    clave3x = clave2x[0];
                    if (clave3x != ids[3]) {
                        posicion++;
                    } else {
                        break;
                    }
                    clave4x = posicion;
                }
                posicion++;
                clave4x = (puestos2.length - posicion);
            } else {
                clave4x = "0";
                ids[6] = "0";
            }

            var opcion = ids[15];
            document.getElementById("puestos").selectedIndex = clave4x;
            document.getElementById("Nivel").selectedIndex = ids[6];
            document.getElementById("Requisitos").value = ids[5];
            document.getElementById("Funciones").value = ids[4];
            document.getElementById("Lugar").value = ids[7];
            document.getElementById("Horario").value = ids[8];
            document.getElementById("Obs").value = ids[9];

            document.getElementById("fechar").value = ids[10];
            document.getElementById("sdo1").value = ids[11];
            document.getElementById("sdo2").value = ids[12];
            document.getElementById("edad1").value = ids[13];
            document.getElementById("edad2").value = ids[14];
            document.getElementById("Estatus").selectedIndex = opcion;
        }
    };
}

var tipo = "";

function actualizaVacante() {
    //    alert("Actualiza vacante");
    tipo = "actualiza";
    registroVacante();
}

/* ALTA VACANTES  */
function registroVacante() {
    //    alert("Graba vacante");
    var tipo2 = tipo;

    var empresa = document.getElementById("empresas").value;
    var vacante = document.getElementById("vacante").value;
    var nvacante = document.getElementById("nvac").value;

    var puesto = document.getElementById("puestos").value;
    var nivel = document.getElementById("Nivel").value;
    var requisitos = document.getElementById("Requisitos").value;
    var funciones = document.getElementById("Funciones").value;
    var lugar = document.getElementById("Lugar").value;
    var horario = document.getElementById("Horario").value;
    var obs = document.getElementById("Obs").value;
    var sueldo1 = document.getElementById("sdo1").value;
    var sueldo2 = document.getElementById("sdo2").value;
    var edad1 = document.getElementById("edad1").value;
    var edad2 = document.getElementById("edad2").value;
    var fecha = document.getElementById("fechar").value;
    var estatus = document.getElementById("Estatus").value;
    var cliente_clv = 0;
    var puesto_clv = 0;

    if (nvacante == null) {
        nvacante = "";
    }

    if (fecha == "" || fecha == null) {
        alert("Capture la fecha de inicio de vacante");
        return;
    }

    if (nivel == "Seleccione el nivel de conocimientos") {
        alert("Seleccione el nivel de conocimientos");
        return;
    } else {
        if (nivel == "Sr.") {
            nivel = "1";
        }
        if (nivel == "Medio") {
            nivel = "2";
        }
        if (nivel == "Jr.") {
            nivel = "3";
        }
    }

    if (puesto == "Seleccione el puesto") {
        alert("Seleccione el Puesto");
        return;
    }

    var puestox22 = document.getElementById("puestos").selectedIndex;
    puestox22 = (puestos2.length - puestox22);
    puestox22--;
    var clavex22 = [];
    clavex22 = puestos2[puestox22].split("|");
    puesto_clv = clavex22[0];

    if (estatus == "Seleccione el estatus de la vacante") {
        alert("Seleccione el estatus de las vacantes a consultar");
        return;
    } else {
        if (estatus == "Activa") {
            estatus = "1";
        }
        if (estatus == "Cerrada") {
            estatus = "2";
        }
        if (estatus == "Cancelada") {
            estatus = "3";
        }
    }

    if (nvacante == "") {
        alert("Seleccione una Vacante o asigne un nombre de vacante");
        return;
    }

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    var nombre;
    var nombre1;
    var campo;

    for (var i = 0; i < cliente2.length; i++) {
        nombre = cliente2[i].split("|");
        campo = nombre[1];
        if (campo == empresa) {
            cliente_clv = nombre[0];
            nombre1 = nombre[1];
            //            alert("Cliente: (" + cliente_clv + ") - (" + nombre1 + ")");
            break;
        }
    }

    if (vacante == null) {
        vacante = "";
    }

    //var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/registrov2.php";

    var archivo1 = "";
    if (tipo2 == "actualiza") {
        if (vacante != "") {
            archivo1 = servidor + "httpdocs/actualizav2.php";
        } else {
            archivo1 = servidor + "httpdocs/registrov2.php";
        }
    } else {
        if (vacante == "") {
            archivo1 = servidor + "httpdocs/registrov2.php";
        } else {
            archivo1 = servidor + "httpdocs/actualizav2.php";
        }
    }

    //    var actual_url;
    //  actual_url = window.location.href;
    //    alert("Actual Url: " + actual_url);
    //  alert("Archivo1: " + archivo1);

    var datosx1 = [];
    datosx1[0] = cliente_clv;
    datosx1[1] = vacante;
    datosx1[2] = nvacante;
    datosx1[3] = puesto_clv;
    datosx1[4] = nivel;
    datosx1[5] = requisitos;
    datosx1[6] = funciones;
    datosx1[7] = lugar;
    datosx1[8] = sueldo1;
    datosx1[9] = sueldo2;
    datosx1[10] = edad1;
    datosx1[11] = edad2;
    datosx1[12] = estatus;
    datosx1[13] = fecha;
    datosx1[14] = horario;
    datosx1[15] = obs;

    var camposx2 = datosx1.join("|");
    var archivo2 = archivo1 + "?datosx2=" + camposx2;

    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //      alert("Paso 1");
        if (this.readyState == 4 && this.status == 200) {
            //            alert("Paso 2");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_vacante").textContent = cadena;
            //            alert("Cadena: " + cadena);

            var vacantex1 = cadena.split(":");
            //            alert("Array length:" + vacantex1.length);
            if (vacantex1.length > 1) {
                var vacantex2 = vacantex1[1];
                document.getElementById("vacante").value = vacantex2;
            }
            //            send(nvacante, nivel, sueldo1);
        }
    };
}

/*
function send(Puesto, Nivel, Sueldo) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "federicoramos57@gmail.com",
        Password: "Orion-80386",
        to: "soporte@arhsi.com.mx",
        subjet: "Nueva vacante dada de alta",
        message: nl2br("Puesto: " + Puesto + "\n  Nivel:" + Nivel + "\n Sueldo:" + Sueldo, false),
        from: "federicoramos57@gmail.com",
        headers: "From:".from,
        Body: message,
    }).then(alert("Mensaje enviado desde Gmail"));
}
*/
var puestos2 = [];

function leePuestos() {
    //    alert("Entra a leePuestos");
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var limpia = "";
    document.getElementById("puestos").innerHTML = limpia;
    var archivo2 = servidor + "httpdocs/catalogoPuestos.php";
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
            //            document.getElementById("mensaje_vacante").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var puestos = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < puestos.length; i++) {
                var campo = puestos[i];
                if (campo) {
                    puestos2[i2] = campo.trim();
                    puestos2[i2] = puestos2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            puestos2[i2] = "0|Seleccione el puesto";
            var select = document.getElementById("puestos");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = puestos2[i1].split("|");
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
    document.getElementById("vacantes").innerHTML = limpia;

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
            //            document.getElementById("mensaje_vacante").textContent = "(" + cadena + ")" + "  longitud: (" + cadena.length + ")";

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

var vacante2 = [];

function leeVacantes() {
    //alert("Entra a Carga de Clientes ");
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;
    var empresa = document.getElementById("empresas").value;
    var estatus = document.getElementById("Estatus").value;
    limpiaPantalla2();

    var cliente_clv = "";
    var nombre1 = "";

    if (empresa == "Seleccione una Empresa") {
        alert("Seleccione una Empresa");
        return;
    }

    if (estatus == "Seleccione el estatus de la vacante") {
        alert("Seleccione el estatus de las vacantes a consultar");
        //        return;
        estatus = "0";
    } else {
        if (estatus == "Activa") {
            estatus = "1";
        }
        if (estatus == "Cerrada") {
            estatus = "2";
        }
        if (estatus == "Cancelada") {
            estatus = "3";
        }
    }

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
            //            document.getElementById("mensaje_vacante").textContent = "(" + cadena + ")" + "        longitud: (" + cadena.length + ")";

            var clientes = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < clientes.length; i++) {
                var campo = clientes[i];
                if (campo) {
                    vacante2[i2] = campo.trim();
                    vacante2[i2] = vacante2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }

            vacante2[i2] = "0|Seleccione una Vacante";
            var select = document.getElementById("vacantes");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = vacante2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}