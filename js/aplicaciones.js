//var servidor_local = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";

/* LANZA REPORTE EN PANTALLA */
function reporteAplicacion() {
    //    var archivo1="httpdocs/rdva3_Aplicaciones.php";
    var archivo1 = servidor + "httpdocs/rdva3_Aplicaciones.php";
    window.location.href = archivo1;
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelAplicacion() {
    //    var archivo1="httpdocs/sp_Aplicaciones.php";
    var archivo1 = servidor + "httpdocs/sp_Aplicaciones.php";
    window.location.href = archivo1;
}

/* INICIALIZA PANTALLA  */
function limpiaPantalla() {
    //alert("Inicializa pantalla para nuevo registro");
    document.getElementById("forma_aplicacion").reset();
    document.getElementById("mensaje_aplicacion").innerHTML = "";

    var vacio = "";
    document.getElementById("nombre").value = vacio;
    document.getElementById("direccion").value = vacio;
    document.getElementById("estatus").selectedIndex = "0";
    document.getElementById("descripcion").innerHTML = "";
    document.getElementById("altab").disabled = false;
}

/* ALTA PERSONAL  */
function altaAplicacion() {
    if (alta == false) {
        alert("No tiene permiso para dar de alta");
        return;
    }

    var aplicacion = document.getElementById("aplicaciones").value;
    var direccion = document.getElementById("direccion").value;
    var nombre = document.getElementById("nombre").value;
    var estatus = document.getElementById("estatus").value;
    var descripcion = document.getElementById("descripcion").value;

    var usuario2 = dato4[0];
    var aviso = "";
    var estatusx = 0;

    if (estatus == "Seleccione estatus") {
        aviso = "Por favor seleccione un estatus";
        document.getElementById("mensaje_aplicacion").innerHTML = aviso;
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

    if (aplicacion == "Seleccione la Aplicacion") {
        aviso = "Por favor seleccione una Aplicacion";
        document.getElementById("mensaje_aplicacion").innerHTML = aviso;
        return;
    }


    var aplicacionx = 0; // Aaplicacion    
    for (var i = 0; i < aplicacion2.length; i++) {
        var clave = aplicacion2[i].split("|");
        if (aplicacion == clave[1]) {
            aplicacionx = clave[0];
            //       alert("Lugar: ("+i+") - ("+clave[1]+")");
            break;
        }
    }


    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/reg_Aplicacion.php";
    var archivo1 = servidor + "httpdocs/reg_Aplicacion.php";
    var archivo2 = archivo1 + "?estatus=" + estatusx + "&nombre=" + nombre + "&descripcion=" + descripcion + "&direccion=" + direccion;
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
            //       alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_aplicacion").innerHTML = cadena;
        }
    };
}


/* ACTUALIZA DATOS  */
function actualizaAplicacion() {
    if (cambio == false || baja == false) {
        alert("No tiene permiso para modificar");
        return;
    }

    var aplicacion = document.getElementById("aplicaciones").value;
    var direccion = document.getElementById("direccion").value;
    var nombre = document.getElementById("nombre").value;
    var estatus = document.getElementById("estatus").value;
    var descripcion = document.getElementById("descripcion").value;
    var usuario2 = dato4[0];
    var aviso = "";
    //alert("Actualiza puesto: "+nombre);

    if (estatus == "Seleccione estatus") {
        aviso = "Por favor seleccione un estatus";
        document.getElementById("mensaje_aplicacion").innerHTML = aviso;
        return;
    }

    if (aplicacion == "Seleccione la Aplicacion") {
        aviso = "Por favor seleccione una Aplicacion";
        document.getElementById("mensaje_aplicacion").innerHTML = aviso;
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

    var aplicacionx = 0; // Puesto
    for (var i = 0; i < aplicacion2.length; i++) {
        var clave = aplicacion2[i].split("|");
        if (aplicacion == clave[1]) {
            aplicacionx = clave[0];
            //       alert("lugar: ("+i+") - ("+clave[1]+")");
            break;
        }
    }

    /*
    alert("Clave:"+aplicacionx);
    alert("Estatus:"+estatusx);
    alert("Nombre:"+nombre);
    */
    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_Aplicacion.php";
    var archivo1 = servidor + "httpdocs/act_Aplicacion.php";
    var archivo2 = archivo1 + "?aplicacion=" + aplicacionx + "&estatus=" + estatusx + "&nombre=" + nombre + "&descripcion=" + descripcion + "&direccion=" + direccion;
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
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_aplicacion").innerHTML = cadena;
        }
    };
}


/* CONSULTA DE INFORMACION  */
function consultaAplicacion() {
    document.getElementById("mensaje_aplicacion").innerHTML = "";
    var aplicacion = document.getElementById("aplicaciones").value;
    //alert("Consulta de puesto: "+puesto);
    var aplicacionx = 0;

    for (i = 0; i < aplicacion2.length; i++) {
        clave = aplicacion2[i].split("|");
        if (aplicacion == clave[1]) {
            aplicacionx = clave[0];
            //      alert("Posicion: ("+i+") - Aplicacion: ("+clave[1]+")");
            break;
        }
    }

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaAplicacion.php";
    var archivo1 = servidor + "httpdocs/consultaAplicacion.php";
    var archivo2 = archivo1 + "?clave=" + aplicacionx;
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
            //       alert("paso 1.8");
            var cadena = xhttp.responseText;

            if (cadena == "No hay puesto") {
                document.getElementById("mensaje_aplicacion").innerHTML = cadena;
                return;
            }

            //       document.getElementById("demo8").innerHTML=cadena;
            var ids = cadena.split("|");

            for (var i2 = 0; i2 < ids.length; i2++) {
                var campo2 = ids[i2].trim();
                if (campo2) {
                    ids[i2] = campo2.replace(/\"/g, "");
                    //             alert("campo2: ("+i2+") - ("+ids[i2]+")");
                }
            }

            var aplicacionx = 0; // Area
            if (ids[3] != "") {
                for (var i = 0; i < aplicacion2.length; i++) {
                    var clave = aplicacion2[i].split("|");
                    if (ids[3] == clave[0]) {
                        aplicacionx = aplicacion2.length - (i + 1);
                        //                               alert("Lugar: ("+i+") - Aplicacion: ("+clave[0]+")");
                        break;
                    }
                }
            }

            document.getElementById("nombre").value = ids[1];
            document.getElementById("direccion").value = ids[4];
            document.getElementById("estatus").selectedIndex = ids[2];
            document.getElementById("descripcion").value = ids[3];
            document.getElementById("altab").disabled = true;

        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
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

var aplicacion2 = [];
/* CARGA Aplicaciones  */
function leeAplicaciones() {
    //    alert("Catalogo de puestos");
    checaPermisos();
    limpiaPantalla();

    //    var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoAplicaciones.php";
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
}