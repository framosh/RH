//var servidor_local = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";

/* LIMPIA PANTALLA Y CARGA CATALOGO DE ESTADOS */
function limpiaPantalla() {
    //alert("Inicializa pantalla para nuevo registro");
    //    saldo=0;
    //    document.getElementById("forma_permisos").reset();
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_permisos").innerHTML = vacio;
    document.getElementById("descripcion").innerHTML = vacio;
    document.getElementById("aplicaciones").selectedIndex = vacio1;
    document.getElementById("puestos").selectedIndex = vacio1;
}

function limpiaPantalla2() {
    var vacio = '';
    //    alert("Inicializa pantalla dos");
    document.getElementById("mensaje_permisos").innerHTML = vacio;
    document.getElementById("descripcion").innerHTML = vacio;
    document.getElementById("permisoTipo0").checked = false;
    document.getElementById("permisoTipo1").checked = false;
    document.getElementById("permisoTipo2").checked = false;
    document.getElementById("permisoTipo3").checked = false;
}

function limpiaPantalla3() {
    //    limpiaTabla();
    limpiaPantalla2();
}


function consultaAplicacion() {
    var aplicacion = document.getElementById("aplicaciones").value;
    var puesto = document.getElementById("puestos").value;
    var aviso;

    if (aplicacion == "Seleccione la aplicacion") {
        aviso = "Por favor seleccione una Aplicacion";
        document.getElementById("mensaje_permisos").innerHTML = aviso;
        return;
    }

    if (puesto == "Seleccione el puesto") {
        aviso = "Por favor seleccione un Puesto";
        document.getElementById("mensaje_permisos").innerHTML = aviso;
        return;
    }

    limpiaPantalla2();
    var aplicacionx = 0;
    var nombre, campo;

    for (var i = 0; i < aplicacion2.length; i++) {
        nombre = aplicacion2[i].split("|");
        campo = nombre[1];
        if (campo == aplicacion) {
            aplicacionx = nombre[0].trim();
            break;
        }
    }

    var puestox = 0;
    for (i = 0; i < puesto2.length; i++) {
        nombre = puesto2[i].split("|");
        campo = nombre[1];
        if (campo == puesto) {
            puestox = nombre[0].trim();
            break;
        }
    }

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaAplPuesto.php";
    var archivo1 = servidor + "httpdocs/consultaAplPuesto.php";
    var archivo2 = archivo1 + "?aplicacion=" + aplicacionx + "&puesto=" + puestox;
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

            //            alert("Consulta: " + cadena);

            if (cadena == "No hay permisos asignados") {
                document.getElementById("mensaje_permisos").innerHTML = cadena;
                return;
            }

            //    document.getElementById("mensaje_admonCred").innerHTML=cadena;
            var ids = cadena.split("|");

            for (var i1 = 0; i1 < ids.length; i1++) {
                if (ids[i1] == null) {
                    ids[i1] = "";
                }
                var campo = ids[i1];
                if (campo != null && campo != "") {
                    ids[i1] = ids[i1].replace(/\"/g, "");
                    ids[i1] = ids[i1].trim();
                    //           alert("campo: ("+i1+") - ("+ids[i1]+")");
                }
            }

            var permiso1 = ids[2].split("-");
            var descrip1 = ids[3];
            var i = 0;

            for (i = 0; i <= 3; i++) {
                var permisox = "permisoTipo" + i;

                switch (permiso1[i]) {
                    case "0":
                        document.getElementById(permisox).checked = false;
                        break;
                    case "1":
                        document.getElementById(permisox).checked = true;
                        break;
                    default:
                        document.getElementById(permisox).checked = false;
                        break;
                }
            }

            document.getElementById("descripcion").innerHTML = descrip1;
            //    consultaTickets(cliente); // Consulta los tickets de venta pendientes de pago o pagados parcialmente
        }
    };
}

function actualizaPermiso() {
    if (cambio == false || baja == false) {
        alert("No tiene permiso para modificar");
        return;
    }

    var aplicacion = document.getElementById("aplicaciones").value;
    var puesto = document.getElementById("puestos").value;
    var alta1 = document.getElementById("permisoTipo0").checked; // Alta
    var baja1 = document.getElementById("permisoTipo1").checked; // Baja
    var cambio1 = document.getElementById("permisoTipo2").checked; // Cambio
    var consulta1 = document.getElementById("permisoTipo3").checked; // Consulta

    var usuario2 = dato4[0];
    var aviso;
    var nombre, campo, i;

    if (aplicacion == "Seleccione la aplicacion") {
        aviso = "Por favor seleccione una Aplicacion";
        document.getElementById("mensaje_permisos").innerHTML = aviso;
        return;
    }

    var aplicacionx = 0;
    for (i = 0; i < aplicacion2.length; i++) {
        nombre = aplicacion2[i].split("|");
        campo = nombre[1];
        if (campo == aplicacion) {
            aplicacionx = nombre[0].trim();
            break;
        }
    }

    if (puesto == "Seleccione el puesto") {
        aviso = "Por favor seleccione un Puesto";
        document.getElementById("mensaje_permisos").innerHTML = aviso;
        return;
    }

    var puestox = 0;
    for (i = 0; i < puesto2.length; i++) {
        nombre = puesto2[i].split("|");
        campo = nombre[1];
        if (campo == puesto) {
            puestox = nombre[0].trim();
            break;
        }
    }

    var alta3, baja3, cambio3, consulta3;
    alta3 = "0";
    baja3 = "0";
    cambio3 = "0";
    consulta3 = "0";

    if (alta1 == true) {
        alta3 = "1";
    }
    if (baja1 == true) {
        baja3 = "1";
    }
    if (cambio1 == true) {
        cambio3 = "1";
    }
    if (consulta1 == true) {
        consulta3 = "1";
    }

    var permisos = alta3 + "-" + baja3 + "-" + cambio3 + "-" + consulta3;

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_AplicacionEst.php";
    var archivo1 = servidor + "httpdocs/act_AplicacionEst.php";
    var archivo2 = archivo1 + "?aplicacion=" + aplicacionx + "&permisos=" + permisos + "&puesto=" + puestox + "&usuario=" + usuario2;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_permisos").innerHTML = cadena;
            consultaApliAsignadas();
        }
    };
}

function nuevoPuesto() {
    limpiaPantalla2();
    limpiaTabla();
    consultaApliAsignadas();
}

/* CONSULTA APLICACIONES ASIGNADAS AL PUESTO */
function consultaApliAsignadas() {
    var aviso = "";
    document.getElementById("mensaje_permisos").innerHTML = aviso;

    var puesto = document.getElementById("puestos").value;
    aviso = "Consulta aplicaciones";

    if (puesto == "Seleccione el puesto") {
        aviso = "Por favor seleccione un Puesto";
        document.getElementById("mensaje_permisos").innerHTML = aviso;
        return;
    }

    //document.getElementById("aplicaciones").selectedIndex='0';
    //limpiaPantalla2();
    //limpiaTabla();

    var puestox = 0;
    for (var i = 0; i < puesto2.length; i++) {
        var nombre = puesto2[i].split("|");
        var campo = nombre[1];
        if (campo == puesto) {
            puestox = nombre[0].trim();
            break;
        }
    }

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaAplicaciones.php";
    var archivo1 = servidor + "httpdocs/consultaAplicaciones.php";
    var archivo2 = archivo1 + "?puesto=" + puestox;
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

            if (cadena == "No hay Aplicaciones asignadas") {
                document.getElementById("mensaje_permisos").innerHTML = cadena;
                return;
            }

            //        document.getElementById("mensaje_permisos").innerHTML=cadena;

            var aplicacion = cadena.split("\n");
            //        var bloques = 0;
            var renglon4 = 0;
            var contador = 0;
            var apli4 = 0;
            apli4 = aplicacion.length;
            apli4--;
            var linea = [];
            //          creaEncabezado1();
            //      alert("Aplicaciones:"+apli4);

            for (var i4 = contador; i4 < apli4; i4++) {
                //            alert("Aplicacion: "+aplicacion[i4]+" i4:"+i4);
                if ((aplicacion[i4] != null) && (aplicacion[i4] != "")) {
                    linea = aplicacion[i4].split("|");
                    //                alert("Aplicacion: "+aplicacion[i4]+"  renglon:"+renglon4);
                    despliegaTabla(linea, renglon4);
                    renglon4++;
                }
            }
            renglones2 = renglon4 - 1;
        }
    };
}

var aplicacion2 = [];

function leeAplicaciones() {
    //    alert("Catalogo de Aplicaciones");
    //limpiaPantalla();

    //var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoAplicaciones.php";
    var archivo2 = servidor + "httpdocs/catalogoAplicaciones.php";
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
            //    document.getElementById("mensaje_puesto").textContent="("+cadena+")"+"        longitud: ("+cadena.length+")";
            var aplicacion = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < aplicacion.length; i++) {
                var campo = aplicacion[i];
                if (campo) {
                    aplicacion2[i2] = campo.trim();
                    aplicacion2[i2] = aplicacion2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+puesto2[i2]+")");
                    i2++;
                }
            }

            aplicacion2[i2] = "0|Seleccione la aplicacion";
            var select = document.getElementById("aplicaciones");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = aplicacion2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    //   var renglones =6;
    //   creaTabla(renglones);   // CREA TABLA DE ACUERDO A LOS RENGLONES ENCONTRADOS
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

var puesto2 = [];

function leePuestos() {
    alert("Catalogo de puestos");
    //limpiaPantalla();
    checaPermisos();
    creaEncabezado1();
    limpiaPantalla2();

    //var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoPuestos.php";
    var archivo2 = servidor + "httpdocs/catalogoPuesto.php";
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
            //    document.getElementById("mensaje_puesto").textContent="("+cadena+")"+"        longitud: ("+cadena.length+")";
            var puesto = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < puesto.length; i++) {
                var campo = puesto[i];
                if (campo) {
                    puesto2[i2] = campo.trim();
                    puesto2[i2] = puesto2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+puesto2[i2]+")");
                    i2++;
                }
            }

            puesto2[i2] = "0|Seleccione el puesto";
            var select = document.getElementById("puestos");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = puesto2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}