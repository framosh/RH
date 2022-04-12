/* LANZA REPORTE EN PANTALLA */
function reporteUsuario() {
    var estatus = document.getElementById("estatus").value;

    if (estatus == "Seleccione el estatus") {
        var mensaje = "Seleccione el estatus";
        document.getElementById("users_msg").innerHTML = mensaje;
        return;
    }

    //    alert("Estatus: " + estatus);
    //    window.location.href = "httpdocs/rdva3_Usuario.php?estatus="+estatusx;
    window.location.href = servidor + "httpdocs/rdva3_Usuario.php?estatus=" + estatus;
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelUsuario() {
    var estatus = document.getElementById("estatus").value;

    if (estatus == "Seleccione el estatus") {
        var mensaje = "Seleccione el estatus";
        document.getElementById("users_msg").innerHTML = mensaje;
        return;
    }

    //    window.location.href = "httpdocs/sp_Usuario.php?estatus="+estatusx;
    window.location.href = servidor + "httpdocs/sp_usuario.php?estatus=" + estatus;
}

function limpiaPantalla2() {
    var valor = 0;
    document.getElementById("usuarios").selectedIndex = valor;
    limpiaPantalla();
}

/* LIMPIA PANTALLA  */
function limpiaPantalla() {
    //alert("Inicializa pantalla para nuevo registro");
    //    document.getElementById("alta41").reset();
    var valor = 0;
    var valor2 = "";

    document.getElementById("Uclave").value = valor2;
    document.getElementById("nombre").value = valor2;
    document.getElementById("correo").value = valor2;
    document.getElementById("clvacceso").value = valor2;
    document.getElementById("puestos").selectedIndex = valor;

    document.getElementById("nivel").selectedIndex = valor;
    document.getElementById("estatus").selectedIndex = valor;
    document.getElementById("users_msg").value = valor2;
    document.getElementById("Uclave").disabled = false;
    document.getElementById("altaU").disabled = false;
    document.getElementById("actuaU").disabled = false;
}


function altaUsuario() {
    if (cambio == false || baja == false) {
        alert("No tiene permiso para modificar");
        return;
    }

    var Uclave = document.getElementById("Uclave").value;
    var nombre = document.getElementById("nombre").value;
    var estatus = document.getElementById("estatus").value;
    var correo = document.getElementById("correo").value;
    var nivel = document.getElementById("nivel").value;
    var clvacceso = document.getElementById("clvacceso").value;
    var puesto = document.getElementById("puestos").value;

    if (Uclave == "" || Uclave == null) {
        alert("Teclee el número o clave de usuario");
        return;
    }

    if (clvacceso == "" || clvacceso == null) {
        alert("Teclee una clave de acceso al sistema");
        return;
    }

    if (clvacceso.length < 6) {
        alert("La clave de acceso debe ser mínimo de 6 caracteres");
        return;
    }

    var mensaje;
    if (nivel == "Seleccione un nivel de acceso") {
        mensaje = "Seleccione un nivel de acceso";
        document.getElementById("users_msg").value = mensaje;
        return;
    }

    if (puesto == "Seleccione el puesto") {
        mensaje = "Seleccione el puesto";
        document.getElementById("users_msg").value = mensaje;
        return;
    }

    var renglones = puesto2.length;
    renglones--;
    var posicion22 = document.getElementById("puestos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var posicion = puesto2[posicion22].split("|");
    var clv_puesto = posicion[0];

    if (estatus == "Seleccione el estatus") {
        mensaje = "Seleccione el estatus";
        document.getElementById("users_msg").value = mensaje;
        return;
    }

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_usuario.php";
    var archivo1 = servidor + "httpdocs/reg_usuario.php";
    var archivo2 = archivo1 + "?nombre=" + nombre + "&user_number=" + Uclave + "&estatus=" + estatus + "&correo=" + correo + "&nivel=" + nivel + "&clvacceso=" + clvacceso + "&puesto=" + clv_puesto;
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
            document.getElementById("users_msg").value = cadena;
        }
    };
}

function actualizaUsuario() {
    alert("Actualiza usuario");
    if (cambio == false || baja == false) {
        alert("No tiene permiso para modificar");
        return;
    }

    var Uclave = document.getElementById("Uclave").value;
    var nombre = document.getElementById("nombre").value;
    var estatus = document.getElementById("estatus").value;
    var correo = document.getElementById("correo").value;
    var nivel = document.getElementById("nivel").value;
    var clvacceso = document.getElementById("clvacceso").value;
    var puesto = document.getElementById("puestos").value;

    if (clvacceso == "" || clvacceso == null) {
        alert("Teclee una clave de acceso al sistema");
        return;
    }

    if (clvacceso.length < 6) {
        alert("La clave de acceso debe ser mínimo de 6 caracteres");
        return;
    }

    var mensaje;
    if (nivel == "Seleccione un nivel de acceso") {
        mensaje = "Seleccione un nivel de acceso";
        document.getElementById("users_msg").value = mensaje;
        return;
    }

    if (puesto == "Seleccione el puesto") {
        mensaje = "Seleccione el puesto";
        document.getElementById("users_msg").value = mensaje;
        return;
    }

    var renglones = puesto2.length;
    renglones--;
    var posicion22 = document.getElementById("puestos").selectedIndex;
    posicion22 = (renglones - posicion22);
    var posicion = puesto2[posicion22].split("|");
    var clv_puesto = posicion[0];

    if (estatus == "Seleccione el estatus") {
        mensaje = "Seleccione el estatus";
        document.getElementById("users_msg").value = mensaje;
        return;
    }

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/act_usuario.php";
    var archivo1 = servidor + "httpdocs/act_usuario.php";
    var archivo2 = archivo1 + "?Uclave=" + Uclave + "&nombre=" + nombre + "&estatus=" + estatus + "&correo=" + correo + "&nivel=" + nivel + "&clvacceso=" + clvacceso + "&puesto=" + clv_puesto;
    var xhttp;

    alert("Archivo2: " + archivo2);

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
            alert("Cadena: " + cadena);
            document.getElementById("users_msg").value = cadena;
        }
    };
}

function consultaUsuario() {
    if (consulta == false) {
        alert("No tiene permiso para consultar");
        return;
    }

    limpiaPantalla();
    var usuario = document.getElementById("usuarios").value;
    var nombrex1 = "";

    for (var i = 0; i < usuario2.length; i++) {
        var nombre = usuario2[i].split("|");
        var campo = nombre[1];
        if (campo == usuario) {
            usuario = nombre[0];
            nombrex1 = nombre[1];
            //            var nombre1=nombre[1];
            //           alert("Usuario: ("+usuario+") - ("+nombre1+")");
            break;
        }
    }

    document.getElementById("Uclave").value = usuario;
    document.getElementById("nombre").value = nombrex1;

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaUsuario2.php";
    var archivo1 = servidor + "httpdocs/consultaUsuario2.php";
    var archivo2 = archivo1 + "?Uclave=" + usuario;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //      alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //            alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);
            var ids = cadena.split("|");

            for (var i = 0; i <= ids.length; i++) {
                var campo = ids[i];
                if (campo != null && campo != "") {
                    ids[i] = ids[i].trim();
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }
            var opcion2, opcion3;
            switch (ids[3]) // Nivel de acceso
            {
                case "A":
                    opcion2 = 1;
                    break;
                case "B":
                    opcion2 = 2;
                    break;
                case "C":
                    opcion2 = 3;
                    break;
                default:
                    opcion2 = 0;
            }

            switch (ids[4]) // Estatus
            {
                case "Activo":
                    opcion3 = 1;
                    break;
                case "Baja":
                    opcion3 = 2;
                    break;
                default:
                    opcion3 = 0;
            }

            var ix1;
            var campox1 = "";
            var nombrex1 = "";
            var puestox1 = "";
            var renglon = 0;
            var renglonx1 = 0;
            var renglones = puesto2.length;

            for (ix1 = 0; ix1 < renglones; ix1++) {
                nombrex1 = puesto2[ix1].split("|");
                campox1 = nombrex1[0];
                renglon = renglon + 1;
                if (campox1 == ids[6]) {
                    //                    alert("campox1: " + campox1 + "ids[6]: " + ids[6]);
                    puestox1 = nombrex1[1];
                    renglonx1 = (renglones - renglon);
                    break;
                }
            }
            //          alert("Renglon: " + renglonx1 + "  puestox1: " + puestox1);

            document.getElementById("correo").value = ids[2];
            document.getElementById("nivel").selectedIndex = opcion2;
            document.getElementById("estatus").selectedIndex = opcion3;
            document.getElementById("clvacceso").value = ids[5];
            document.getElementById("puestos").selectedIndex = renglonx1;

            document.getElementById("Uclave").disabled = true;
            document.getElementById("altaU").disabled = true;
            document.getElementById("actuaU").disabled = false;
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

var usuario2 = [];
//var bandera = false;

function leeUsuarios() {
    //    alert("Carga Catalogo de Usuarios");
    var valor = "";
    checaPermisos();
    //  document.getElementById("usuarios").value = valor;
    limpiaPantalla();

    //var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoUsuarios.php";
    var archivo2 = servidor + "httpdocs/catalogoUsuarios3.php";
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
            //    document.getElementById("users_msg").textContent="("+cadena+")"+"        longitud: ("+cadena.length+")";
            var registros = cadena.split("\n");
            var i2 = 0;
            var registros_number = registros.length;
            //            alert("Cadena: " + cadena + "  Registros:" + registros_number);

            for (var i = 0; i < registros_number; i++) {
                var campo = registros[i];
                if (campo != null && campo != "") {
                    usuario2[i2] = campo.trim();
                    usuario2[i2] = usuario2[i2].replace(/\"/g, "");
                    //                  alert("campo: (" + i2 + ") - (" + usuario2[i2] + ")");
                    i2++;
                }
            }

            usuario2[i2] = "0|Seleccione el Usuario";
            var select = document.getElementById("usuarios");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = usuario2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}

var puesto2 = [];
/* CARGA puestoS  */
function leePuestos() {
    //    alert("Catalogo de puestos de usuarios");
    //    limpiaPantalla();

    //    var archivo2 = "https://svr.itbp.com.mx/httpdocs/catalogoPuestos.php";
    var archivo2 = servidor + "httpdocs/cat_Puestos_User.php";
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
            var puesto = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < puesto.length; i++) {
                var campo = puesto[i];
                if (campo != null && campo != "") {
                    puesto2[i2] = campo.trim();
                    puesto2[i2] = puesto2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+puesto2[i2]+")");
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
}