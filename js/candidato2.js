var candidato_clv;
var candidato_nombre;
var timeOutId;
var intervalo = 300000;
var sinActividad = 300000;

// Carga foto del candidato desde un archivo local
window.onload = function () {
    //  alert("Entra a candidato2");

    elige_servidor();
    //alert("Servidor: "+servidor);

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    var l = params.length;

    var url2 = document.location.href;

    /*
          dato4[0]  //  Candidato
          dato4[1]   //  Nombre
*/

    for (var i = 0; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1].replace(/%20/g, " ");
        dato4[i] = data[tmp[0]];
        dato4[i] = dato4[i].trim();
        //        alert("Dato4: " + i + "  contiene: " + dato4[i]);
    }

    var direccion2 = url2.split("?")[0].split("/");
    direccion2[3] = direccion2[3].trim();
    var mensa = direccion2[3];

    candidato_clv = dato4[0];
    candidato_nombre = dato4[1];
    document.getElementById("cand_key").value = candidato_clv;
    document.getElementById("cand_nom").value = candidato_nombre;

    var fecha = new Date().toLocaleDateString();
    document.getElementById("fecha").innerHTML = fecha;

    //    alert("Clave candidato: (" + candidato_clv + ")");
    //  alert("Nombre candidato: " + candidato_nombre);

    leeClientes2(); // Empresas a signar al candidato
    leeEstados(); // Lee catalogo de estados
    consultaCandidato(); // Consulta candidato
};

// SECCION DE CARGAY VISUALIZACION DE FOTOGRAFIAS DEL CANDIDATO
function despliega_foto(foto_url) {
    //    alert("Muestra foto: " + foto_url);
    if (foto_url.length > 1) {
        var preview = document.querySelector(".display_image");
        preview.src = foto_url;
    } else {
        alert("No hay foto de candidato: " + foto_url);
    }
}

function carga_imagen() {
    var preview = document.querySelector(".display_image");
    var file = document.querySelector("input[name='foto']").files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        fileUpload(file);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

var foto_dir = "";
var foto_nom = "";
var file_dir = "";
var file_nom = "";
var file_tipo = "";
var file_tamanio = "";

// Sube la imagen de la foto del candidato al servidor web
function fileUpload(img) {
    if (img == null || img == undefined) {
        return;
    }

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
    //echo("Se sube el archivo:".$archivo.":\n Ancho: ".$atributos2[0].":\n Alto:".$atributos2[1]);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);
            var cadena1 = cadena.split(':');
            foto_dir = cadena1[1];
            var cadena2 = foto_dir.split('/');
            foto_nom = cadena2[2];
        } else {
            foto_dir = "error en carga";
            foto_nom = "error en carga";
            //                  alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };

    fd.append('myFile', img);
    xhttp.send(fd);
}

function PreviewImage() {
    var pdffile = document.getElementById("uploadPDF").files[0];
    var pdffile_url = URL.createObjectURL(pdffile);
    $('#viewer').attr('src', pdffile_url);
    carga_cv();
}

var carga;

function stopTimer() {
    clearTimeout(carga);
}

function carga_cv() {
    var tiempo = 10000;
    //    window.carga(startTimeOut, tiempo);
    carga = setTimeout(carga_file, tiempo);
}

function carga_file() {
    var preview = document.querySelector("input[id='uploadPDF']").files[0];
    var file = document.querySelector("input[id='uploadPDF']").files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        subeArchivo(file);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    stopTimer();
}

// Sube el cv. del candidato al servidor
function subeArchivo(archivo) {
    //    alert("Sube archivo");

    elige_servidor();
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var archivo2 = servidor + "httpdocs/cargaArchivo.php";
    var fd = new FormData();

    xhttp.open("POST", archivo2, true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var cadena = xhttp.responseText;
            var cadena1 = cadena.split(':');
            file_dir = cadena1[1];
            //            var cadena2 = file_dir.split(/\//);
            var cadena2 = file_dir.split('/');
            file_nom = cadena2[2];
            file_tipo = cadena1[5];
            file_tamanio = cadena1[3];
            document.getElementById("cv_personal").innerHTML = file_nom; // Direccion del cv. personal

        } else {
            file_dir = "error en carga";
            file_nom = "error en carga";
            file_tamanio = "error";
        }
    };
    fd.append('myFile', archivo);
    xhttp.send(fd);
}

function imprime() {
    window.print();
}

/* LIMPIA PANTALLA */
function limpiaPantalla1() {
    //    alert("Limpia pantalla 1");
    var valor = "";
    var opcion2 = 0;
    document.getElementById("empresas").selectedIndex = opcion2;
    document.getElementById("vacantes").selectedIndex = opcion2;
    limpiaPantalla2(); // Limpia datos generales
}

function limpiaPantalla2() {
    //    alert("Limpia Pantalla 2");
    //    limpiaTablaCono();
    var foto_url = "../img/elicor9.jpg";
    despliega_foto(foto_url);
    var valor = "";
    var opcion2 = 0;
    //    document.getElementById("cand_key").value = valor;
    //  document.getElementById("cand_nom").value = valor;
    document.getElementById("cand_tel1").value = valor;
    document.getElementById("cand_tel2").value = valor;
    document.getElementById("cand_corr").value = valor;
    document.getElementById("skype").value = valor;
    document.getElementById("fnac").value = valor;
    document.getElementById("direccion").value = valor;
    document.getElementById("edad").value = valor;
    document.getElementById("hijos").value = valor;
    document.getElementById("sdo1").value = valor;

    document.getElementById("sdo2").value = valor;
    document.getElementById("trabajo").value = valor;
    document.getElementById("puesto2").value = valor;
    document.getElementById("fecha1").value = valor;
    document.getElementById("fecha2").value = valor;
    //    document.getElementById("sdo5").value = valor;
    document.getElementById("civil").selectedIndex = opcion2;
    document.getElementById("estatus_cand").selectedIndex = opcion2;
    document.getElementById("estatus_cv").selectedIndex = opcion2;
    document.getElementById("estatus_entre").selectedIndex = opcion2;
    document.getElementById("estatus_eval").selectedIndex = opcion2;
    document.getElementById("estados").selectedIndex = opcion2;
    document.getElementById("act_cand").disabled = false;

    document.getElementById("conocimientos").selectedIndex = opcion2;
    document.getElementById("nivel").selectedIndex = opcion2;
    document.getElementById("anios").value = valor;
    document.getElementById("meses").value = valor;
    document.getElementById("altacon").disabled = false;
    document.getElementById("actuacon").disabled = false;

    document.getElementById("mensaje_gral").value = valor;

    limpiaPantalla3(); // Limpia observaciones 
    //    limpiaTabla(); // Limpia seccion de conocimientos 
}

// Limpia seccion de comentarios y observaciones
function limpiaPantalla3() {
    var valor = "";
    document.getElementById("cultura").value = valor;
    document.getElementById("deporte").value = valor;
    document.getElementById("cand_obs1").value = valor;
    document.getElementById("cand_obs2").value = valor;
    document.getElementById("cand_obs3").value = valor;

    document.getElementById("ingles").value = valor;
    document.getElementById("espaniol").value = valor;
    document.getElementById("otro").value = valor;

    //    document.getElementById("cand_obs1").value = valor;
    //  document.getElementById("cand_obs2").value = valor;
    document.getElementById("act_cand").disabled = false;
}

function actualizaCandidato() {
    //    alert("Actualiza Candidato");
    var limpia = "";
    document.getElementById("mensaje_gral").innerHTML = limpia;

    var aviso;
    var camposx22 = [];

    //cand_nom,cand_tel1,cand_tel2,cand_corr,cand_skype,cand_fecha_nac,cand_direccion,cand_estado,cand_edad,
    //cand_edoc,cand_hijos,clv_est_cand,cand_sdo_sol,clv_vacante,cand_sdo_ult,cand_ult_trab,cand_ult_pue,clv_est_cv,
    //clv_est_ent,clv_est_eval,cand_fech_env,cand_fech_ingre,cand_sdo_contr,cand_obs_reclu,cand_obs_eval,

    camposx22[0] = document.getElementById("cand_nom").value;
    camposx22[1] = document.getElementById("cand_tel1").value;
    camposx22[2] = document.getElementById("cand_tel2").value;
    camposx22[3] = document.getElementById("cand_corr").value;
    camposx22[4] = document.getElementById("skype").value;
    camposx22[5] = document.getElementById("fnac").value;
    camposx22[6] = document.getElementById("direccion").value;
    var estado = document.getElementById("estados").value;
    camposx22[8] = document.getElementById("edad").value;
    var edo_civil = document.getElementById("civil").value;
    camposx22[10] = document.getElementById("hijos").value;
    var est_cand = document.getElementById("estatus_cand").value;
    camposx22[12] = document.getElementById("sdo1").value; //Sueldo solicitado

    var cliente = document.getElementById("empresas").value;
    var vacante_clv = document.getElementById("vacantes").value;
    camposx22[14] = document.getElementById("sdo2").value; // Ultimo sueldo percibido
    camposx22[15] = document.getElementById("trabajo").value; // Ultimo trabajo
    camposx22[16] = document.getElementById("puesto2").value; // Ultimo puesto desempeñado
    var est_cv = document.getElementById("estatus_cv").value; // Estatus de cv.
    var est_entrevista = document.getElementById("estatus_entre").value; // Estatus de entrevista
    var est_evaluacion = document.getElementById("estatus_eval").value; // Estatus de evaluacion
    camposx22[20] = document.getElementById("fecha1").value; // fecha de envio de cv. al cliente
    camposx22[21] = document.getElementById("fecha2").value; // fecha de contratacion
    camposx22[22] = document.getElementById("sdo5").value; // Sueldo contratado
    camposx22[23] = document.getElementById("cand_obs1").value; // Comentario reclutador
    camposx22[24] = document.getElementById("cand_obs2").value; // Comentarios evaluador
    camposx22[25] = document.getElementById("cand_obs3").value; // Comentarios candidato
    camposx22[26] = document.getElementById("cultura").value; // Actividades culturales
    camposx22[27] = document.getElementById("deporte").value; // Actividades deportivas
    camposx22[28] = document.getElementById("ingles").value; // Ingles
    camposx22[29] = document.getElementById("espaniol").value; // Español
    camposx22[30] = document.getElementById("otro").value; // Otros

    camposx22[23] = camposx22[23].replace(/\n/g, "\\n");
    camposx22[24] = camposx22[24].replace(/\n/g, "\\n");
    camposx22[25] = camposx22[25].replace(/\n/g, "\\n");
    camposx22[26] = camposx22[26].replace(/\n/g, "\\n");
    camposx22[27] = camposx22[27].replace(/\n/g, "\\n");

    //    var usuario2 = dato4[0];

    if (cliente == "Seleccione una Empresa") {
        aviso = "Por favor Seleccione una Empresa";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var renglones = cliente2.length;
    renglones--;
    var posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = cliente2[posicion22].split("|");
    var cliente_clv = clavex22[0];
    //    camposx22[13] = cliente_clv;

    if (vacante_clv == "0-Seleccione una Vacante") {
        aviso = "Por favor 0-Seleccione una Vacante";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    renglones = vacantes2.length;
    renglones--;
    posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = vacantes2[posicion22].split("|");
    vacante_clv = clavex22[0];
    camposx22[13] = vacante_clv;

    camposx22[31] = candidato_clv;

    if (estado == "Seleccione un Estado") {
        aviso = "Por favor seleccione un estado geografico";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    renglones = estados2.length;
    renglones--;
    posicion22 = document.getElementById("estados").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = estados2[posicion22].split("|");
    var estado_clv = clavex22[0];
    camposx22[7] = estado_clv;

    if (edo_civil == "Seleccione el estado civil") {
        aviso = "Por favor seleccione el estado civil";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    posicion22 = document.getElementById("civil").selectedIndex;
    edo_civil = posicion22;
    camposx22[9] = edo_civil;

    if (est_cand == "Seleccione el estatus") {
        aviso = "Por favor seleccione un estatus del candidato";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    posicion22 = document.getElementById("estatus_cand").selectedIndex;
    est_cand = posicion22;
    camposx22[11] = est_cand;

    if (est_cv == "Seleccione el estatus del cv") {
        aviso = "Por favor seleccione un estatus del cv";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    posicion22 = document.getElementById("estatus_cv").selectedIndex;
    est_cv = posicion22;
    camposx22[17] = est_cv;

    if (est_entrevista == "Seleccione el estatus de la entrevista") {
        aviso = "Por favor seleccione un estatus de la entrevista";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        camposx22[18] = "0";
    } else {
        posicion22 = document.getElementById("estatus_entre").selectedIndex;
        est_entrevista = posicion22;
        camposx22[18] = est_entrevista;
    }

    if (est_evaluacion == "Seleccione el estatus de la evaluacion") {
        aviso = "Por favor seleccione el estatus de la evaluacion";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        camposx22[19] = "0";
    } else {
        posicion22 = document.getElementById("estatus_eval").selectedIndex;
        est_evaluacion = posicion22;
        camposx22[19] = est_evaluacion;
        //        alert("Estatus evaluación: " + est_evaluacion);
    }

    if (foto_dir == "" || foto_dir == null) {
        foto_dir = "../img/elicor9.jpg";
    }

    if (foto_dir == null) {
        foto_dir = "";
    }

    if (foto_nom == null) {
        foto_nom = "";
    }

    if (file_dir == null) {
        file_dir = "";
    }

    if (file_nom == null) {
        file_nom = "";
    }

    camposx22[32] = foto_dir;
    camposx22[33] = foto_nom;
    camposx22[34] = file_dir;
    camposx22[35] = file_nom;

    //    alert("Cv: " + file_nom + "  directorio: " + file_dir);
    //    alert("  File dir: " + file_dir + "    Cv: " + file_nom + "  Tipo:" + file_tipo + "  Tamaño:" + file_tamanio);

    var cantidad_campos = camposx22.length;

    for (var ix = 0; ix < cantidad_campos; ix++) {
        if (camposx22[ix] == null) {
            camposx22[ix] = "";
        }
    }

    var camposx23 = camposx22.join("|");

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/svr_reg_contacto.php";
    var archivo1 = servidor + "httpdocs/act_Candidato.php";
    var archivo2 = archivo1 + "?campos=" + camposx23;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_gral").innerHTML = cadena;
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}

function borraCandidato() {
    //    alert("Borra candidato: " + candidato_clv);

    //var archivo1 = "https://svr.itbp.com.mx/httpdocs/svr_reg_contacto.php";
    var archivo1 = servidor + "httpdocs/borraCandidato.php";
    var archivo2 = archivo1 + "?candidato=" + candidato_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);
            var cadena2 = cadena.split(/\r?\n/);
            var cadena3 = cadena2[0].split(":");
            document.getElementById("mensaje_gral").innerHTML = cadena2[0];
            if (cadena3[0] == "Candidato borrado") {
                limpiaPantalla1();
                sale();
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
    //    xhttp.disabled();    
}


function calcula_edad() {
    var nacimiento = document.getElementById("fnac").value;

    if (nacimiento != null && nacimiento != "0000-00-00" && nacimiento != "") {
        var dia_de_hoy = new Date();
        var anio_hoy = dia_de_hoy.getFullYear();
        var mes_hoy = dia_de_hoy.getMonth();
        var dia_hoy = dia_de_hoy.getDate();

        var nacimiento1 = new Date(nacimiento);
        var anio_nacimiento = nacimiento1.getFullYear();
        var mes_nacimiento = nacimiento1.getMonth();
        var dia_nacimiento = nacimiento1.getDate();

        var anios = anio_hoy - anio_nacimiento;
        var aniox = 0;
        if (mes_hoy < mes_nacimiento) {
            aniox = -1;
        }
        if ((mes_hoy == mes_nacimiento) && (dia_hoy < dia_nacimiento)) {
            aniox = -1;
        }
        anios = anios + aniox;
        //            var edad = dia_de_hoy - nacimiento;
        //          var edad2 = edad.getDay();
        //    alert("Años: " + anios);
        document.getElementById("edad").value = anios;
        document.getElementById("edad").disabled = true;
    }
}

function leeConocimientos2() {
    //    limpiaPantalla_Con();
    var limpia = "";
    var vacio1 = 0;

    document.getElementById("conocimientos").innerHTML = limpia;
    document.getElementById("nivel").selectedIndex = vacio1;
    document.getElementById("anios").valor = limpia;
    document.getElementById("meses").valor = limpia;
    document.getElementById("mensaje_gral").innerHTML = limpia;

    var vacante_clv = document.getElementById("vacantes").value;

    if (vacante_clv == "0-Seleccione una Vacante") {
        var aviso = "Por favor 0-Seleccione una Vacante";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var renglones = vacantes2.length;
    renglones--;
    var posicion22 = document.getElementById("vacantes").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = vacantes2[posicion22].split("|");
    vacante_clv = clavex22[0];

    leeConocimientos(vacante_clv); // Lee el catalogo general de conocimientos de la DB
}

function consultaCandidato() {
    //    alert("Consulta Candidato: " + candidato_clv);
    var aviso = "";
    document.getElementById("mensaje_gral").innerHTML = aviso;
    //    limpiaPantalla2(); // Limpia campos

    // Lee los conocimientos del candidato solicitado y los despliega en el widget de conocimientos
    leeConocimCand(candidato_clv);

    var archivo1 = servidor + "httpdocs/consultaCandidato3.php";
    var archivo2 = archivo1 + "?candidato=" + candidato_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        //        alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //          alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena del candidato: " + cadena);

            if (cadena == "No existe el Candidato") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }
            var i1;

            var ids = cadena.split("|");
            for (i1 = 0; i1 < ids.length; i1++) {
                if (ids[i1] == null) {
                    ids[i1] = "";
                }
                var campo = ids[i1];
                if (campo != "") {
                    ids[i1] = ids[i1].replace(/\"/g, "");
                    ids[i1] = ids[i1].trim();
                    //alert("campo: (" + i1 + ") - (" + ids[i1] + ")");
                }
            }

            var cliente_clv = ids[38];
            var vacante_clv = ids[39];
            vacante = 0;
            //            leeVacantes2(cliente_clv, vacante_clv);
            leeVacantes2(cliente_clv, vacante_clv); // Carga el Spinner de las vacantes activas del cliente
            consultaVacante(vacante_clv); // Consulta los datos de la vacante registrada para el candidato

            var estado = 0;
            var opcion4 = 0;

            if (ids[8] != "" && ids[8] != "0") {
                var cantEstados = estados2.length;
                cantEstados--;
                //                alert("Busca estado:" + cantEstados);

                for (i1 = cantEstados; i1 >= 0; i1--) {
                    var campo2 = estados2[i1];
                    var clave = campo2.split("|");
                    if (campo2 != "") {
                        opcion4++;
                        if (clave[0] == ids[8]) {
                            estado = opcion4;
                            estado--;
                            //                            alert("Estado: " + estados2[i1] + "  opcion4:(" + opcion4 + ")  ids[8]:(" + ids[8] + ")   longitud:" + estados2.length);
                            break;
                        }
                    }
                }
            }

            var cliente = 0;
            var opcion5 = 0;

            if (ids[38] != "" && ids[38] != "0") {
                //                alert("Busca cliente");

                var cantEmpresas = cliente2.length;
                cantEmpresas--;

                for (i1 = cantEmpresas; i1 >= 0; i1--) {
                    var campo3 = cliente2[i1];
                    var clave3 = campo3.split("|");
                    if (campo3 && clave3[0] != "0") {
                        opcion5++;
                        if (clave3[0] == cliente_clv) {
                            cliente = opcion5;
                            //                            estado--;
                            //                          alert("Cliente: " + cliente2[i1] + "  opcion5:(" + opcion5 + ")  ids[38]:(" + ids[38] + ")   longitud:" + cantEmpresas);
                            break;
                        }
                    }
                }
            } else {
                cliente = 0;
            }

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            if (ids[12] != "") {
                ids[12] = formatter.format(ids[12]);
            }

            if (ids[13] != "") {
                ids[13] = formatter.format(ids[13]);
            }

            if (ids[23] != "") {
                ids[23] = formatter.format(ids[23]);
            }

            var edo_civil = ids[10];
            var est_cand = ids[19];
            var est_cv = ids[16];
            var est_entre = ids[17];
            var est_eval = ids[18];
            var anios = ids[9];

            //            alert("Edad: " + ids[6]);

            if ((ids[6] != "0000-00-00") && (ids[6] != "") && (ids[6] != null)) {
                //                alert("Determina edad de: " + ids[6]);
                var dia_de_hoy = new Date();
                var anio_hoy = dia_de_hoy.getFullYear();
                var mes_hoy = dia_de_hoy.getMonth();
                var dia_hoy = dia_de_hoy.getDate();

                var nacimiento = new Date(ids[6]);
                var anio_nacimiento = nacimiento.getFullYear();
                var mes_nacimiento = nacimiento.getMonth();
                var dia_nacimiento = nacimiento.getDate();

                anios = anio_hoy - anio_nacimiento;
                var aniox = 0;
                if (mes_hoy < mes_nacimiento) {
                    aniox = -1;
                }
                if ((mes_hoy == mes_nacimiento) && (dia_hoy < dia_nacimiento)) {
                    aniox = -1;
                }
                anios = anios + aniox;
                document.getElementById("edad").disabled = true;
            }

            //            alert("Despliega datos de candidato");
            document.getElementById("empresas").selectedIndex = cliente; // Estatus de entrevista
            //            document.getElementById("vacantes").selectedIndex = vacante;

            document.getElementById("cand_key").value = ids[0];
            document.getElementById("cand_nom").value = ids[1];
            document.getElementById("cand_tel1").value = ids[2];
            document.getElementById("cand_tel2").value = ids[3];
            document.getElementById("cand_corr").value = ids[4];
            document.getElementById("skype").value = ids[5];
            document.getElementById("fnac").value = ids[6];
            document.getElementById("direccion").value = ids[7];
            document.getElementById("estados").selectedIndex = estado;
            document.getElementById("edad").value = anios;
            document.getElementById("civil").selectedIndex = edo_civil;
            document.getElementById("hijos").value = ids[11];
            document.getElementById("sdo2").value = ids[12]; // Ultimo sueldo percibido
            document.getElementById("sdo1").value = ids[13]; // Sueldo solicitado
            document.getElementById("trabajo").value = ids[14]; // Ultimo trabajo laborado
            document.getElementById("puesto2").value = ids[15]; // Ultimo puesto laborado
            document.getElementById("estatus_cv").selectedIndex = est_cv; // Estatus del cv.
            document.getElementById("estatus_entre").selectedIndex = est_entre; // Estatus de entrevista
            document.getElementById("estatus_eval").selectedIndex = est_eval; // Estatus de evaluacion
            document.getElementById("estatus_cand").selectedIndex = est_cand; // Estatus del candidato
            document.getElementById("cand_obs1").value = ids[20]; // Comentario reclutador
            document.getElementById("cand_obs2").value = ids[21]; // Comentarios evaluador
            document.getElementById("fecha2").value = ids[22]; // Fecha de contratación
            document.getElementById("sdo5").value = ids[23]; // Sueldo contratado          
            document.getElementById("fecha1").value = ids[24]; // Fecha de envio de cv a Cliente

            document.getElementById("act_cand").disabled = false;
            document.getElementById("cand_obs3").value = ids[29]; // Comentarios del candidato
            document.getElementById("cultura").value = ids[31]; // Actividades Culturales
            document.getElementById("deporte").value = ids[30]; // Actividades Recreativas y Deportivas
            document.getElementById("ingles").value = ids[32]; // Nivel de ingles
            document.getElementById("espaniol").value = ids[33]; // Nivel de español
            document.getElementById("otro").value = ids[34]; // Otro idioma
            document.getElementById("cv_personal").innerHTML = ids[41]; // Direccion del cv. personal
            if (ids[35] == "") {
                var foto_url = "../img/elicor9.jpg";
                ids[35] = foto_url;
            }
            foto_dir = ids[35];
            file_dir = ids[40];
            despliega_foto(ids[35]);
            //            alert("File dir a desplegar: " + file_dir);
            var curriculum = document.getElementById("viewer"); // Renderiza cv en PDF
            curriculum.src = file_dir;
        } else {
            // alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}


function leeClientes2() {
    //    alert("Lee Clientes 2");
    limpiaPantalla1(); // Limpia pantalla
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;
    //alert("Lee Clientes");
    leeClientes();
}

function consultaVacante(vacante_clv) {
    if (vacante_clv == "" || vacante_clv == null) {
        alert("No hay vacante a consultar");
        return;
    }

    var archivo1 = servidor + "httpdocs/consultaVacante.php";
    var archivo2 = archivo1 + "?vacante=" + vacante_clv;
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
            //   alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);

            if (cadena == "0|No existe la Vacante") {
                cadena = cadena.split("|");
                document.getElementById("mensaje_gral").innerHTML = cadena[1];
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

            document.getElementById("puesto").value = ids[0];
            document.getElementById("sdo3").value = ids[1];
            document.getElementById("sdo4").value = ids[2];
            leeConocimientos(vacante_clv); // Lee los conocimientos de la vacante a la que se apunto el candidato

        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}


function leeEstados2() {
    leeEstados();
}

var ww2;

function Estudios() {
    //alert("Entra a estudios");

    $(document).ready(function () {
        var configura_ventana = "menubar=no, location=yes, resizable=yes, scrollbars=yes, status=yes, height=620,width=700,top=100,left=300";
        var pagina = servidor + "edu_x_cand.htm" + "?candidato=" + candidato_clv + "&cand_nom=" + candidato_nombre;
        ww2 = window.open(pagina, 'New Window4', configura_ventana);
    });
}

function sale() {
    if (confirm("¿Quiere regresar?")) {
        actualizaCandidato();
        window.close();
    }
}

function Experiencia() {
    //    alert("Experiencia");
    //    var candidato_clv = document.getElementById("cand_key").value;

    $(document).ready(function () {
        var pagina = servidor + "experiencia.htm" + "?candidato=" + candidato_clv + "&cand_nom=" + candidato_nombre;
        //        ww = window.open(pagina, 'New Window', 'height=630,width=850,top=10,left=250');
        ww2 = window.open(pagina, 'New Window5', 'height=700,width=850,top=10,left=250');
    });
}

function prueba() {
    $(document).ready(function () {
        var pagina = servidor + "prueba_grid.htm";
        ww2 = window.open(pagina, 'New Window6', 'height=630,width=850,top=10,left=250');
    });
}

/* GENERA CV DEL CANDIDATO */
function generaCV() {
    //    alert("Genera cv del candidato");

    $(document).ready(function () {
        var configura_ventana = "menubar=yes, location=yes, resizable=yes, scrollbars=yes, status=yes";
        var pagina = servidor + "ArhsiCV.html" + "?candidato=" + candidato_clv + "&cand_nom=" + candidato_nombre;
        ww2 = window.open(pagina, 'New Window7', configura_ventana);
    });
}