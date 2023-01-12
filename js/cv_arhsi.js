/*
Generación de cv. de candidatos directamente usando HTML y JavaScript
*/
var cand1 = [];
var cand_clv;
var cand_nom;

window.onload = function () {
    //    alert("Elige servidor");
    elige_servidor();
    limpiaPantallaEC();

    //    alert("Separa campos del URL");
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    var l = params.length;
    //    var url2 = document.location.href;
    //    alert("Url: " + url);
    //    alert("parametros: (" + l + ")");

    if (l <= 1) {
        alert("No hay candidato a mostrar");
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
        cand_nom = cand1[1];
        var nombre_candidato = cand_clv + " - " + cand_nom;

        //       alert("Candidato: (" + cand_clv + ")");
        var fecha = new Date().toLocaleDateString();
        document.getElementById("fecha").innerHTML = fecha;

        document.getElementById("nombre").innerHTML = nombre_candidato;
        var tiempo = 3000;
        setTimeout(consultaCandidato(), tiempo);
        setTimeout(consultaEdu(), tiempo);
        setTimeout(consultaExp(), tiempo);
        setTimeout(consultaConocimientos(cand_clv), tiempo);

        //        consultaCandidato();
        //        consultaEdu();
        //      consultaExp();
        //    consultaConocimientos(cand_clv);
    }
};

function despliega_foto(foto_url) {
    //alert("despliega foto: (" + foto_url + ")");
    var longitud = foto_url.length;

    //    alert("longitud: " + longitud);

    if (longitud > 1) {
        var preview = document.querySelector(".display_image");
        preview.src = foto_url;
    } else {
        //  alert("despliega cuadro en blanco");
        var preview2 = document.querySelector(".display_image");
        foto_url = "../img/sin_foto.jpg";
        preview2.src = foto_url;
        //        alert("No hay foto de candidato");
    }
}

function imprime() {
    window.print();
}


/* LIMPIA PANTALLA  */
function limpiaPantallaEC() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var foto_url = "../img/sin_foto.jpg";
    despliega_foto(foto_url);

    var vacio = "";
    var vacio1 = 0;

    document.getElementById("nombre").innerHTML = vacio;
    document.getElementById("tel_casa").innerHTML = vacio;
    document.getElementById("celular").innerHTML = vacio;
    document.getElementById("correo").innerHTML = vacio;
    document.getElementById("skype").innerHTML = vacio;
    document.getElementById("cumpleanios").innerHTML = vacio;
    document.getElementById("direccion").innerHTML = vacio;
    document.getElementById("colonia").innerHTML = vacio;
    document.getElementById("delegacion").innerHTML = vacio;
    document.getElementById("edad").innerHTML = vacio;
    document.getElementById("edo_civil").innerHTML = vacio;
    document.getElementById("hijos").innerHTML = vacio;
    document.getElementById("sdo1").innerHTML = vacio; // Ultimo sueldo percibido
    document.getElementById("sdo2").innerHTML = vacio; // Sueldo solicitado
    document.getElementById("com_entre").innerHTML = vacio; // Comentario reclutador
    document.getElementById("com_eval").innerHTML = vacio; // Comentarios del evaluador
    document.getElementById("com_cand").innerHTML = vacio; // Comentarios del candidato
    document.getElementById("act_recrea").innerHTML = vacio; // Actividades recreativas
    document.getElementById("act_cult").innerHTML = vacio; // Actividades culturales
    document.getElementById("ingles").innerHTML = vacio; // Nivel de ingles
    document.getElementById("espaniol").innerHTML = vacio; // Niverl de español
    document.getElementById("otro").innerHTML = vacio; // Otro idioma
    document.getElementById("nacionalidad").innerHTML = vacio; // Nacionalidad
    document.getElementById("vacante_sol").innerHTML = vacio; // Vacante solicitada
}

function consultaCandidato() {
    //  alert("Consulta Candidato: (" + cand_clv + ")");

    var archivo1 = servidor + "httpdocs/consCandCV.php";
    var archivo2 = archivo1 + "?candidato=" + cand_clv;
    var xhttp;

    //    alert(archivo2);

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

            if (cadena == "0|No existe el Candidato") {
                var cadena2 = cadena.split("|");
                document.getElementById("mensaje_gral").innerHTML = cadena2[1];
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

            var estado = ids[8];
            consultaEstado(estado);
            if (ids[6] == "0000-00-00") {
                ids[6] = "";
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

            alert("Ingles:" + ids[25]);

            var estado_civil = ["", "Soltero", "Casado", "Viudo", "Divorciado", "Union libre"];
            var edo_civil = estado_civil[ids[10]];

            document.getElementById("nombre").innerHTML = ids[1];
            document.getElementById("tel_casa").innerHTML = ids[2];
            document.getElementById("celular").innerHTML = ids[3];
            document.getElementById("correo").innerHTML = ids[4];
            document.getElementById("skype").innerHTML = ids[5];
            document.getElementById("cumpleanios").innerHTML = ids[6];
            document.getElementById("direccion").innerHTML = ids[7];
            document.getElementById("colonia").innerHTML = ids[20];
            document.getElementById("delegacion").innerHTML = ids[21];
            document.getElementById("edad").innerHTML = ids[9];
            document.getElementById("edo_civil").innerHTML = edo_civil;
            document.getElementById("hijos").innerHTML = ids[11];
            document.getElementById("sdo1").innerHTML = ids[12]; // Ultimo sueldo percibido
            document.getElementById("sdo2").innerHTML = ids[13]; // Sueldo solicitado
            document.getElementById("com_entre").innerHTML = ids[16]; // Comentario reclutador
            document.getElementById("com_eval").innerHTML = ids[17]; // Comentarios del evaluador
            document.getElementById("com_cand").innerHTML = ids[22]; // Comentarios del candidato
            document.getElementById("act_recrea").innerHTML = ids[23]; // Actividades recreativas
            document.getElementById("act_cult").innerHTML = ids[24]; // Actividades culturales
            document.getElementById("ingles").innerHTML = ids[25]; // Nivel de ingles
            document.getElementById("espaniol").innerHTML = ids[27]; // Niverl de español
            document.getElementById("otro").innerHTML = ids[27]; // Otro idioma
            document.getElementById("nacionalidad").innerHTML = ids[19]; // Nacionalidad
            document.getElementById("vacante_sol").innerHTML = ids[18]; // Vacante solicitada
            despliega_foto(ids[28]); // Despliegue de foto
        }
    };
    //    xhttp.disabled();
}


function consultaEstado(estado) {
    var archivo2 = servidor + "httpdocs/consultaEstado.php" + "?Estado=" + estado;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //            alert("Cadena: " + cadena);
            var estados = cadena.split("\n");
            var i2 = 1;
            var estados2 = [];

            for (var i = 0; i < estados.length; i++) {
                var campo = estados[i];
                if (campo) {
                    estados2[i2] = campo.replace(/\"/g, "");
                    estados2[i2] = estados2[i2].trim();
                    //           alert("campo: ("+i2+") - ("+estado2[i2]+")");
                    i2++;
                }
            }

            var estado2 = estados2[1].split("|");
            var estado_nombre = estado2[0];
            document.getElementById("estado").innerHTML = estado_nombre;
        }
    };
}

// Consulta y despliega la experiencia en el formato HTML
function consultaExp() {
    //    alert("Consulta Experiencia del candidato: " + cand_clv);
    var exp_clv = "";

    var archivo1 = servidor + "httpdocs/consExp_x_Cand.php";
    var archivo2 = archivo1 + "?Candidato=" + cand_clv + "&Experiencia=" + exp_clv;
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
            cadena = cadena.replace(/\"/g, "");
            //            alert("Cadena: " + cadena);

            var cadena2 = cadena.split("\n");
            //           cadena2 = cadena2.replace("\\n", "<br>");
            var num_reg = cadena2.length;
            //          alert("Registros de experiencia: " + num_reg);

            if (num_reg > 0) {
                var tabla = "tabla5";
                var cuerpo = "body8";
                quickReport2(cadena2, tabla, cuerpo);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
}

function consultaEdu() {
    //    alert("Consulta Educacion recibida");
    var tipo_edu = "";
    var instituto = "";

    var archivo1 = servidor + "httpdocs/consEdu_x_Cand.php";
    var archivo2 = archivo1 + "?Candidato=" + cand_clv + "&Tipo_edu=" + tipo_edu + "&Instituto=" + instituto;
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
            //            alert("Cadena: " + cadena);
            var cadena2 = cadena.split("\n");
            var renglones = cadena2.length;
            var curso = 0;
            var desp2 = [];

            if (renglones > 0) {
                //            alert("Renglones: " + renglones);
                for (var i2 = 0; i2 < renglones; i2++) {
                    //                    alert("Mensaje 1 Cadena2: " + i2 + " - (" + cadena2[i2] + ")");
                    if ((cadena2[i2] != "0|No hay Institución") && (cadena2[i2] != "")) {
                        //                      alert("Mensaje 2 Cadena2: " + i2 + " - " + cadena2[i2]);

                        var ids = cadena2[i2].split("|");

                        for (var i = 0; i <= ids.length; i++) {
                            var campo = ids[i];
                            if (campo) {
                                ids[i] = ids[i].replace(/\"/g, "");
                                //                          alert("campo: (" + i + ") - (" + ids[i] + ")");
                            }
                        }

                        var cedula = ["", "Titulado", "Pasante", "Certificado", "Trunca", "Cursando"];
                        var cedula2 = cedula[ids[5]];

                        //  $query="SELECT Edu_xcand.clv_tip_edu, inst_educativa.inst_nombre, Edu_xcand.carrera, Edu_xcand.campus, 
                        //Edu_xcand.edu_generacion, Edu_xcand.edu_estatus FROM Edu_xcand 

                        // Educacion profesional
                        if (ids[0] == 5) {
                            document.getElementById("profesion").innerHTML = ids[2];
                            document.getElementById("colegio").innerHTML = ids[1];
                            document.getElementById("campus").innerHTML = ids[3];
                            document.getElementById("periodo").innerHTML = ids[4];
                            document.getElementById("cedula").innerHTML = cedula2;
                        } else {
                            // maestria
                            if (ids[0] == 7) {
                                document.getElementById("maestria").innerHTML = ids[2];
                                document.getElementById("colegio2").innerHTML = ids[1];
                                document.getElementById("campus2").innerHTML = ids[3];
                                document.getElementById("periodo2").innerHTML = ids[4];
                                document.getElementById("certificado").innerHTML = cedula2;
                            } else {
                                desp2[curso] = ids[2] + "|" + ids[1] + "|" + ids[3] + "|" + ids[4] + "|" + cedula2;
                                curso = curso + 1;
                            }
                        }
                    }
                }
                //                alert("Cursos: " + curso);
                if (curso > 0) {
                    //                    alert("Arranca QuickReport2");
                    var tabla = "tabla4";
                    var cuerpo = "body10";
                    quickReport2(desp2, tabla, cuerpo);
                } else {
                    //                    alert("No hay cursos adicionales: " + curso);
                }
            }
        }
    };
}

function salir() {
    if (confirm("¿Quiere salir?")) {
        window.close();
    }
}

// Herramientas manejadas por el candidato
var conocim_cand = [];

function consultaConocimientos(candidato_clv) {
    //    alert("Lee Conocimientos de candidato: " + candidato_clv);
    //    limpiaPantalla_Con();
    //    limpiaTabla(); // Limpia tabla de conocimientos del candidato consultado anteriormente
    var limpia = "";
    var vacio1 = 0;

    var archivo1 = servidor + "httpdocs/cat_cono_x_cand.php";
    var archivo2 = archivo1 + "?Candidato=" + candidato_clv;
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
            cadena = cadena.replace(/\"/g, "");
            //            alert(cadena);
            var conocimientos = cadena.split("\n");
            //            var conocimientos = cadena.split(/\r?\n/);
            //            var i2 = 0;
            //            var camposxx1 = conocimientos[0].split("|");
            var registros = conocimientos.length;

            //            alert("Conocimientos registrados para el candidato: " + registros);

            if (registros > 1) {
                //Si el candidato ya tiene conocimientos registrados se despliegan en el cuadro de conocimientos
                var tabla = "tConocimientos";
                var cuerpo = "body11";
                quickReport2(conocimientos, tabla, cuerpo);
                conocim_cand = conocimientos;
            } else {
                var limpiax1 = [];
                conocim_cand = limpiax1;
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}