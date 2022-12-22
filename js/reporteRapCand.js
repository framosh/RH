var tablax6;
var cuerpox6;

// Reporte rapido en pantalla
function quickReport(candidatos, tabla, cuerpo) {
    tablax6 = tabla;
    cuerpox6 = cuerpo;
    var registros = candidatos.length;

    //    alert("Crea tabla de conocimientos, entra a QuickReport");
    var listaConocim = new Array(registros);
    listaConocim = candidatos;

    var titulo = "RELACION DE CANDIDATOS";
    var renglones = 0;

    var linea = listaConocim;
    //    var linea = conocimientos;
    renglones = linea.length;
    //    renglones--;
    var mensaje1;
    //    alert("Renglones a desplegar: " + renglones);

    if (renglones < 1) {
        mensaje1 = "No hay registros";
        document.getElementById("mensaje_gral").innerHTML = mensaje1;
        return;
    }

    var columnas;
    var renglon4 = 0;
    var i4;

    columnas = 3;
    renglon4 = 0;
    if (columnas2 < columnas) {
        columnas2 = columnas;
    }
    limpiaTabla();

    //  $query="SELECT Candidatos.cand_key, Candidatos.cand_nom, Est_cand.desc_est_cand FROM Cand_x_vac  

    var limpiax1 = [];
    var encabezadox = [];
    encabezadox = limpiax1;
    encabezadox = ["CLAVE", "NOMBRE", "ESTATUS"];
    creaEncabezado(encabezadox, columnas, titulo);
    creaTabla(renglones, columnas);

    if (document.getElementById(tablax6)) {
        for (i4 = 0; i4 < renglones; i4++) {
            if ((linea[i4] != null) && (linea[i4] != "")) {
                despliega(linea[i4], renglon4);
                renglon4++;
            }
        }
    }
}

//  $query="SELECT Con_candidato.clv_conocim, conocimientos.cono_desc, Con_candidato.con_nivel, 
//Con_candidato.con_anios, Con_candidato.con_meses FROM Con_candidato

function despliega(linea, renglon) {
    //    alert("Despliega linea: " + linea + " Renglon: " + renglon);
    var campoxx = linea.split("|");
    var renglon2 = renglon;

    var clave = campoxx[0].replace(/"/g, "");
    var nombre = campoxx[1].replace(/"/g, "");
    var estatus = campoxx[2].replace(/"/g, "");


    var campo1 = "camp0-reng" + renglon2;
    var campo2 = "camp1-reng" + renglon2;
    var campo3 = "camp2-reng" + renglon2;

    document.getElementById(campo1).innerHTML = clave;
    document.getElementById(campo2).innerHTML = nombre;
    document.getElementById(campo3).innerHTML = estatus;
}

var renglones2 = 0;
var columnas2 = 0;
var tabla;
var tblBody;
var thead;
var h4;
var col22;

function creaEncabezado(textoth, columnas, titulo) {
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
            if (i3 == 0 || i3 == 2) {
                celdath.style.width = "20%";
            }
            if (i3 == 1) {
                celdath.style.width = "60%";
            }

            hilera.appendChild(celdath);
        }

        thead.appendChild(hilera);
    }
}


function limpiaTabla() {
    //    alert("Limpia Tabla renglones: " + renglones2);
    var vacio = "";
    var col2;

    if (!document.getElementById("encabezadoy2")) {
        //        alert("No hay tabla a limpiar");
        return;
    }

    for (var renglon2 = 0; renglon2 < renglones2; renglon2++) {
        for (col2 = 0; col2 < columnas2; col2++) {
            var campox1 = "camp" + col2 + "-reng" + renglon2;
            document.getElementById(campox1).innerHTML = vacio;
        }
    }
}

function creaTabla(renglones, columnas) {
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

    for (var i = renglones2; i <= renglones; i++) {
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

            if (i2 == 0 || i2 == 2) {
                celda.style.textAlign = "center";
                celda.style.paddingRight = "9px";
                celda.style.width = "20%";
            } else {
                celda.style.textAlign = "left";
                celda.style.paddingRight = "9px";
                celda.style.width = "60%";
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