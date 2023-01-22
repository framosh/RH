window.onload = function () {
    elige_servidor();
    leeInstituciones();
    window.resizeTo(680, 460);
};

/* LANZA REPORTE DE INSTITUCIONES POR PANTALLA */
function reporteInstitucionPant() {
    //window.location.href = "httpdocs/rdva3_contactos.php?Cliente="+cliente+"&nCliente="+nombrecl;
    window.location.href = servidor + "httpdocs/rdva3_Institucion.php";
}

function salir() {
    if (confirm("¿Quiere salir?")) {
        //        var ww = window.open(window.location, '_self');
        //        var ww = window.open(window.location.pathname);
        //       var ww = window.open(window.location.href);
        //    var ww1 = window.location.href;
        window.close(window.location, '_self');
        //        window.close();

    }
}

/* LIMPIA PANTALLA  */
function limpiaPantalla() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("instituciones").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clv_inst").value = vacio;
    document.getElementById("mensaje_gral_inst").innerHTML = vacio;
    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = true;
}

function actualizaInstitucion() {
    //    alert("Actualiza Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_inst").innerHTML = vacio;
    var llave1 = document.getElementById("instituciones").value;
    var nombre = document.getElementById("nombre").value;

    if (llave1 == "Seleccione la Institución") {
        alert("Seleccione la Institución");
        return;
    }

    var renglones = instituciones2.length;
    renglones--;
    var institucionesx22 = document.getElementById("instituciones").selectedIndex;
    institucionesx22 = (renglones - institucionesx22);
    var clavex22 = [];
    clavex22 = instituciones2[institucionesx22].split("|");
    var institucion_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/act_Institucion.php";
    var archivo2 = archivo1 + "?Clave=" + institucion_clv + "&Nombre=" + nombre;
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
            document.getElementById("mensaje_gral_inst").innerHTML = cadena;
        }
    };
}

function altaInstitucion() {
    //    alert("Alta Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_inst").value = vacio;

    var nombre = document.getElementById("nombre").value;

    var archivo1 = servidor + "httpdocs/reg_Institucion.php";
    var archivo2 = archivo1 + "?Nombre=" + nombre;
    var xhttp;

    //    alert("archivo2: " + archivo2);

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
            //          alert("cadena:" + cadena);
            var campos = cadena.split(":");
            document.getElementById("mensaje_gral_inst").innerHTML = cadena;
            document.getElementById("clv_inst").value = campos[1];
            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;
            leeInstituciones();
        }
    };
}

function consultaInstitucion() {
    //    alert("Consulta Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_inst").innerHTML = vacio;

    var llave1 = document.getElementById("instituciones").value;

    if (llave1 == "Seleccione la Institucion") {
        alert("Seleccione la Institucion");
        return;
    }

    var renglones = instituciones2.length;
    renglones--;
    var institucionesx22 = document.getElementById("instituciones").selectedIndex;
    institucionesx22 = (renglones - institucionesx22);
    var clavex22 = [];
    clavex22 = instituciones2[institucionesx22].split("|");
    var institucion_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/consultaInstitucion.php";
    var archivo2 = archivo1 + "?clave=" + institucion_clv;
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

            document.getElementById("clv_inst").value = institucion_clv;
            document.getElementById("nombre").value = ids[1];
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}


var instituciones2 = [];

function leeInstituciones() {
    //alert("Lee Instituciones");
    document.getElementById("clv_inst").disabled = true;
    //    limpiaPantalla();
    var archivo1 = servidor + "httpdocs/catalogoInstituciones.php";
    var archivo2 = archivo1;
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

            var instituciones = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < instituciones.length; i++) {
                var campo = instituciones[i];
                if (campo) {
                    instituciones2[i2] = campo.trim();
                    instituciones2[i2] = instituciones2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            instituciones2[i2] = "0|Seleccione la Institucion";
            var select = document.getElementById("instituciones");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = instituciones2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}