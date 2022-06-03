// Mantenimiento al catalogo de evaluaciones
// Carga foto del candidato desde un archivo local
function despliega_foto(foto_url) {
    if (foto_url.length > 1) {
        var preview = document.querySelector(".display_image");
        preview.src = foto_url;
    } else {
        alert("No hay imagen de la pregunta");
    }
}

function carga_imagen() {
    var preview = document.querySelector(".display_image");
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        fileUpload(file);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}


// Sube la imagen de la foto del candidato al servidor web
var foto_dir;
var foto_nom;

function fileUpload(img) {
    elige_servidor();
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var archivo2 = servidor + "httpdocs/cargaFoto.php";
    var fd = new FormData();

    xhttp.open("POST", archivo2, true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            //       alert("Cadena: " + cadena);
            var cadena1 = cadena.split(":");
            foto_dir = cadena1[1];
            var cadena2 = cadena.split("/");
            var cadena3 = cadena2[2];
            foto_nom = cadena3;
            //           alert("Directorio: " + foto_dir);
            //         alert("Nombre de foto: " + foto_nom);

            document.getElementById("mensaje_gral").value = cadena;
        } else {
            //                  alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };

    fd.append('myFile', img);
    xhttp.send(fd);
}

/* LANZA REPORTE EN PANTALLA */
function rep_Pantalla() {
    //    alert("Despliega reporte por pantalla");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var conocimiento = document.getElementById("conocimientos").value;

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    window.location.href = "httpdocs/rdva3_PreguntasXcomp.php?clave=" + conocimiento_clv + "&nombre=" + conocimiento;
}

/* LANZA REPORTE EN EXCEL */
function rep_Excel() {
    //    alert("Despliega reporte por Excel");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var conocimiento = document.getElementById("conocimientos").value;

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    window.location.href = "httpdocs/sp_PreguntasXcomp.php?clave=" + conocimiento_clv + "&nombre=" + conocimiento;
}

function limpiaPantalla_preg() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);

    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("preguntas").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clave").value = vacio;
    document.getElementById("descripcion").value = vacio;
    document.getElementById("resp1").value = vacio;
    document.getElementById("resp2").value = vacio;

    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = false;

    document.getElementById("mensaje_gral").innerHTML = vacio;
}

function nuevaPregunta() {
    limpiaPantalla_preg();
}

var tipo_funcion = "";

function altaPregunta() {
    tipo_funcion = "alta";
    modificaPregunta();
}

function actualizaPregunta() {
    tipo_funcion = "modifica";
    modificaPregunta();
    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;
}


// Registro de conocimientos por candidato
function modificaPregunta() {
    //    alert("Alta y Actualización de Evaluaciones");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("mensaje_gral").value = vacio;

    var conocimiento = document.getElementById("conocimientos").value;
    var nombre = document.getElementById("nombre").value;
    var pregunta_clv = document.getElementById("clave").value;
    var descripcion = document.getElementById("descripcion").value;
    var respuesta1 = document.getElementById("resp1").value;
    var respuesta2 = document.getElementById("resp2").value;

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    if (tipo_funcion == "alta") {
        if (nombre == "") {
            alert("Ponga el nombre de la pregunta");
            return;
        }

        if (descripcion == "") {
            alert("Ponga la descripción");
            return;
        }
    }

    /*
    camposx22[0] = pregunta_clv;
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = conocimiento;
    camposx22[6] = imagen;
    */

    var camposx22 = [];

    camposx22[0] = pregunta_clv;
    camposx22[1] = nombre;
    camposx22[2] = descripcion;
    camposx22[3] = respuesta1;
    camposx22[4] = respuesta2;
    camposx22[5] = conocimiento_clv;
    camposx22[6] = foto_dir;

    var camposx23 = camposx22.join("|");

    var archivo1 = "";

    if (tipo_funcion == "modifica") {
        archivo1 = servidor + "httpdocs/act_pregunta_xcomp.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_pregunta_xcomp.php";
    }

    var archivo2 = archivo1 + "?Campos=" + camposx23;
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
            //        alert("Cadena: " + cadena);
            document.getElementById("mensaje_gral").innerHTML = cadena;
            if (tipo_funcion == "alta") {
                var valor = cadena.split(":");
                if (valor[0] == "Nueva pregunta") {
                    document.getElementById("clave").value = valor[1];
                    document.getElementById("alta").disabled = true;
                    document.getElementById("actualiza").disabled = false;
                }
            }
        }
    };
}

var preguntas2 = [];

function leePreguntas() {
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("preguntas").innerHTML = vacio;
    var conocimiento = document.getElementById("conocimientos").value;

    if (conocimiento == "Seleccione el Conocimiento") {
        alert("Seleccione el Conocimiento");
        return;
    }

    var clavex22 = [];
    var renglones = conocimientos2.length;
    renglones--;
    var conocimientox22 = document.getElementById("conocimientos").selectedIndex;
    conocimientox22 = (renglones - conocimientox22);
    clavex22 = conocimientos2[conocimientox22].split("|");
    var conocimiento_clv = clavex22[0];

    var archivo1 = servidor + "httpdocs/catalogo_PregXcomp.php";
    var archivo2 = archivo1 + "?Conocimiento=" + conocimiento_clv;
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
            //            alert("Cadena del catalogo de conocimientos: " + cadena);
            var preguntas = cadena.split("\n");
            var i2 = 0;
            //            alert("Registros: " + preguntas.length);


            for (var i = 0; i < preguntas.length; i++) {
                var campo = preguntas[i];
                if (campo != null && campo != "") {
                    preguntas2[i2] = campo.trim();
                    preguntas2[i2] = preguntas2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            preguntas2[i2] = "0|Seleccione la Pregunta";
            var select = document.getElementById("preguntas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = preguntas2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function consultaPregunta() {
    //    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var pregunta = document.getElementById("preguntas").value;

    if (pregunta == "Seleccione la Pregunta") {
        alert("Seleccione la Pregunta");
        return;
    }

    if (pregunta == "No hay Preguntas") {
        return;
    }

    document.getElementById("alta").disabled = true;
    document.getElementById("actualiza").disabled = false;

    var renglones = preguntas2.length;
    renglones--;
    var posicion22 = document.getElementById("preguntas").selectedIndex;
    var posicion23 = posicion22;
    posicion22 = (renglones - posicion22);

    var clavex22 = preguntas2[posicion22].split("|");
    var pregunta_clv = clavex22[0];

    document.getElementById("clave").value = pregunta_clv;

    var archivo1 = servidor + "httpdocs/consultaPreg_xcomp.php";
    var archivo2 = archivo1 + "?clave=" + pregunta_clv;
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
            //          alert("cadena: " + cadena);

            var mensaje_cadena = cadena.split(":");
            //          alert("Cadena: " + cadena);
            if (mensaje_cadena[0] == "No hay Pregunta número") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }

            var ids = cadena.split("|");

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            document.getElementById("nombre").value = ids[1];
            document.getElementById("descripcion").value = ids[2];
            document.getElementById("resp1").value = ids[5];
            document.getElementById("resp2").value = ids[6];
            despliega_foto(ids[12]);

            //            alert("ids de 10:" + ids[10]);

            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;

        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}