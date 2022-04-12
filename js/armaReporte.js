/*
Programa: armaReporte.js
Autor: Federico Ramos H.
Fecha del desarrollo: 
Fecha última modificación: 05-03-2021
Descripción del programa: Armado del formato del reporte de información de los tickets de venta pendientes de cobro
y despliegue de los mismos.
Última modificación: Adecuaciones para el uso generalizado del formateo y despliegue de información en pantalla.
*/

var renglones2 = 0;
var columnas2 = 0;
var tabla;
var tblBody;
var thead;
//var h3;
var col22;
//var generales2;

// Genera el reporte de credito
function creaReporte() {
    //    alert("Despliega titulos de encabezado");
    var columnas = 5;
    columnas2 = columnas;
    var encabezadox = [];
    var renglones = 20;
    renglones2 = renglones;
    encabezadox = ["TICKET DE VENTA", "FECHA", "IMPORTE TICKET", "ESTATUS", "IMPORTE PAGADO"];
    creaEncabezado(encabezadox, columnas);
    creaTabla(renglones, columnas);
}

// Despliega renglon en el reporte, el producto incluido en el pedido
function despliegaTabla(campoz2, renglon, limpia) {
    //    alert("Despliega renglon de compra;"+linea+" Renglon:"+renglon);
    if (!document.getElementById("tabla4")) {
        alert("No existe la tabla4");
        return;
    }

    var imp_ticket6;
    var imp_pagado6;
    var i1;

    var formatPesos = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    var campoxx = [];
    campoxx = campoz2;

    if (!limpia) {
        for (i1 = 2; i1 <= columnas2; i1++) {
            if ((campoxx[i1] == null) || (campoxx[i1] == '')) {
                campoxx[i1] = '0';
            }
        }

        imp_ticket6 = campoxx[2];
        imp_pagado6 = campoxx[4];
        imp_ticket6 = imp_ticket6 * 1;
        imp_pagado6 = imp_pagado6 * 1;

        if (campoxx[3] == "Ultimo") {
            campoxx[2] = "";
            campoxx[3] = "";
            campoxx[4] = "";
        } else {
            campoxx[2] = formatPesos.format(imp_ticket6);
            campoxx[4] = formatPesos.format(imp_pagado6);
        }
    }

    for (i1 = 0; i1 < columnas2; i1++) {
        var campox21 = "camp" + i1 + "-reng" + renglon;
        document.getElementById(campox21).innerHTML = campoxx[i1];
    }
}

// Crea encabezado del reporte
function creaEncabezado(textoth, columnas) {
    //    alert("Crea Encabezado");

    if (document.getElementById('tabla4')) {
        //        alert("Tabla ya creada: ");
        //        var num_col = document.getElementById('tabla4').rows[0].cells.length;
        for (var col23 = 0; col23 < columnas; col23++) {
            var encabezadox1 = "enca" + col23;
            var etiqueta = textoth[col23];
            if (etiqueta.length == 0) {
                etiqueta = " ";
            }
            document.getElementById(encabezadox1).innerHTML = etiqueta;
        }
        return;
    }

    tblBody = document.createElement("tbody", {
        class: "interlineado"
    });
    tblBody.id = "cuerpo";

    if (!document.getElementById("encabezadoy")) { // Si no existe encabezado, lo crea
        //        alert("Crea el encabezado");
        thead = document.createElement("thead");
        thead.id = "encabezadoy";
        var hilera = document.createElement("tr");
        hilera.id = "enc_hilera1";

        for (var i3 = 0; i3 < columnas; i3++) {
            var celdath = document.createElement("th");
            celdath.id = "enca" + i3;
            var textoCelda = document.createTextNode(textoth[i3]);
            celdath.appendChild(textoCelda);
            celdath.style.paddingRight = "10px";
            celdath.style.paddingLeft = "10px";
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

// Limpia el contenido del reporte
function limpiaTabla() {
    for (var i1 = 0; i1 < renglones2; i1++) {
        var vaciox1 = "";
        var campoz1 = [];
        for (var i2 = 0; i2 <= columnas2; i2++) {
            campoz1[i2] = vaciox1;
        }
        var renglon = i1;
        var limpia = true;
        //        alert("Limpia tabla");
        despliegaTabla(campoz1, renglon, limpia);
    }
}

// Crea la tabla del reporte
function creaTabla(renglones, columnas) {
    //    alert("Crea formato de tabla, renglones:  " + renglones + "  columnas:" + columnas);

    if ((renglones <= 0) || (renglones < renglones2)) {
        alert("No hay renglones a crear - renglones2:  " + renglones2 + "  renglones:" + renglones);
        return;
    }

    var body = document.getElementsByTagName("body8")[0];
    //    body.className = "formato";

    if (!document.getElementById("tabla4")) {
        //           alert("No existe la tabla, se crea tabla y el cuerpo de la tabla");
        tabla = document.createElement("table", {
            class: "scroll"
        });
        tabla.id = "tabla4";
        tabla.style.width = "100%";

        tblBody = document.createElement("tbody", {
            class: "interlineado"
        });
        tblBody.id = "cuerpo";
    } else {
        tabla = document.getElementById("tabla4");
        tblBody = document.getElementById("cuerpo");
    }

    for (var i = 0; i < renglones2; i++) {
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

            if ((i2 == 2) || (i2 == 4)) {
                celda.style.textAlign = "right";
                celda.style.paddingRight = "5px";
                celda.style.paddingLeft = "15px";
            }
            if (i2 == 0 || i2 == 1 || i2 == 3) {
                celda.style.textAlign = "center";
            }
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    tabla.appendChild(thead);
    body.appendChild(tabla);
}