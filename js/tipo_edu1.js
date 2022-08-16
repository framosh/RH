/* LANZA REPORTE DE INSTITUCIONES POR PANTALLA */
function reporteTipoEdu() {
    //window.location.href = "httpdocs/rdva3_contactos.php?Cliente="+cliente+"&nCliente="+nombrecl;
    window.location.href = servidor + "httpdocs/rdva3_Tipo_edu.php";
}

/* LIMPIA PANTALLA  */
function limpiaPantalla() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("tipos_edu").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clv_tipo_edu").value = vacio;
    document.getElementById("mensaje_gral_tedu").innerHTML = vacio;
}

function actualizaTipoEdu() {
    //    alert("Actualiza Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_tedu").innerHTML = vacio;
    var llave1 = document.getElementById("tipos_edu").value;
    var nombre = document.getElementById("nombre").value;

    if (llave1 == "Seleccione el Tipo de Educacion") {
        alert("Seleccione el Tipo de Educacion");
        return;
    }

    var renglones = tipoedu2.length;
    renglones--;
    var tipoedux22 = document.getElementById("tipos_edu").selectedIndex;
    tipoedux22 = (renglones - tipoedux22);
    var clavex22 = [];
    clavex22 = tipoedu2[tipoedux22].split("|");
    var tipo_edu_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/act_tipo_edu.php";
    var archivo2 = archivo1 + "?Clave=" + tipo_edu_clv + "&Nombre=" + nombre;
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
            document.getElementById("mensaje_gral_tedu").innerHTML = cadena;
        }
    };
}

function altaTipoEdu() {
    //    alert("Alta Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_tedu").value = vacio;

    var nombre = document.getElementById("nombre").value;

    var archivo1 = servidor + "httpdocs/reg_tipo_edu.php";
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
            document.getElementById("mensaje_gral_tedu").innerHTML = cadena;
            document.getElementById("clv_tipo_edu").value = campos[1];
            leeTipoEdu();
        }
    };
}

function consultaTiposEdu() {
    //    alert("Consulta Institucion");
    var vacio = "";
    document.getElementById("mensaje_gral_tedu").innerHTML = vacio;

    var llave1 = document.getElementById("tipos_edu").value;

    if (llave1 == "Seleccione el Tipo de Educación") {
        alert("Seleccione el Tipo de Educación");
        return;
    }

    var renglones = tipoedu2.length;
    renglones--;
    var tipoedux22 = document.getElementById("tipos_edu").selectedIndex;
    tipoedux22 = (renglones - tipoedux22);
    var clavex22 = [];
    clavex22 = tipoedu2[tipoedux22].split("|");
    var tipo_edu_clv = clavex22[0];

    //    alert("Clave de tipo de educación: " + tipo_edu_clv);

    var archivo1 = servidor + "httpdocs/consultaTipoEdu.php";
    var archivo2 = archivo1 + "?clave=" + tipo_edu_clv;
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

            document.getElementById("clv_tipo_edu").value = tipo_edu_clv;
            document.getElementById("nombre").value = ids[1];
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}


var tipoedu2 = [];

function leeTipoEdu() {
    alert("Lee Instituciones educativas");
    document.getElementById("clv_tipo_edu").disabled = true;
    //    limpiaPantalla();
    var archivo1 = servidor + "httpdocs/catalogoTipoEdu.php";
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

            var tipoEdu = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < tipoEdu.length; i++) {
                var campo = tipoEdu[i];
                if (campo) {
                    tipoedu2[i2] = campo.trim();
                    tipoedu2[i2] = tipoedu2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            tipoedu2[i2] = "0|Seleccione el Tipo de Educacion";
            var select = document.getElementById("tipos_edu");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = tipoedu2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}