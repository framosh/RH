// Mantenimiento a la educacion del candidato
function reporteEduPant() {
    var candidato = document.getElementById("candidatos").value;

    if (candidato != cand_nom) {
        alert("Seleccione un candidato");
        return;
    }

    //window.location.href = "httpdocs/rdva3_contactos.php?Cliente="+cliente+"&nCliente="+nombrecl;
    window.location.href = servidor + "httpdocs/rdva3_EduxCand.php" + "?candidato=" + cand_clv + "&nombre=" + cand_nom;
}

/* LIMPIA PANTALLA  */
function limpiaPantallaEC() {
    //    document.body.innerHTML = "";
    //    alert("Limpia Pantalla");
    var vacio = "";
    var vacio1 = 0;
    document.getElementById("carreras").selectedIndex = vacio1;
    document.getElementById("instituciones").selectedIndex = vacio1;
    document.getElementById("tipos_edu").selectedIndex = vacio1;
    document.getElementById("estatus").selectedIndex = vacio1;
    //    document.getElementById("nombre").value = vacio;
    document.getElementById("carrera").value = vacio;
    document.getElementById("clv_inst").value = vacio;
    document.getElementById("campus").value = vacio;
    document.getElementById("generacion").value = vacio;
    document.getElementById("mensaje_gral").innerHTML = vacio;
    document.getElementById("secuencial").value = vacio1;
}

function actualizaEdu() {
    var tipo_mov = 2; // Estatus para modificación de registro
    altaEdu(tipo_mov);
}

function validaEstatusEdu(estatus) {
    var estatus_edu;
    switch (estatus) {
        case "Seleccione un estatus":
            estatus_edu = 0;
            break;
        case "Titulado":
            estatus_edu = 1;
            break;
        case "Pasante":
            estatus_edu = 2;
            break;
        case "Certificado":
            estatus_edu = 3;
            break;
        case "Trunca":
            estatus_edu = 4;
            break;
        case "Cursando":
            estatus_edu = 5;
            break;
        default:
            estatus_edu = 0;
    }
    return estatus_edu;
}

function altaEdu(tipo_mov) {
    //    alert("Alta Institucion");
    var vacio = "";
    var vacio1 = "0";

    document.getElementById("mensaje_gral").value = vacio;

    var institucion = document.getElementById("instituciones").value;
    var carrera = document.getElementById("carrera").value;
    var tipo_edu = document.getElementById("tipos_edu").value;
    var clv_inst = document.getElementById("clv_inst").value;
    var campus = document.getElementById("campus").value;
    var generacion = document.getElementById("generacion").value;
    var estatus = document.getElementById("estatus").value;
    var secuencial = document.getElementById("secuencial").value;

    if (tipo_edu == "Seleccione tipo de educación") {
        alert("Seleccione el tipo de educación");
        return;
    }

    if (estatus == "Seleccione un estatus") {
        alert("Seleccione un estatus");
        return;
    }

    if (institucion == "Seleccione la Institución") {
        alert("Seleccione la institución");
        return;
    }

    var renglones = tipoedu2.length;
    renglones--;
    var tipoedux22 = document.getElementById("tipos_edu").selectedIndex;
    tipoedux22 = (renglones - tipoedux22);
    var clavex22 = [];
    clavex22 = tipoedu2[tipoedux22].split("|");
    var tipo_edu_clv = clavex22[0];

    var estatus_edu = validaEstatusEdu(estatus);

    var datos_edu_cand = [];
    datos_edu_cand[0] = cand_clv;
    datos_edu_cand[1] = tipo_edu_clv;
    datos_edu_cand[2] = clv_inst;
    datos_edu_cand[3] = carrera;
    datos_edu_cand[4] = campus;
    datos_edu_cand[5] = generacion;
    datos_edu_cand[6] = estatus_edu;
    datos_edu_cand[7] = secuencial;

    var archivo1;

    if (tipo_mov == 2) {
        archivo1 = servidor + "httpdocs/act_edu_x_cand.php";
    } else {
        archivo1 = servidor + "httpdocs/reg_edu_x_cand.php";
    }

    var archivo2 = archivo1 + "?datos_edu_cand=" + datos_edu_cand;
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
            document.getElementById("mensaje_gral").innerHTML = cadena;
        }
    };
}

function determinaInstitucion() {
    var renglones = instituciones2.length;
    renglones--;
    var institucionesx22 = document.getElementById("instituciones").selectedIndex;
    institucionesx22 = (renglones - institucionesx22);
    var clavex22 = [];
    clavex22 = instituciones2[institucionesx22].split("|");
    var institucion_clv = clavex22[0];

    document.getElementById("clv_inst").value = institucion_clv;
}

function despliegaEdu() {
    //    alert("Desplirga Edu");
    var carrera = document.getElementById("carreras").value;

    var renglones = carreras2.length;
    renglones--;
    var posicion22 = document.getElementById("carreras").selectedIndex;
    posicion22 = (renglones - posicion22);
    var ids = carreras2[posicion22].split("|");
    var posicion1 = 0;
    var posicion2 = 0;
    var clave_inst = ids[2];
    var campus = ids[4];
    var institucionesx = instituciones2.length;
    var tiposx = tipoedu2.length;

    //    alert("Carrera: " + ids);

    for (var i1 = 0; i1 < institucionesx; i1++) {
        var campo = instituciones2[i1].split("|");
        //        alert("Institucion posicion: " + i1 + "  clave: " + campo[0] + "  Nombre: " + campo[1]);
        if (ids[2] == campo[0]) {
            posicion1 = i1;
            break;
        }
    }

    posicion1 = institucionesx - i1;
    posicion1--;

    for (var i2 = 0; i2 < tiposx; i2++) {
        var campo1 = tipoedu2[i2].split("|");
        if (ids[1] == campo1[0]) {
            posicion2 = i2;
            break;
        }
    }

    posicion2 = tiposx - i2;
    posicion2--;

    var estatus2 = ids[6];
    document.getElementById("instituciones").selectedIndex = posicion1;
    document.getElementById("tipos_edu").selectedIndex = posicion2;
    document.getElementById("carrera").value = carrera;
    document.getElementById("clv_inst").value = clave_inst;
    document.getElementById("campus").value = campus;
    document.getElementById("generacion").value = ids[5];
    document.getElementById("estatus").selectedIndex = estatus2;
    document.getElementById("secuencial").value = ids[7];
}


var instituciones2 = [];

function leeInstituciones() {
    //alert("Lee Instituciones");
    document.getElementById("clv_inst").disabled = true;
    //    limpiaPantalla();
    var archivo1 = servidor + "httpdocs/catalogoInstituciones.php";
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

            var instituciones = cadena.split("\n");
            var ciclos = instituciones.length;
            var i2 = 0;

            for (var i = 0; i < ciclos; i++) {
                var campo = instituciones[i];
                if (campo) {
                    instituciones2[i2] = campo.trim();
                    instituciones2[i2] = instituciones2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            instituciones2[i2] = "0|Seleccione la Institucion";
            var select = document.getElementById("instituciones");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = instituciones2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
}

var tipoedu2 = [];

function leeTipoEdu() {
    //alert("Lee Instituciones");
    //    document.getElementById("clv_tipo_edu").disabled = true;
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

            var tipoedu = cadena.split("\n");
            var ciclos = tipoedu.length;
            var i2 = 0;

            for (var i = 0; i < ciclos; i++) {
                var campo = tipoedu[i];
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

var carreras2 = [];

function LeeEducacion() {
    //    alert("Lee Educacion del candidato: " + cand_clv);
    //    document.getElementById("clv_tipo_edu").disabled = true;
    //    limpiaPantalla();
    var archivo1 = servidor + "httpdocs/catalogoEduXCand.php";
    var archivo2 = archivo1 + "?Candidato=" + cand_clv;
    var xhttp;

    //   alert("Archivo2: " + archivo2);

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
            //            alert("Cadena: " + cadena);
            if (cadena != "0|No hay Educacion") {
                var carrera = cadena.split("\n");
                var registros = carrera.length;
                var i2 = 0;

                for (var i = 0; i < registros; i++) {
                    var campo = carrera[i];
                    if (campo) {
                        carreras2[i2] = campo.trim();
                        carreras2[i2] = carreras2[i2].replace(/\"/g, "");
                        //                     alert("campo: (" + i2 + ") - (" + carreras2[i2] + ")");
                        i2++;
                    }
                }

                carreras2[i2] = "0|0|0|Seleccione la Educación";
                var select = document.getElementById("carreras");

                for (var i1 = i2; i1 >= 0; i1--) {
                    var option = document.createElement('option');
                    var nombre = carreras2[i1].split("|");
                    option.text = option.value = nombre[3];
                    select.add(option);
                }
            } else {
                alert("No hay educación registrada para el candidato: " + cand_clv);
            }
        }
    };
}

var ww;

function AltaInstituciones() {
    $(document).ready(function () {
        var pagina = servidor + "institucion.htm";
        ww = window.open(pagina, 'New2 Window', 'height=350,width=600,top=100,left=300');
    });
}

function AltaTipoEdu() {
    $(document).ready(function () {
        var pagina = servidor + "tipo_edu.htm";
        ww = window.open(pagina, 'New3 Window', 'height=350,width=600,top=100,left=300');
    });
}

function salir() {
    if (confirm("¿Quiere salir?")) {
        window.close();
    }
}