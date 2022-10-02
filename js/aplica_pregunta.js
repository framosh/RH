var cand1 = [];
var cand_clv;
var cand_nom;
var evaluacion;

window.onload = function () {
    //    alert("Elige servidor");
    elige_servidor();
    //    limpiaPantallaEC();

    //    alert("Separa campos del URL");
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    var l = params.length;

    if (l < 1) {
        alert("No hay examen asignado");
        //        salir();
    } else {
        //      alert("Asigna campos del URL");
        for (var i = 0; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1].replace(/%20/g, " ");
            cand1[i] = data[tmp[0]];
            cand1[i] = cand1[i].trim();
            //        alert("cand1: " + cand1[i] + "  i: " + i);
        }
        cand_clv = cand1[0];
        evaluacion = cand1[1];
        aplica_examen(cand_clv);
        //        setTimeout(consultaCandidato(cand_clv), 3000);
    }
};

function aplica_examen(cand_clv) {
    alert("Aplica examen");
    pantalla_OM();
    consultaCandidato(cand_clv);
}

function despliega_foto(foto_url) {
    var foto2 = "../img/sin_foto.jpg";
    var preview;

    if (foto_url.length > 1) {
        preview = document.querySelector(".display_image");
        preview.src = foto_url;

    } else {
        preview = document.querySelector(".display_image");
        preview.src = foto2;
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

var foto_dir;
var foto_nom;
var ancho;
var alto;

function fileUpload(img) {
    elige_servidor();
    var xhttp;
    ancho = 0;
    alto = 0;


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
            var cadena1 = cadena.split("\n");
            var cadena2 = cadena1[1].split(":");

            foto_dir = "";

            if (cadena2[0] == "Tamaño de archivo supera el limite de 1 mb.") {
                alert("La imagen supera el megabyte de tamaño, elija otra imagen: " + cadena2[1]);
                return;
            }
            if (cadena2[0] == "Error") {
                alert("Error en carga de imagen");
                return;
            }

            if (cadena2[0] == "Tipo de archivo diferente") {
                alert("Error en tipo de imagen");
                return;
            }

            var nombre = cadena1[1].split(":");
            foto_dir = nombre[1];
            var ancho1 = cadena1[2].split(":");
            ancho = ancho1[1];
            var alto1 = cadena1[3].split(":");
            alto = alto1[1];

            if (alto > 1200 || ancho > 1600) {
                var preview = document.querySelector(".display_image");
                preview.className = "al-40";
            }

            document.getElementById("mensaje_imagen").value = cadena;
        } else {
            //                  alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };

    fd.append('myFile', img);
    xhttp.send(fd);
}

function limpiaPantalla_PC() {
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    alto = 0;
    ancho = 0;
    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);
    foto_dir = foto_url;

    //    document.getElementById("conocimientos").selectedIndex = vacio1;
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

function limpiaPantalla_OM() {
    //alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    alto = 0;
    ancho = 0;

    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);

    //    document.getElementById("conocimientos").selectedIndex = vacio1;
    document.getElementById("preguntas").selectedIndex = vacio1;
    document.getElementById("nombre").value = vacio;
    document.getElementById("clave").value = vacio;
    document.getElementById("descripcion").value = vacio;
    document.getElementById("resp1").value = vacio;
    document.getElementById("resp2").value = vacio;
    document.getElementById("resp3").value = vacio;
    document.getElementById("resp4").value = vacio;
    document.getElementById("resp5").value = vacio;
    document.getElementById("solucion1").value = vacio;
    document.getElementById("solucion2").value = vacio;

    document.getElementById("mensaje_gral").innerHTML = vacio;
}

var preguntas2 = [];

function cargaPreguntas() {
    limpiaPantalla_preg();

    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var conocimiento = document.getElementById("examen").value;

    var archivo1 = servidor + "httpdocs/preg_xEval.php";
    var archivo2 = archivo1 + "?evaluacion=" + evaluacion;
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
            var cant_preguntas = preguntas.length;
            if (cant_preguntas == 0) {
                alert("La evaluación: " + evaluacion + " no tiene preguntas");
                return;
            }

            for (var i = 0; i < cant_preguntas; i++) {
                var campo = preguntas[i];
                if (campo != null && campo != "") {
                    preguntas2[i2] = campo.trim();
                    //                    preguntas2[i2] = preguntas2[i2].split("|");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }
            despliega_preguntas(preguntas2);
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}

function despliega_preguntas(preguntas2) {
    var pregunta = [];
    pregunta = preguntas2;
    var cant_preguntas = pregunta.length;
    for (i = 0; i < cant_preguntas; i++) {
        consultaPregunta(pregunta[i]);
    }
}

function consultaPregunta(preguntax1) {
    //    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var pregunta = preguntax1.split("|");
    var pregunta_clv = pregunta[0];
    var tipo_preg = pregunta[1];
    if (tipo_preg == "1") {
        pantalla_OM();
        consulta_OM(preguntax1);
    } else {
        pantalla_PC();
        consulta_PC(preguntax1);
    }
}

function consulta_PC(pregunta_clv) {
    //    alert("Consulta Pregunta");
    var vacio = "";
    document.getElementById("mensaje_gral").innerHTML = vacio;
    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);
    foto_dir = foto_url;

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
            despliega_foto(ids[4]);

        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function consulta_OM(pregunta_clv) {
    var archivo1 = servidor + "httpdocs/consPregOM.php";
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
            document.getElementById("resp3").value = ids[7];
            document.getElementById("resp4").value = ids[8];
            document.getElementById("resp5").value = ids[9];
            document.getElementById("solucion1").value = ids[10];
            document.getElementById("solucion2").value = ids[11];
            despliega_foto(ids[12]);
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function consultaCandidato(cand_clv) {
    alert("Consulta Candidato: (" + cand_clv + ")");

    var archivo1 = servidor + "httpdocs/consCandNom.php";
    var archivo2 = archivo1 + "?candidato=" + cand_clv;
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
            //   alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);

            if (cadena == "No existe el Candidato") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }

            var ids = cadena.split("|");
            for (var i1 = 0; i1 < ids.length; i1++) {
                if (ids[i1] == null) {
                    ids[i1] = "";
                }
                var campo = ids[i1];
                if (campo != null && campo != "") {
                    ids[i1] = ids[i1].replace(/\"/g, "");
                    ids[i1] = ids[i1].trim();
                    //           alert("campo: ("+i1+") - ("+ids[i1]+")");
                }
            }

            var candido = cand_clv + "-" + ids[0];
            document.getElementById("candidato").innerHTML = candido;
            cargaPreguntas();
        }
    };
    //    xhttp.disabled();
}

function pantalla_PC() {
    alert("Dibuja pantalla por Complemento");
    document.getElementById("esquema_gral").innerHTML =
        '    <div class="grid-layout">\n' +
        '    <div class="caja c1">\n' +
        '           <div>\n' +
        '            <h2 style="color: blue; text-align: center;">PREGUNTAS POR COMPLEMENTO</h2>\n' +
        '            <br>\n' +
        '               <div>\n' +
        '<form>\n' +
        '<fieldset>\n' +
        '<table>\n' +

        '<tr><td>Clave pregunta:</td><td><input type="text" name="clave"   id="clave"   disabled></td></tr>\n' +
        '<tr><td>Pregunta:</td><td><input type="text" name="nombre"   id="nombre"  size="70" required></td></tr>\n' +
        '<tr><td>Descripción:</td><td><textarea name="descripcion" cols="70"  rows="3" id="descripcion" value=""  required></textarea></td></tr>\n' +
        '</table>\n' +
        '</fieldset>\n' +
        '</form>\n' +

        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<br>\n' +
        '<div class="caja c2">\n' +
        '<fieldset>\n' +
        '<div>\n' +
        '<h3>Gráfico del cuestionamiento</h3>\n' +
        '<div>\n' +
        '<input type="file" id="image_input" accept="image/jpg" onchange="carga_imagen()">\n' +
        '<br>\n' +
        '<br>\n' +
        '<img class="display_image" src="" id="display_image" style="width: 100%; max-width:400px; max-height:400px;" alt="Seleccione un archivo.....">\n' +
        '<br>\n' +
        '</div>\n' +
        '</div>\n' +
        '</fieldset>\n' +
        '</div>\n' +
        '<br>\n' +
        '<div class="caja c3">\n' +
        '<div>\n' +
        '<form>\n' +
        '<fieldset>\n' +
        '<table>\n' +
        '<tr><td>Respuesta 1:</td><td><textarea name="resp1" cols="62"  rows="4" id="resp1" value="" ></textarea></td></tr>\n' +
        '<tr><td>Respuesta 2:</td><td><textarea name="resp2" cols="62"  rows="4" id="resp2" value="" ></textarea></td></tr>\n' +
        '</table>\n' +
        '</fieldset>\n' +
        '</form>\n' +

        '</div>\n' +
        '</div>\n' +
        '<br>\n' +
        '<div class="caja c4">\n' +
        '<div>\n' +
        '<button  id="actualiza" type="submit"  onclick="actPregPC()">Siguiente</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +

        '<div>\n' +
        '<p id="mensaje_imagen"  style="color: blue"></p>\n' +
        '<p id="mensaje_gral"  style="color: red"></p>\n' +
        '</div>\n';
}


function pantalla_OM() {
    alert("Dibuja pantalla Opcion Multiple");
    document.getElementById("esquema_gral").innerHTML =
        '<div class="grid-layout">' +
        '<div class="caja c1">\n' +
        '      <div>\n' +
        '      <h2 style="color: blue; text-align: center;">OPCION MULTIPLE</h2>\n' +
        '     <br>\n' +
        '       <div>\n' +
        '<form>\n' +
        '<fieldset>\n' +
        '<table>\n' +

        '<tr><td>Clave pregunta:</td><td><input type="text" name="clave"   id="clave"   disabled></td></tr>\n' +
        '<tr><td>Conocimiento:</td><td><input type="text" name="conocimiento"   id="conocimiento" size="70"  required></td></tr>\n' +
        '<tr><td>Pregunta:</td><td><input type="text" name="nombre"   id="nombre" size="70"  required></td></tr>\n' +
        '<tr><td>Descripción:</td><td><textarea name="descripcion" cols="70"  rows="3" id="descripcion" value=""  required></textarea></td></tr>\n' +
        '</table>\n' +
        '</fieldset>\n' +
        '</form>\n' +

        '               </div>\n' +
        '          </div>\n' +
        '     </div>\n' +
        '<br>\n' +
        '    <div class="caja c2">\n' +
        '<fieldset>\n' +
        '          <div>\n' +
        '        <div>\n' +
        '             <input type="file" id="image_input" accept="image/jpg" onchange="carga_imagen()">\n' +
        '            <br>\n' +
        '           <br>\n' +
        '          <img class="display_image" src="" id="display_image"  style="width: 100%; max-width:400px; max-height:400px;" alt="Imagen de pregunta.....">\n' +
        '         <br>\n' +
        '  </div>\n' +
        '       </div>\n' +
        '</fieldset>\n' +
        '    </div>\n' +
        '<br>\n' +
        '   <div class="caja c3">\n' +
        '         <div>\n' +
        '<form>\n' +
        '<fieldset>\n' +
        '<table>\n' +
        '<tr><td>Respuesta 1:</td><td><input type="text" name="resp1"   id="resp1" size="70"  required></td></tr>\n' +
        '<tr><td>Respuesta 2:</td><td><input type="text" name="resp2"   id="resp2" size="70"  required></td></tr>\n' +
        '<tr><td>Respuesta 3:</td><td><input type="text" name="resp3"   id="resp3" size="70"  required></td></tr>\n' +
        '<tr><td>Respuesta 4:</td><td><input type="text" name="resp4"   id="resp4" size="70"  required></td></tr>\n' +
        '<tr><td>Respuesta 5:</td><td><input type="text" name="resp5"   id="resp5" size="70"  required></td></tr>\n' +
        '<tr><td>Solucion 1:</td><td><input type="text" name="solucion1" id="solucion1" val="0" required></td></tr>\n' +
        '<tr><td>Solucion 2:</td><td><input type="text" name="solucion2" id="solucion2" val="0" required></td></tr>\n' +
        '</table>\n' +
        '</fieldset>\n' +
        '</form>\n' +

        '      </div>\n' +
        '   </div>\n' +
        '<br>\n' +
        '   <div class="caja c4">\n' +
        '<div>\n' +
        '<button  id="actualiza" type="submit"  onclick="actPregOM()">Siguiente</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +

        '<div>\n' +
        '<p id="mensaje_imagen"  style="color: blue"></p>\n' +
        '<p id="mensaje_gral"  style="color: red"></p>\n' +
        '</div>\n';
}