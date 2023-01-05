var tablax6;
var cuerpox6;
var renglones2 = 0;
var columnas2 = 0;
var tabla;
var tblBody;
var thead;
var h4;
var col22;

// Reporte rapido en pantalla
function conoReport(conocimientos, tabla, cuerpo) {
    //    alert("Crea tabla de conocimientos, entra a conoReport");

    var caracteres = "";
    /*
        for (var i3 = 0; i3 < conocimientos.length; i3++) {
            var code = conocimientos.charCodeAt(i3);
            caracteres = caracteres + "-" + code;
        }
        */

    tablax6 = tabla;
    cuerpox6 = cuerpo;

    var listaConocim = conocimientos.split(/\r?\n/);
    var renglones = listaConocim.length;

    limpiaTablaCono();

    var titulo = "LISTA DE CONOCIMIENTOS";
    var mensaje1;
    //    alert("listaConocim de 0: " + listaConocim[0] + "  Codes:" + caracteres);
    //  alert("Renglones a desplegar: " + renglones);

    if (renglones < 1) {
        mensaje1 = "No hay registros";
        document.getElementById("mensaje_gral").innerHTML = mensaje1;
        return;
    }

    var columnas = 4;
    var renglon4 = 0;
    var i4;
    var encabezadox = ["HERRAMIENTA", "NIVEL", "AÑOS", "MESES"];
    creaEncabezadoCono(encabezadox, columnas, titulo);
    creaTablaCono(renglones, columnas);

    if (document.getElementById(tablax6)) {
        for (i4 = 0; i4 < renglones; i4++) {
            if ((listaConocim[i4] != null) && (listaConocim[i4] != "")) {
                despliegaCono(listaConocim[i4], renglon4);
                renglon4++;
            }
        }
    }
}

//  $query="SELECT Con_candidato.clv_conocim, conocimientos.cono_desc, Con_candidato.con_nivel, 
//Con_candidato.con_anios, Con_candidato.con_meses FROM Con_candidato

function despliegaCono(linea, renglon) {
    //    alert("Despliega linea: " + linea + " Renglon: " + renglon);
    var campoxx = linea.split("|");
    var renglon2 = renglon;
    var nivelx = ["", "Basico", "Medio", "Avanzado"];

    var herramienta = campoxx[1].replace(/"/g, "");
    var nivel = nivelx[campoxx[2]];
    var anios = campoxx[3];
    var meses = campoxx[4];

    var campo1 = "camp0-reng" + renglon2;
    var campo2 = "camp1-reng" + renglon2;
    var campo3 = "camp2-reng" + renglon2;
    var campo4 = "camp3-reng" + renglon2;

    document.getElementById(campo1).innerHTML = herramienta;
    document.getElementById(campo2).innerHTML = nivel;
    document.getElementById(campo3).innerHTML = anios;
    document.getElementById(campo4).innerHTML = meses;
}


function creaEncabezadoCono(textoth, columnas, titulo) {
    //    alert("Crea Encabezado: " + textoth + "  columnas: " + columnas);

    if (document.getElementById('encabezadoy2')) {
        return;
    }

    //    tblBody = document.getElementById("cuerpo4");

    if (!document.getElementById("encabezadoy2")) { // Si no existe encabezado, lo crea
        //        alert("Crea el encabezado");
        thead = document.createElement("thead", {
            class: "formato"
        });
        thead.id = "encabezadoy2";

        var hilera = document.createElement("tr");
        hilera.id = "enc_hilera1";

        for (var i3 = 0; i3 < columnas; i3++) {
            var celdath = document.createElement("th");
            celdath.id = "enca" + i3;
            var textoCelda = document.createTextNode(textoth[i3]);
            celdath.appendChild(textoCelda);
            celdath.style.paddingRight = "10px";
            celdath.style.paddingLeft = "10px";
            celdath.style.textAlign = "center";
            hilera.appendChild(celdath);
        }

        thead.appendChild(hilera);
    }

    if (columnas2 < columnas) {
        columnas2 = columnas;
    }
}


function limpiaTablaCono() {
    var vacio = "";
    var col2;

    if (!document.getElementById("encabezadoy2")) {
        //        alert("No hay tabla a limpiar");
        return;
    }
    //    alert("Limpia Tabla renglones: " + renglones2 + "  Columnas:" + columnas2);

    for (var renglon2 = 0; renglon2 < renglones2; renglon2++) {
        for (col2 = 0; col2 < columnas2; col2++) {
            var campox1 = "camp" + col2 + "-reng" + renglon2;
            document.getElementById(campox1).innerHTML = vacio;
        }
    }
}

function creaTablaCono(renglones, columnas) {
    //    alert("Crea formato de tabla, renglones:  " + renglones + " columnas: " + columnas);
    if ((renglones <= 0) || (renglones < renglones2)) {
        //        alert("No hay renglones a crear - renglones2:  " + renglones2 + "  renglones:" + renglones);
        return;
    }

    var body = document.getElementsByTagName("body9")[0];
    //    body.style.maxHeight = "200px";

    //    body.className = "container";
    //    body.class = "container";
    var ancho = "100%";
    var mizquierdo = "0%";
    var mderecho = "0%";

    if (tablax6 == "tablaCon") {
        ancho = "80%";
        mizquierdo = "10%";
        mderecho = "10%";
    }
    //    max-height: 15em;

    if (!document.getElementById(tablax6)) {
        //           alert("No existe la tabla, se crea tabla y el cuerpo de la tabla");
        tabla = document.createElement("table", {
            //            class: "scroll"
        });
        tabla.id = tablax6;
        tabla.style.width = ancho;
        tabla.style.height = "80%";
        //        tabla.style.maxHeight = "10em";
        tabla.style.marginLeft = mizquierdo;
        tabla.style.marginRight = mderecho;
    } else {
        tabla = document.getElementById(tablax6);
    }


    if (!document.getElementById(cuerpox6)) {
        //           alert("No existe la tabla, se crea tabla y el cuerpo de la tabla");
        tblBody = document.createElement("tbody", {
            //          class: "scroll"
        });
        tblBody.id = cuerpox6;
    } else {
        tblBody = document.getElementById(cuerpox6);
    }

    //    var renglonesx2 = renglones + 1;

    for (var i = renglones2; i < renglones; i++) {
        //                alert("Crea linea: " + i);
        var hilera = document.createElement("tr");
        hilera.id = i;

        for (var i2 = 0; i2 < columnas; i2++) {
            //            alert("Crea campo: " + i2 + "  linea:" + i);
            var idcampo = "camp" + i2 + "-reng" + i;
            var celda = document.createElement("td");
            //            var parrafo = document.createElement("p");
            celda.id = idcampo;
            //          celda.appendChild(parrafo);

            if (i2 == 2 || i2 == 3) {
                celda.style.textAlign = "center";
                celda.style.paddingRight = "9px";
            } else {
                celda.style.textAlign = "left";
                celda.style.paddingRight = "20px";
            }
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }

    if (renglones2 < renglones) {
        renglones2 = renglones;
    }

    tabla.appendChild(tblBody);
    tabla.appendChild(thead);
    body.appendChild(tabla);
}