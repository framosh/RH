var renglones2 = 0;
var columnas2 = 0;
var tabla;
var tblBody;
var thead;
var h4;
var col22;
var tablax6;
var cuerpox6;

function creaEncabezado1() {
    //    alert("Despliega titulos de encabezado");
    var columnas = 6;
    columnas2 = columnas;
    var encabezadox = [];
    var renglones = 65;
    renglones2 = renglones;
    var titulo = "";
    encabezadox = ["APLICACION", "DIRECCION WEB", "ALTA", "BAJA", "CAMBIO", "CONSULTA"];
    creaEncabezado(encabezadox, columnas, titulo);
    creaTabla(renglones, columnas);
}

// Despliega renglon de producto agregado al pedido
function despliegaTabla(campoz2, renglon) {
    //    alert("Despliega renglon de compra;"+linea+" Renglon:"+renglon);
    /*
    if (!document.getElementById("tabla4")) {
        alert("No existe tabla4");
        return;
    }
    */

    var campoxx = [];
    campoxx = campoz2;

    for (var i1 = 0; i1 < columnas2; i1++) {
        if ((campoxx[i1] == null) || (campoxx[i1] == '')) {
            campoxx[i1] = '';
        }
    }

    var aplicacion = campoxx[0].replace(/"/g, "");
    var direccion = campoxx[1].replace(/"/g, "");
    var permisos = campoxx[2].split("-");
    for (var i = 0; i < permisos.length; i++) {
        if (permisos[i] == "1") {
            permisos[i] = "si";
        } else {
            permisos[i] = "no";
        }
    }
    var alta2 = permisos[0];
    var baja2 = permisos[1];
    var cambio2 = permisos[2];
    var consulta2 = permisos[3];

    if (aplicacion == '' || aplicacion == null) {
        direccion = '';
        alta2 = '';
        baja2 = '';
        cambio2 = '';
        consulta2 = '';
    }

    var campo1 = "camp0-reng" + renglon;
    var campo2 = "camp1-reng" + renglon;
    var campo3 = "camp2-reng" + renglon;
    var campo4 = "camp3-reng" + renglon;
    var campo5 = "camp4-reng" + renglon;
    var campo6 = "camp5-reng" + renglon;

    document.getElementById(campo1).innerHTML = aplicacion;
    document.getElementById(campo2).innerHTML = direccion;
    document.getElementById(campo3).innerHTML = alta2;
    document.getElementById(campo4).innerHTML = baja2;
    document.getElementById(campo5).innerHTML = cambio2;
    document.getElementById(campo6).innerHTML = consulta2;
}

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