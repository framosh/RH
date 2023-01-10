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
    limpiaTabla();
    var aviso = "";
    document.getElementById("mensaje_gral").innerHTML = aviso;

    var vacante_clv = document.getElementById("vacantes").value;
    var estatus_clv = document.getElementById("estatus_cand").selectedIndex;

    //    alert("Estatus seleccionado: " + estatus_clv);

    if (vacante_clv == "0-Seleccione una Vacante") {
        aviso = "Por favor seleccione una vacante";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    if (estatus_clv == 0) {
        aviso = "Por favor seleccione el estatus de los candidatos a consultar";
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

    leeCandidatos(vacante_clv, estatus_clv);
}


function leeCandidatos(vacante_clv, estatus) {
    //    alert("Entra a candidatos de la vacante: " + vacante_clv + "  Estatus: " + estatus);
    //    var limpia = "";
    //  document.getElementById("candidatos").innerHTML = limpia;

    var archivo1 = servidor + "httpdocs/catalogoCandidatos2.php";
    var archivo2 = archivo1 + "?vacante=" + vacante_clv + "&estatus=" + estatus;
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

            if (cadena == "0|No hay Candidatos") {
                var aviso = "No hay Candidatos con esas caracteristicas";
                document.getElementById("mensaje_gral").innerHTML = aviso;
                return;
            }
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var candidatos = cadena.split("\n");
            var tabla = "tabla15";
            var cuerpo = "cuerpo15";
            quickReport(candidatos, tabla, cuerpo);
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

var ww;

function lanzaRegistro(candidato_clv, candidato_nom) {
    //    var candidatoxx1 = document.getElementById(idcampo).value;
    //    alert("Candidato: " + candidato_nom);

    $(document).ready(function () {
        var configura_ventana = "menubar=yes, location=yes, resizable=yes, scrollbars=yes, status=yes, height=750,width=1200,top=10,left=250";
        var pagina = servidor + "cap-candidato-b.htm" + "?candidato=" + candidato_clv + "&cand_nom=" + candidato_nom;
        //        ww = window.open(pagina, 'New Window', 'height=630,width=850,top=10,left=250');
        //        ww = window.open(pagina, 'New Window', 'height=750,width=1200,top=10,left=250');
        ww = window.open(pagina, 'New Window', configura_ventana);
    });
    cargaCandidatos();
}
/*
function generaCV() {
    //    alert("Genera cv del candidato");

    $(document).ready(function () {
        var configura_ventana = "menubar=yes, location=yes, resizable=yes, scrollbars=yes, status=yes";
        var pagina = servidor + "ArhsiCV.html" + "?candidato=" + candidato_clv + "&cand_nom=" + candidato_nombre;
        ww = window.open(pagina, 'New Window7', configura_ventana);
    });
}

*/

function sale() {
    if (confirm("¿Quiere salir?")) {
        ww.close();
    }
}


function cambiaColor(campo1, campo2, campo3) {
    //    alert("Cambia de color para el campo: " + campo1);
    var campox1 = document.getElementById(campo1);
    campox1.style.backgroundColor = "SpringGreen";
    campox1.style.Color = "black";

    var campox2 = document.getElementById(campo2);
    campox2.style.backgroundColor = "SpringGreen";
    campox2.style.Color = "black";

    var campox3 = document.getElementById(campo3);
    campox3.style.backgroundColor = "SpringGreen";
    campox3.style.Color = "black";
}

function regresaColor(campo1, campo2, campo3) {
    //    alert("Cambia de color para el campo: " + campo1);
    var campox1 = document.getElementById(campo1);
    campox1.style.backgroundColor = "LightCyan";
    campox1.style.Color = "black";

    var campox2 = document.getElementById(campo2);
    campox2.style.backgroundColor = "LightCyan";
    campox2.style.Color = "black";

    var campox3 = document.getElementById(campo3);
    campox3.style.backgroundColor = "LightCyan";
    campox3.style.Color = "black";
}