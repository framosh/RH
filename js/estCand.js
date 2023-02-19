//var servidor_local = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";

/* LANZA REPORTE EN PANTALLA */
function reporteEst() {
    //var archivo1="httpdocs/rdva3_Areas.php";
    var archivo1 = servidor + "httpdocs/rdva3_Areas.php";
    window.location.href = archivo1;
}


/* INICIALIZA PANTALLA  */
function limpiaPantalla() {
    //alert("Inicializa pantalla para nuevo registro");
    //    document.getElementById("forma_area").reset();
    document.getElementById("mensaje_area").innerHTML = "";

    var vacio = "";
    var vacio2 = 0;
    document.getElementById("nombre").value = vacio;
    document.getElementById("estatus").selectedIndex = vacio2;

    document.getElementById("altab").disabled = false;
    document.getElementById("nombre").disabled = false;
}

/* ALTA PERSONAL  */
function altaEst() {
    if (alta == false) {
        alert("No tiene permiso para dar de alta");
        return;
    }

    var nombre = document.getElementById("nombre").value;
    //alert("Alta area: "+nombre);
    var estatus = document.getElementById("estatus").value;

    var usuario2 = dato4[0];
    var aviso = "";
    var estatusx = 0;

    if (estatus == "Seleccione estatus") {
        aviso = "Por favor seleccione un estatus";
        document.getElementById("mensaje_area").innerHTML = aviso;
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

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/reg_Area.php";
    var archivo1 = servidor + "httpdocs/reg_Area.php";
    var archivo2 = archivo1 + "?estatus=" + estatusx + "&nombre=" + nombre;
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
            document.getElementById("mensaje_area").innerHTML = cadena;
        }
    };
}




/* CONSULTA DE INFORMACION  */
function consEstCand() {
    var estatus = document.getElementById("estatus").value;
    //alert("Consulta de Area: "+area);

    var i, clave;

    for (i = 0; i < estCand2.length; i++) {
        clave = estCand2[i].split("|");
        if (nom_est == clave[1]) {
            clv_est = clave[0];
            //                  alert("Area a consultar: ("+i+") - ("+clave[1]+")");
            break;
        }
    }

    //    alert("Area: " + areax);

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaArea.php";
    var archivo1 = servidor + "httpdocs/consEstCand.php";
    var archivo2 = archivo1 + "?clave=" + areax;
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
            //            alert("Cadena: " + cadena);

            if (cadena == "No hay Area") {
                document.getElementById("mensaje_area").innerHTML = cadena;
                return;
            }

            //       document.getElementById("demo8").innerHTML=cadena;
            var ids = cadena.split("|");

            for (var i2 = 0; i2 < ids.length; i2++) {
                var campo2 = ids[i2].trim();
                if (campo2 != null && campo2 != "") {
                    ids[i2] = campo2.replace(/\"/g, "");
                    //                    alert("campo2: (" + i2 + ") - (" + ids[i2] + ")");
                }
            }

            //            alert("Estatus: " + ids[2]);

            document.getElementById("nombre").value = ids[1];
            document.getElementById("estatus").selectedIndex = ids[2];
            document.getElementById("altab").disabled = true;
            document.getElementById("nombre").disabled = true;

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


var estCand2 = [];
/* CARGA AREAS  */
function leeEstCand() {
    checaPermisos();
    //    alert("Catalogo de Areas");
    limpiaPantalla();

    //var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoAreas.php";
    var archivo2 = servidor + "httpdocs/catalogoAreas.php";
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

            //    document.getElementById("mensaje_area").textContent="("+cadena+")"+"        longitud: ("+cadena.length+")";

            var area = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < area.length; i++) {
                var campo = area[i];
                if (campo) {
                    estCand2[i2] = campo.trim();
                    estCand2[i2] = estCand2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+estCand2[i2]+")");
                    i2++;
                }
            }

            estCand2[i2] = "0|Seleccione el Area";
            var select = document.getElementById("areas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = estCand2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}