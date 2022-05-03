var tablax6;
var cuerpox6;

// Reporte rapido en pantalla
function quickReport(conocimientos, tabla, cuerpo) {
    tablax6 = tabla;
    cuerpox6 = cuerpo;

    //    alert("Crea tabla de conocimientos, entra a QuickReport");
    var listaConocim = new Array(65);
    listaConocim = conocimientos;
    limpiaTabla();

    var titulo = "LISTA DE CONOCIMIENTOS";
    var renglones = 0;

    var linea = listaConocim;
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

    columnas = 6;
    renglon4 = 0;
    if (columnas2 < columnas) {
        columnas2 = columnas;
    }

    var limpiax1 = [];
    var encabezadox = [];
    encabezadox = limpiax1;
    encabezadox = ["APLICACION", "DIRECCION WEB", "ALTA", "BAJA", "CAMBIO", "CONSULTA"];

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

    var nombre = campoxx[0].replace(/"/g, "");
    var direccion = campoxx[1];
    var permisos = campoxx[2].split("-");
    var permiso = [];

    for (var i = 0; i < 4; i++) {
        if (permisos[i] == 1) {
            permiso[i] = "si";
        } else {
            permiso[i] = "no";
        }
    }

    var campo1 = "camp0-reng" + renglon2;
    var campo2 = "camp1-reng" + renglon2;
    var campo3 = "camp2-reng" + renglon2;
    var campo4 = "camp3-reng" + renglon2;
    var campo5 = "camp4-reng" + renglon2;
    var campo6 = "camp5-reng" + renglon2;

    document.getElementById(campo1).innerHTML = nombre;
    document.getElementById(campo2).innerHTML = direccion;
    document.getElementById(campo3).innerHTML = permiso[0];
    document.getElementById(campo4).innerHTML = permiso[1];
    document.getElementById(campo5).innerHTML = permiso[2];
    document.getElementById(campo6).innerHTML = permiso[3];
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
        //        alert("Tabla ya creada: ");
        //        var num_col = document.getElementById('tabla4').rows[0].cells.length;
        //        alert("Rellena el encabezado con los nuevos titulos");
        for (var col23 = 0; col23 < columnas; col23++) {
            var encabezadox1 = "enca" + col23;
            var etiqueta = textoth[col23];
            if (etiqueta.length == 0) {
                etiqueta = " ";
            }
            document.getElementById(encabezadox1).innerHTML = etiqueta;
        }
        //        return;
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
    } else { // Si existe el encabezado lo llena con los nuevos titulos
        //        alert("Rellena el encabezado con los nuevos titulos");
        for (col22 = 0; col22 < columnas; col22++) {
            var encabezadox11 = "enca" + col22;
            var etiqueta1 = textoth[col22];
            if (etiqueta1.length == 0) {
                etiqueta1 = " ";
            }
            document.getElementById(encabezadox11).innerHTML = etiqueta1;
        }
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

    var body = document.getElementsByTagName("body8")[0];
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
        tabla.style.height = "100%";
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

    for (var i = renglones2; i < renglones; i++) {
        //                alert("Crea linea: " + i);
        var hilera = document.createElement("tr");
        hilera.id = i;

        for (var i2 = 0; i2 < columnas; i2++) {
            //            alert("Crea campo: " + i2 + "  linea:" + i);
            var idcampo = "camp" + i2 + "-reng" + i;
            var celda = document.createElement("td");
            var parrafo = document.createElement("p");
            parrafo.id = idcampo;
            celda.appendChild(parrafo);

            if (i2 == 0 || i2 == 1) {
                celda.style.textAlign = "left";
                celda.style.paddingRight = "9px";
            } else {
                celda.style.textAlign = "center";
                celda.style.paddingRight = "5px";
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