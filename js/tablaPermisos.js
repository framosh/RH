var renglones2 = 0;
var renglones = 0;
var columnas2 = 0;
var tabla;
var tblBody;
var thead;
//var h3;
var col22;
//var generales2;

function creaEncabezado1() {
    //    alert("Despliega titulos de encabezado");
    var columnas = 6;
    columnas2 = columnas;
    var encabezadox = [];
    renglones = 65;
    renglones2 = renglones;
    encabezadox = ["APLICACION", "DIRECCION WEB", "ALTA", "BAJA", "CAMBIO", "CONSULTA"];
    creaEncabezado(encabezadox, columnas);
    creaTabla(renglones, columnas);
}

// Despliega renglon de producto agregado al pedido
function despliegaTabla(campoz2, renglon) {
    //    alert("Despliega renglon de compra;"+linea+" Renglon:"+renglon);
    if (!document.getElementById("tabla4")) {
        alert("No existe tabla4");
        return;
    }

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

function limpiaTabla() {
    for (var i1 = 0; i1 < renglones; i1++) {
        var vaciox1 = "";
        var campoz1 = [];
        for (var i2 = 0; i2 < columnas2; i2++) {
            campoz1[i2] = vaciox1;
        }
        var renglon = i1;
        despliegaTabla(campoz1, renglon);
    }
}

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

            if ((i2 >= 2) && (i2 <= 5)) {
                celda.style.textAlign = "center";
                //                celda.style.paddingRight = "5px";
                //              celda.style.paddingLeft = "15px";
            }
            if (i2 == 0) {
                celda.style.textAlign = "left";
                celda.style.paddingRight = "20px";
            }
            if (i2 == 1) {
                celda.style.textAlign = "left";
            }
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    tabla.appendChild(thead);
    body.appendChild(tabla);
}