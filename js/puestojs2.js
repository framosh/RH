/* LANZA REPORTE EN PANTALLA */
function reportePuesto() {
    //    var archivo1="httpdocs/rdva3_Puesto.php";
    var archivo1 = servidor + "httpdocs/rdva3_PuestoUser.php";
    window.location.href = archivo1;
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelPuesto() {
    //    var archivo1="httpdocs/sp_Puesto.php";
    var archivo1 = servidor + "httpdocs/sp_PuestoUser.php";
    window.location.href = archivo1;
}

/* INICIALIZA PANTALLA  */
function limpiaPantalla_Pue2() {
    //alert("Inicializa pantalla para nuevo registro");
    //    document.getElementById("forma_puesto").reset();


    var vacio = "";
    var vacio1 = 0;
    document.getElementById("nombre").value = vacio;
    document.getElementById("estatus").selectedIndex = vacio1;
    document.getElementById("areas").selectedIndex = vacio1;
    document.getElementById("mensaje_puesto").innerHTML = vacio;
    document.getElementById("altab").disabled = false;
}

/* ALTA PERSONAL  */
function altaPuesto() {
    //        alert("Alta puesto");
    //              alert("Servidor:"+servidor);
    if (alta == false) {
        alert("No tiene permiso para dar de alta");
        return;
    }

    var nombre = document.getElementById("nombre").value;
    //alert("Alta puesto: "+nombre);
    var estatus = document.getElementById("estatus").value;
    var area = document.getElementById("areas").value;

    var usuario2 = dato4[0];
    var aviso = "";
    var estatusx = "";

    if (estatus == "Seleccione estatus") {
        aviso = "Por favor seleccione un estatus";
        document.getElementById("mensaje_puesto").innerHTML = aviso;
        return;
    }

    switch (estatus) {
        case "Activo":
            estatusx = "1";
            break;
        case "Baja":
            estatusx = "2";
            break;
        default:
            estatusx = "0";
    }

    if (area == "Seleccione el Area") {
        aviso = "Por favor seleccione una Area";
        document.getElementById("mensaje_puesto").innerHTML = aviso;
        return;
    }

    var areax = 0; // Area    
    for (var i = 0; i < area2.length; i++) {
        var clave = area2[i].split('|');
        if (area == clave[1]) {
            areax = clave[0];
            //       alert("Area: ("+i+") - ("+clave[1]+")");
            break;
        }
    }

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/reg_Puesto.php";
    var archivo1 = servidor + "httpdocs/reg_PuestoUser.php";
    var archivo2 = archivo1 + "?estatus=" + estatusx + "&nombre=" + nombre + "&area=" + areax;
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
            //           alert("paso 1.8");
            var cadena = xhttp.responseText;
            //             alert("Cadena:"+cadena);
            document.getElementById("mensaje_puesto").innerHTML = cadena;
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

function actualizaPuesto() {
    if (cambio == false || baja == false) {
        alert("No tiene permiso para modificar");
        return;
    }

    var puesto = document.getElementById("puestos").value;
    var area = document.getElementById("areas").value;
    var nombre = document.getElementById("nombre").value;
    var estatus = document.getElementById("estatus").value;
    var usuario2 = dato4[0];
    var aviso = "";
    //alert("Actualiza puesto: "+nombre);

    if (estatus == "Seleccione estatus") {
        aviso = "Por favor seleccione un estatus";
        document.getElementById("mensaje_puesto").innerHTML = aviso;
        return;
    }

    if (area == "Seleccione el Area") {
        aviso = "Por favor seleccione una Area";
        document.getElementById("mensaje_puesto").innerHTML = aviso;
        return;
    }

    if (puesto == "Seleccione el puesto") {
        aviso = "Por favor seleccione el puesto";
        document.getElementById("mensaje_puesto").innerHTML = aviso;
        return;
    }

    var estatusx = 0;
    switch (estatus) {
        case "Activo":
            estatusx = 1;
            break;
        case "Baja":
            estatusx = 2;
            break;
        default:
            estatusx = 0;
    }

    var puestox = 0; // Puesto
    var i, clave;
    for (i = 0; i < puesto2.length; i++) {
        clave = puesto2[i].split("|");
        if (puesto == clave[1]) {
            puestox = clave[0];
            //       alert("puesto: ("+i+") - ("+clave[1]+")");
            break;
        }
    }

    var areax = 0; // Area    
    for (i = 0; i < area2.length; i++) {
        clave = area2[i].split("|");
        if (area == clave[1]) {
            areax = clave[0];
            //       alert("Area: ("+i+") - ("+clave[1]+")");
            break;
        }
    }

    /*
    alert("Clave:"+puestox);
    alert("Area:"+areax);
    alert("Estatus:"+estatusx);
    alert("Nombre:"+nombre);
    */
    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_Puesto.php";
    var archivo1 = servidor + "httpdocs/act_PuestoUser.php";
    var archivo2 = archivo1 + "?clave=" + puestox + "&estatus=" + estatusx + "&nombre=" + nombre + "&area=" + areax;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_puesto").innerHTML = cadena;
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

function consultaPuesto() {
    document.getElementById("mensaje_puesto").innerHTML = "";
    var puesto = document.getElementById("puestos").value;
    //alert("Consulta de puesto: "+puesto);
    var puestox = 0;

    for (i = 0; i < puesto2.length; i++) {
        clave = puesto2[i].split("|");
        if (puesto == clave[1]) {
            puestox = clave[0];
            //      alert("puesto: ("+i+") - ("+clave[1]+")");
            break;
        }
    }

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaPuesto.php";
    var archivo1 = servidor + "httpdocs/consultaPuestoUser.php";
    var archivo2 = archivo1 + "?clave=" + puestox;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //       alert("paso 1.8");
            var cadena = xhttp.responseText;

            if (cadena == "No hay puesto") {
                document.getElementById("mensaje_puesto").innerHTML = cadena;
                return;
            }

            //       document.getElementById("demo8").innerHTML=cadena;
            var ids = cadena.split("|");

            for (var i2 = 0; i2 < ids.length; i2++) {
                var campo2 = ids[i2].trim();
                if (campo2 != null && campo2 != "") {
                    ids[i2] = campo2.replace(/\"/g, "");
                    //             alert("campo2: ("+i2+") - ("+ids[i2]+")");
                }
            }

            var areax = 0; // Area
            if (ids[3] != "") {
                for (var i = 0; i < area2.length; i++) {
                    var clave = area2[i].split("|");
                    if (ids[3] == clave[0]) {
                        areax = area2.length - (i + 1);
                        //                               alert("Lugar: ("+i+") - Area: ("+clave[0]+")");
                        break;
                    }
                }
            }

            document.getElementById("nombre").value = ids[1];
            document.getElementById("estatus").selectedIndex = ids[2];
            document.getElementById("areas").selectedIndex = areax;
            document.getElementById("altab").disabled = true;

        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

var puesto2 = [];
/* CARGA puestoS  */
function leePuestos() {
    alert("Catalogo de puestos de usuarios");
    //    limpiaPantalla_Pue2();

    //    var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoPuestos.php";
    var archivo2 = servidor + "httpdocs/cat_Puestos_User.php";
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;
            //    document.getElementById("mensaje_puesto").textContent="("+cadena+")"+"        longitud: ("+cadena.length+")";
            var puesto = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < puesto.length; i++) {
                var campo = puesto[i];
                if (campo != null && campo != "") {
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
    xhttp.send();
    //    xhttp.disabled();
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

var area2 = [];
/* CARGA AREAS  */
function leeAreas() {
    checaPermisos();
    //alert("Catalogo de Areas");
    limpiaPantalla_Pue2();

    //var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoAreas.php";
    var archivo2 = servidor + "httpdocs/catalogoAreas.php";
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;

            //    document.getElementById("mensaje_area").textContent="("+cadena+")"+"        longitud: ("+cadena.length+")";

            var area = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < area.length; i++) {
                var campo = area[i];
                if (campo != null && campo != "") {
                    area2[i2] = campo.trim();
                    area2[i2] = area2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+area2[i2]+")");
                    i2++;
                }
            }

            area2[i2] = "0|Seleccione el Area";
            var select = document.getElementById("areas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = area2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}