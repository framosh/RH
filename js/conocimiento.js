/* LANZA REPORTE EN PANTALLA */
function reporteConocimiento() {
    window.location.href = "httpdocs/rdva3_Conocimiento.php";
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelConocimiento() {
    window.location.href = "httpdocs/sp_Conocimientos.php";
}

/* LIMPIA PANTALLA  */
function limpiaPantalla() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("descripcion").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
}

function actualizaConocimiento() {
    //    alert("Actualiza Conocimiento");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var llave1 = document.getElementById("conocimientos").value;
    var nombre = document.getElementById("descripcion").value;

    if (llave1 == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    var clavex22 = [];
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/act_Conocimiento.php";
    var archivo2 = archivo1 + "?Clave=" + conocimiento_clv + "&Nombre=" + nombre;
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

function altaConocimiento() {
    //    alert("Alta Conocimiento");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var nombre = document.getElementById("descripcion").value;

    var archivo1 = servidor + "httpdocs/reg_Conocimiento.php";
    var archivo2 = archivo1 + "?Descripcion=" + nombre;
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

function consultaConocimiento() {
    //    alert("Consulta Conocimiento");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;

    var llave1 = document.getElementById("conocimientos").value;

    if (llave1 == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    var clavex22 = [];
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    //    alert("Clave conocimiento:" + conocimiento_clv + "  Posicion:" + conocimientox22);

    var archivo1 = servidor + "httpdocs/consultaConocimiento.php";
    var archivo2 = archivo1 + "?clave=" + conocimiento_clv;
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

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            document.getElementById("descripcion").value = ids[1];
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

var conocimientos2 = [];

function leeConocimientos() {
    //    alert("Lee Conocimientos");
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    limpiaPantalla();
    var vacante_clv = "";
    //    document.getElementById("conocimientos").innerHTML = limpia;
    var archivo1 = servidor + "httpdocs/catalogoConocimientos.php";
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
            //            document.getElementById("mensaje_vacante").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

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