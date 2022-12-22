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

/* LIMPIA PANTALLA */
function limpiaPantalla1() {
    //    alert("Limpia pantalla 1");
    var valor = "";
    var opcion2 = 0;
    document.getElementById("empresas").selectedIndex = opcion2;
    document.getElementById("vacantes").selectedIndex = opcion2;
    //    limpiaPantalla2(); // Limpia datos generales
}


function leeClientes2() {
    //    alert("Checa permisos");
    checaPermisos();
    //    alert("Lee Clientes 2");
    //  alert("limpia Pantalla");
    limpiaPantalla1(); // Limpia pantalla
    //    var limpia = "";
    //  document.getElementById("vacantes").innerHTML = limpia;
    //alert("Lee Clientes");
    leeClientes();
}

function leeVacantes2() {
    //alert("Lee Vacantes");
    var cliente = document.getElementById("empresas").value;

    if (cliente == "Seleccione una Empresa") {
        var aviso = "Por favor Seleccione una Empresa";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var renglones = cliente2.length;
    renglones--;
    var posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = cliente2[posicion22].split("|");
    var cliente_clv = clavex22[0];

    leeVacantes3(cliente_clv);
}

var vacantes2 = [];

function leeVacantes3(cliente_clv) {
    //    alert("lee vacantes del cliente: " + cliente_clv);
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;

    var estatus = 1;
    if (cliente_clv == 0 || cliente_clv == null || cliente_clv == "") {
        cliente_clv = clave_empresa;
    }

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/catalogoVacantes3.php";
    var archivo2 = archivo1 + "?Empresa=" + cliente_clv + "&estatus=" + estatus;
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
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "        longitud: (" + cadena.length + ")";

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
                var vac1 = nombre[0] + "-" + nombre[1];
                option.text = option.value = vac1;
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

//var candidatos2 = [];

function cargaCandidatos() {
    var vacante_clv = document.getElementById("vacantes").value;
    var aviso;

    if (vacante_clv == "0-Seleccione una Vacante") {
        aviso = "Por favor seleccione una vacante";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    vacante_clv = clavex22[0];
    //camposx22[13] = vacante_clv;

    leeCandidatos(vacante_clv);
}


function leeCandidatos(vacante_clv) {
    //    alert("Entra a candidatos de la vacante: " + vacante_clv);
    //    var limpia = "";
    //  document.getElementById("candidatos").innerHTML = limpia;

    var archivo1 = servidor + "httpdocs/catalogoCandidatos2.php";
    var archivo2 = archivo1 + "?vacante=" + vacante_clv;
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
            //            alert("cadena: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var candidatos = cadena.split("\n");
            var tabla = "tabla15";
            var cuerpo = "cuerpo15";
            quickReport(candidatos, tabla, cuerpo);

            /*
                        var i2 = 0;

                        for (var i = 0; i < candidatos.length; i++) {
                            var campo = candidatos[i];
                            if (campo) {
                                candidatos2[i2] = campo.trim();
                                candidatos2[i2] = candidatos2[i2].replace(/\"/g, "");
                                //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                                i2++;
                            }
                        }

                        candidatos2[i2] = "0|Seleccione el Candidato";
                        var select = document.getElementById("candidatos");

                        for (var i1 = i2; i1 >= 0; i1--) {
                            var option = document.createElement('option');
                            var nombre = candidatos2[i1].split("|");
                            option.text = option.value = nombre[1];
                            select.add(option);
                        }
                        */
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}