/* LANZA REPORTE EN PANTALLA */
function reporteUsuario() {
    window.location.href = "httpdocs/rdva3_Usuario.php";
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelUsuario() {
    window.location.href = "httpdocs/sp_usuario.php";
}

/* LIMPIA PANTALLA  */
function nuevoUsuario() {
    //alert("Inicializa pantalla para nuevo registro");
    document.getElementById("alta41").reset();
    document.body.innetHTML = "";
}

/* ACTUALIZA DATOS  */
function actualizaUsuario() {
    var Uclave = document.getElementById("Uclave").value;
    var estatus = document.getElementById("estatus").value;
    var correo = document.getElementById("correo").value;
    var nombre = document.getElementById("nombre").value;
    var puesto = document.getElementById("puesto").value;
    var nivel = document.getElementById("nivel").value;
    var clvacceso = document.getElementById("clvacceso").value;

    // alert("Actualiza Usuario: ("+Uclave+")");

    //    var archivo1 = "https://notaria.itbp.com.mx/httpdocs/act_usuario.php";
    var archivo1 = servidor + "httpdocs/act_usuario.php";
    var archivo2 = archivo1 + "?Uclave=" + Uclave + "&estatus=" + estatus + "&correo=" + correo + "&nombre=" + nombre + "&nivel=" + nivel + "&puesto=" + puesto + "&clvacceso=" + clvacceso;
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
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;

            document.getElementById("demo61").innerHTML = cadena;
        }
    };
}

/* ALTA USUARIOS  */
function altaUsuario() {
    var Uclave = document.getElementById("Uclave").value;
    var estatus = document.getElementById("estatus").value;
    var correo = document.getElementById("correo").value;
    var nombre = document.getElementById("nombre").value;
    var puesto = document.getElementById("puesto").value;
    var nivel = document.getElementById("nivel").value;
    var clvacceso = document.getElementById("clvacceso").value;

    //alert("Alta Usuario: ("+Uclave+")");

    //    var archivo1 = "https://notaria.itbp.com.mx/httpdocs/reg_usuario.php";
    var archivo1 = servidor + "httpdocs/reg_usuario.php";
    var archivo2 = archivo1 + "?Uclave=" + Uclave + "&estatus=" + estatus + "&correo=" + correo + "&nombre=" + nombre + "&nivel=" + nivel + "&puesto=" + puesto + "&clvacceso=" + clvacceso;
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
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("demo61").innerHTML = cadena;
        }
    };
}


/* CONSULTA DE INFORMACION  */
function consultaUsuario() {
    //document.getElementById("alta3").reset();

    var llave1 = document.getElementById("Uclave").value;

    //alert("Entra a Consulta de Usuario con clave: "+llave1);

    //    var archivo1 = "https://notaria.itbp.com.mx/httpdocs/consultaUsuario.php";
    var archivo1 = servidor + "httpdocs/consultaUsuario.php";
    var archivo2 = archivo1 + "?Uclave=" + llave1;
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

            //       document.getElementById("demo61").innerHTML=cadena;

            var ids = cadena.split("|");

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            var opcion3 = "";
            var opcion4 = "";
            var opcion5 = "";
            var opcion2 = ids[3].replace(/\s/g, ""); // Nivel
            var opcion1 = ids[4].replace(/\s/g, ""); // Estatus
            var opcion6 = ids[6].replace(/\s/g, ""); // Puesto

            switch (opcion1) // Estatus
            {
                case "Activo":
                    opcion3 = "0";
                    break;
                case "Baja":
                    opcion3 = "1";
                    break;
                default:
                    opcion3 = "1";
            }

            switch (opcion2) // Nivel de acceso
            {
                case "A":
                    opcion4 = "0";
                    break;
                case "B":
                    opcion4 = "1";
                    break;
                case "C":
                    opcion4 = "2";
                    break;
                default:
                    opcion4 = "2";
            }

            switch (opcion6) // Puesto
            {
                case "Abogado":
                    opcion5 = "0";
                    break;
                case "Pasante":
                    opcion5 = "1";
                    break;
                case "Administrativo":
                    opcion5 = "2";
                    break;
                default:
                    opcion5 = "2";
            }

            document.getElementById("Uclave").setAttribute('value', ids[0]);
            document.getElementById("nombre").setAttribute('value', ids[1]);
            document.getElementById("correo").setAttribute('value', ids[2]);
            document.getElementById("nivel").selectedIndex = opcion4;
            document.getElementById("estatus").selectedIndex = opcion3;
            document.getElementById("clvacceso").setAttribute('value', ids[5]);
            document.getElementById("puesto").selectedIndex = opcion5;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}