var cand1 = [];
var cand_clv;
var cand_nom;

window.onload = function () {
    elige_servidor();

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    var l = params.length;
    //    var url2 = document.location.href;
    //    alert("Url: " + url);
    //  alert("l: " + l);

    for (var i = 0; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1].replace(/%20/g, " ");
        cand1[i] = data[tmp[0]];
        cand1[i] = cand1[i].trim();
        //        alert("cand1: " + cand1[i] + "  i: " + i);
    }
    cand_clv = cand1[0];
    cand_nom = cand1[1];
    var nombre_candidato = cand_clv + " - " + cand_nom;
    //    alert(nombre_candidato);
    document.getElementById("nombre_candidato").innerHTML = nombre_candidato;
    leeExperiencias();
};

function reporteExpPant() {
    var clv_exp = document.getElementById("experiencias").value;
    var exp_clv;

    if (clv_exp == "Seleccione la Experiencia") {
        exp_clv = 0;
    } else {
        var renglones = experiencia2.length;
        renglones--;
        var experienciax22 = document.getElementById("experiencias").selectedIndex;
        experienciax22 = (renglones - experienciax22);
        var clavex22 = [];
        clavex22 = experiencia2[experienciax22].split("|");
        exp_clv = clavex22[0];
    }

    $(document).ready(function () {
        var pagina = servidor + "httpdocs/rdva3_ExpxCand.php" + "?Candidato=" + cand_clv + "&Nombre=" + cand_nom + "&Experiencia=" + exp_clv;
        ww = window.open(pagina, 'New Window4', 'height=630,width=1300,top=10,left=10');
    });
}


/* LIMPIA PANTALLA  */
function limpiaPantallaEXP() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("experiencias").selectedIndex = vacio1;
    document.getElementById("clv_exp").value = vacio1;
    document.getElementById("empresa").value = vacio;
    document.getElementById("puesto").value = vacio;
    document.getElementById("periodo").value = vacio;
    document.getElementById("sueldo").value = vacio;
    document.getElementById("jefe").value = vacio;
    document.getElementById("actividades").value = vacio;
    document.getElementById("motivo").value = vacio;
    document.getElementById("herramientas").value = vacio;
    document.getElementById("mensaje_gral_exp").value = vacio;
    document.getElementById("altaexp").disabled = false;
    document.getElementById("actuaexp").disabled = true;
}

function actualizaExp() {
    //    alert("Actualiza Experiencia");
    var tipo_mov = 2; // Estatus para modificación de registro
    altaExp(tipo_mov);
}


function altaExp(tipo_mov) {
    //  alert("Alta Experiencia");
    var vacio = "";
    var experiencia = [];

    document.getElementById("mensaje_gral_exp").value = vacio;

    var experienciax = document.getElementById("experiencias").value;

    if (experienciax == "Teclee la experiencia" && tipo_mov == 2) {
        alert("Seleccione la experiencia a actualizar");
        return;
    }

    experiencia[0] = document.getElementById("clv_exp").value;
    experiencia[1] = document.getElementById("empresa").value;
    experiencia[2] = document.getElementById("puesto").value;
    experiencia[3] = document.getElementById("periodo").value;
    experiencia[4] = document.getElementById("sueldo").value;
    experiencia[5] = document.getElementById("jefe").value;
    experiencia[6] = document.getElementById("actividades").value;
    experiencia[7] = document.getElementById("motivo").value;
    experiencia[8] = document.getElementById("herramientas").value;
    experiencia[9] = cand_clv;

    if (experiencia[4].length > 1) {
        experiencia[4] = experiencia[4].replace(/[^a-zA-Z0-9]/g, '_');
        alert("Sueldo: " + experiencia[4]);
    }

    if (experiencia[9].length > 1) {
        experiencia[9] = experiencia[9].replace(/[^a-zA-Z0-9]/g, '_');
        alert("Candidato: " + experiencia[9]);
    }


    if (experiencia[1] == "" || experiencia[1] == null) {
        alert("Teclee la Empresa");
        return;
    }

    if (experiencia[2] == "" || experiencia[1] == null) {
        alert("Teclee el Puesto");
        return;
    }

    if (experiencia[3] == "" || experiencia[1] == null) {
        alert("Teclee el periodo laborado");
        return;
    }

    if (experiencia[6] == "" || experiencia[1] == null) {
        alert("Teclee las actividades realizadas");
        return;
    }

    for (var i1 = 0; i1 < 9; i1++) {
        if (experiencia[i1].length <= 1) {
            experiencia[i1] = " ";
        }
        experiencia[i1] = experiencia[i1] + "|";
    }

    var archivo1;

    if (tipo_mov == 2) {
        archivo1 = servidor + "httpdocs/act_exp_x_cand.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_exp_x_cand.php";
    }

    var archivo2 = archivo1 + "?Experiencia=" + experiencia;
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
            //            alert("cadena:" + cadena);
            var campos = cadena.split(":");
            document.getElementById("mensaje_gral_exp").value = cadena;
            if (campos[1] > 0 && tipo_mov != 2) {
                document.getElementById("clv_exp").value = campos[1];
            }
        }
    };
}

function consultaExp() {
    //    alert("Consulta Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_exp").value = vacio;

    var clv_exp = document.getElementById("experiencias").value;

    if (clv_exp == "Seleccione la Experiencia") {
        alert("Seleccione la Experiencia");
        return;
    }

    var renglones = experiencia2.length;
    renglones--;
    var experienciax22 = document.getElementById("experiencias").selectedIndex;
    experienciax22 = (renglones - experienciax22);
    var clavex22 = [];
    clavex22 = experiencia2[experienciax22].split("|");
    var exp_clv = clavex22[0];

    document.getElementById("clv_exp").value = exp_clv;

    var archivo1 = servidor + "httpdocs/consExp_x_Cand.php";
    var archivo2 = archivo1 + "?Candidato=" + cand_clv + "&Experiencia=" + exp_clv;
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
            //            alert("Cadena: " + cadena);

            if (cadena != "0|No hay Experiencia") {
                var ids = cadena.split("|");

                for (var i = 0; i < ids.length; i++) {
                    var campo = ids[i];
                    if (campo) {
                        ids[i] = ids[i].replace(/\"/g, "");
                        //             alert("campo: ("+i+") - ("+ids[i]+")");
                    }
                }

                document.getElementById("empresa").value = ids[2];
                document.getElementById("puesto").value = ids[3];
                document.getElementById("periodo").value = ids[4];
                document.getElementById("sueldo").value = ids[5];
                document.getElementById("jefe").value = ids[6];
                document.getElementById("actividades").value = ids[7];
                document.getElementById("motivo").value = ids[8];
                document.getElementById("herramientas").value = ids[9];
                document.getElementById("altaexp").disabled = true;
                document.getElementById("actuaexp").disabled = false;
            } else {
                var aviso = "No hay Experiencia";
                document.getElementById("mensaje_gral_exp").value = aviso;
            }
        }
    };
}

var experiencia2 = [];

function leeExperiencias() {
    //    alert("Lee Experiencias");
    //    document.getElementById("clv_inst").disabled = true;
    //    limpiaPantalla();
    document.getElementById("actuaexp").disabled = true;
    var archivo1 = servidor + "httpdocs/catalogoExperiencias.php" + "?Candidato=" + cand_clv;
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

            var experiencias = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < experiencias.length; i++) {
                var campo = experiencias[i];
                if (campo) {
                    experiencia2[i2] = campo.trim();
                    experiencia2[i2] = experiencia2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            experiencia2[i2] = "0|Seleccione la Experiencia";
            var select = document.getElementById("experiencias");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = experiencia2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}


function salir() {
    if (confirm("¿Quiere salir?")) {
        window.close();
    }
}