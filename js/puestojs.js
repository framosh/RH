/* LANZA REPORTE EN PANTALLA */
function reportePuesto() {
    //    var archivo1="httpdocs/rdva3_Puesto.php";
    var archivo1 = servidor + "httpdocs/rdva3_Puesto.php";
    window.location.href = archivo1;
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelPuesto() {
    //    var archivo1="httpdocs/sp_Puesto.php";
    var archivo1 = servidor + "httpdocs/sp_Puesto.php";
    window.location.href = archivo1;
}

/* INICIALIZA PANTALLA  */
function limpiaPantalla_Pue() {
    //alert("Inicializa pantalla para nuevo registro");
    //    document.getElementById("forma_puesto").reset();
    document.getElementById("mensaje_puesto").innerHTML = "";

    var vacio = "";
    document.getElementById("nombre").value = vacio;
    document.getElementById("clave").value = vacio;
    document.getElementById("nivel").selectedIndex = "0";
    document.getElementById("altap").disabled = false;
    document.getElementById("actualizap").disabled = true;
}

function altaPuesto() {
    //    alert("Alta puesto");
    //              alert("Servidor:"+servidor);
    //    var usuario2 = dato4[0];
    if (alta == false) {
        alert("No tiene permiso para dar de alta");
        return;
    }

    var nombre = document.getElementById("nombre").value;
    var nivel = document.getElementById("nivel").value;
    var nivelx = nivel;

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/reg_Puesto.php";
    var archivo1 = servidor + "httpdocs/reg_Puesto.php";
    var archivo2 = archivo1 + "?nombre=" + nombre + "&nivel=" + nivelx;
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
    var nombre = document.getElementById("nombre").value;
    var nivel = document.getElementById("nivel").value;
    //    var usuario2 = dato4[0];
    var aviso = "";
    //alert("Actualiza puesto: "+nombre);

    if (puesto == "Seleccione el puesto") {
        aviso = "Por favor seleccione el puesto";
        document.getElementById("mensaje_puesto").innerHTML = aviso;
        return;
    }

    var lugar = document.getElementById("puestos").selectedIndex;
    lugar = (6 - lugar);
    var clave = puesto2[lugar].split("|");
    var puestox = clave[0];

    var nivelx = nivel;

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_Puesto.php";
    var archivo1 = servidor + "httpdocs/act_Puesto.php";
    var archivo2 = archivo1 + "?clave=" + puestox + "&nombre=" + nombre + "&nivel=" + nivelx;
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
            document.getElementById("mensaje_puesto").innerHTML = cadena;
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

function consultaPuesto() {
    document.getElementById("mensaje_puesto").innerHTML = "";
    document.getElementById("altap").disabled = true;
    document.getElementById("actualizap").disabled = false;

    var lugar = document.getElementById("puestos").selectedIndex;
    lugar = (puesto2.length - lugar);
    lugar--;
    var clave = puesto2[lugar].split("|");
    var puestox = clave[0];
    //    alert("Puesto clave: " + clave + "  lugar:" + lugar);

    //    var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaPuesto.php";
    var archivo1 = servidor + "httpdocs/consultaPuesto.php";
    var archivo2 = archivo1 + "?clave=" + puestox;
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

            if (cadena == "0|No hay Puesto") {
                document.getElementById("mensaje_puesto").innerHTML = cadena;
                return;
            }

            var ids = cadena.split("|");

            for (var i2 = 0; i2 < ids.length; i2++) {
                var campo2 = ids[i2].trim();
                if (campo2) {
                    ids[i2] = campo2.replace(/\"/g, "");
                    //             alert("campo2: ("+i2+") - ("+ids[i2]+")");
                }
            }
            document.getElementById("nombre").value = ids[1];
            document.getElementById("clave").value = ids[0];
            document.getElementById("nivel").selectedIndex = ids[2];
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
    //    alert("Catalogo de puestos");
    limpiaPantalla_Pue();
    checaPermisos();

    //    var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoPuestos.php";
    var archivo2 = servidor + "httpdocs/catalogoPuestos.php";
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
            //            document.getElementById("mensaje_puesto").textContent = "(" + cadena + ")" + " longitud: (" + cadena.length + ")";
            var puesto = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < puesto.length; i++) {
                var campo = puesto[i];
                if (campo) {
                    puesto2[i2] = campo.trim();
                    puesto2[i2] = puesto2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puesto2[i2] + ")");
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
    xhttp.disabled();
}

var alta = false;
var baja = false;
var cambio = false;
var consulta = false;

function checaPermisos() {
    //    alert("Permnisos: " + dato4[4]);

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