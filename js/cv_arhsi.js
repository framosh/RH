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
    document.getElementById("nombre").innerHTML = nombre_candidato;
    consultaCandidato();
    consultaEdu();
    consultaExp();
    consultaConomientos(cand_clv);
};

function reporteEduPant() {
    //window.location.href = "httpdocs/rdva3_contactos.php?Cliente="+cliente+"&nCliente="+nombrecl;
    window.location.href = servidor + "httpdocs/rdva3_EduxCand.php" + "?candidato=" + cand_clv + "&nombre=" + cand_nom;
}

/* LIMPIA PANTALLA  */
function limpiaPantallaEC() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("nombre").innerHTML = vacio1;
    document.getElementById("edad").innerHTML = vacio1;
    document.getElementById("cumpleanios").innerHTML = vacio1;
    document.getElementById("edo_civil").innerHTML = vacio1;
    document.getElementById("nacionalidad").innerHTML = vacio;
    document.getElementById("direccion").innerHTML = vacio;
    document.getElementById("colonia").innerHTML = vacio;
    document.getElementById("delegacion").innerHTML = vacio;
    document.getElementById("mensaje_gral_cv").innerHTML = vacio;

    document.getElementById("hijos").innerHTML = vacio1;
    document.getElementById("tel_casa").innerHTML = vacio1;
    document.getElementById("celular").innerHTML = vacio1;
    document.getElementById("correo").innerHTML = vacio1;
    document.getElementById("skype").innerHTML = vacio1;
    document.getElementById("sdo1").innerHTML = vacio1;
    document.getElementById("ado2").innerHTML = vacio1;
    document.getElementById("estado").innerHTML = vacio1;
}

function consultaCandidato() {
    //    alert("Consulta Candidato");

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

            var edo_civil = 4 - ids[10];
            var estado_civil;

            switch (edo_civil) {
                case 1:
                    estado_civil = "Soltero";
                    break;
                case 2:
                    estado_civil = "Casado";
                    break;
                case 3:
                    estado_civil = "Viudo";
                    break;
                case 4:
                    estado_civil = "Divorciado";
                    break;
                case 5:
                    estado_civil = "Union libre";
                    break;
                default:
                    estado_civil = "Estado no asignado";
                    break;
            }

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
            document.getElementById("edo_civil").innerHTML = estado_civil;
            document.getElementById("hijos").innerHTML = ids[11];
            document.getElementById("sdo1").innerHTML = ids[12]; // Ultimo sueldo percibido
            document.getElementById("sdo2").innerHTML = ids[13]; // Sueldo solicitado
            document.getElementById("com_entre").innerHTML = ids[16]; // Comentario reclutador
            document.getElementById("com_eval").innerHTML = ids[17]; // Comentarios del evaluador
            document.getElementById("com_cand").innerHTML = ids[22]; // Comentarios del candidato
            document.getElementById("act_recrea").innerHTML = ids[23]; // Actividades recreativas
            document.getElementById("act_cult").innerHTML = ids[24]; // Actividades culturales
            document.getElementById("ingles").innerHTML = ids[25]; // Actividades culturales
            document.getElementById("espaniol").innerHTML = ids[27]; // Actividades culturales
            document.getElementById("otro").innerHTML = ids[27]; // Actividades culturales
            document.getElementById("nacionalidad").innerHTML = ids[19];
            document.getElementById("vacante_sol").innerHTML = ids[18];
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

function consultaExp() {
    //    alert("Consulta Experiencia");
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
            //            alert("Cadena: " + cadena);
            var cadena2 = cadena.split("\n");
            var num_reg = cadena2.length;
            //          alert("Registros: " + num_reg);

            for (var i2 = 0; i2 < num_reg; i2++) {
                cadena2[i2] = cadena2[i2].replace(/\"/g, "");
            }

            if (num_reg > 0) {
                var tabla = "tabla5";
                var cuerpo = "cuerpo5";
                quickReport2(cadena2, tabla, cuerpo);
            }
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

                        var cedula = "";
                        cedula = ids[5];
                        var cedula2;
                        switch (cedula) {
                            case "1":
                                cedula2 = "Titulado";
                                break;
                            case "2":
                                cedula2 = "Pasante";
                                break;
                            case "3":
                                cedula2 = "Certificado";
                                break;
                            case "4":
                                cedula2 = "Trunca";
                                break;
                            case "5":
                                cedula2 = "Cursando";
                                break;
                            default:
                                cedula2 = "Sin estatus";
                                break;
                        }

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
                    var cuerpo = "cuerpo4";
                    quickReport2(desp2, tabla, cuerpo);
                } else {
                    alert("No hay cursos adicionales: " + curso);
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

var conocim_cand = [];

function consultaConomientos(candidato_clv) {
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
            //          alert(cadena);
            var conocimientos = cadena.split("\n");
            var i2 = 0;
            var camposxx1 = conocimientos[0].split("|");
            var long_campo = camposxx1.length;

            //            alert("Cantidad de conocimientos registrados para el candidato: " + long_campo);

            if (long_campo > 2) {
                //Si el candidato ya tiene conocimientos registrados se despliegan en el cuadro de conocimientos
                var tabla = "tablaCon";
                var cuerpo = "cuerpoCon";
                quickReport(conocimientos, tabla, cuerpo);
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