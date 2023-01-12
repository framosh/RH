/*
Generación de tabla dinamica configurable con renglones y columnas definidos a voluntad
*/
var renglones2 = 0;
var columnas2 = 0;
var thead1;
var thead2;

var tablah;
var cuerpox;
var tbodyx1;
var encabezadox11;

// Reporte rapido en pantalla de estudios
function quickReport2(registros, tablah1, cuerpox1) {
    var renglones = registros.length;
    //    alert("Renglones: " + renglones);
    //  alert("Registros:" + registros);

    var listaInforme = new Array(30);
    listaInforme = registros;
    //    tablah = tablah1;
    cuerpox = cuerpox1;
    tablah = cuerpox + "99";
    tbodyx1 = cuerpox + "tb";
    encabezadox11 = cuerpox + "en";
    var mensaje1;

    if (renglones < 1) {
        mensaje1 = "No hay registros a desplegar";
        document.getElementById("mensaje_gral").innerHTML = mensaje1;
        return;
    }

    //Despliega Formación Complementaria
    if (cuerpox == "body10") {
        var i4;
        var columnas = 5;
        var renglon4 = 0;
        if (columnas2 < columnas) {
            columnas2 = columnas;
        }
        var limpiax1 = [];
        var encabezadox = [];
        encabezadox = limpiax1;
        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];

        creaEncabezado1(encabezadox, columnas);
        creaTabla1(renglones, columnas);

        if (document.getElementById(tablah)) {
            for (i4 = 0; i4 < renglones; i4++) {
                if ((listaInforme[i4] != null) && (listaInforme[i4] != "")) {
                    despliega2(listaInforme[i4], renglon4);
                    renglon4++;
                }
            }
        } else {
            alert("No existe la tablah: " + tablah);
        }
    }

    // Tabla a llenar de la experiencia
    if (cuerpox == "body8") {
        creaTabla55(renglones);

        if (document.getElementById(tablah)) {
            for (var i5 = 0; i5 < renglones; i5++) {
                if ((listaInforme[i5] != null) && (listaInforme[i5] != "")) {
                    despliega5(listaInforme[i5], i5);
                }
            }
        }
    }

    // Tabla de herramientas manejadas
    if (cuerpox == "body11") {
        var i6;
        var columnas6 = 4;
        var renglon6 = 0;
        //        renglones = renglones - 1;
        if (columnas2 < columnas6) {
            columnas2 = columnas6;
        }
        //  Con_candidato.clv_conocim, conocimientos.cono_desc, Con_candidato.con_nivel, 
        //Con_candidato.con_anios, Con_candidato.con_meses 

        var limpiax6 = [];
        var encabezado6 = [];
        encabezado6 = limpiax6;
        encabezado6 = ["HERRAMIENTA", "NIVEL", "AÑOS", "MESES"];

        creaEncabezado2(encabezado6, columnas6);
        creaTabla2(renglones, columnas6);

        if (document.getElementById(tablah)) {
            for (i6 = 1; i6 <= renglones; i6++) {
                if ((listaInforme[i6] != null) && (listaInforme[i6] != "")) {
                    despliega2(listaInforme[i6], renglon6);
                    renglon6++;
                }
            }
        } else {
            alert("No existe la tablah: " + tablah);
        }
    }

}

// Despliega datos de experiencia
function despliega5(linea, registro) {
    //    alert("Despliega datos de experiencia");
    //    alert("Información: " + linea + "  registro: " + registro);
    var campoxx = linea.split("|");

    for (var i = 0; i <= 7; i++) {
        var campox2 = i + 2;
        var informacion = campoxx[campox2];
        if (i == 5) {
            informacion = informacion.replace("\\n", "<br>");
        }

        var campo1 = "reg-" + registro + "ren-" + i + "col-" + 1;
        document.getElementById(campo1).innerHTML = informacion;
    }
}

// DESPLIEGA HERRAMIENTAS MANEJADAS POR EL CANDIDATO
function despliega2(linea, renglon) {
    // alert("Despliega linea: " + linea + " Renglon: " + renglon);
    var campoxx = linea.split("|");
    var renglon2 = renglon;

    var campo1 = "camp0-reng" + renglon2;
    var campo2 = "camp1-reng" + renglon2;
    var campo3 = "camp2-reng" + renglon2;
    var campo4 = "camp3-reng" + renglon2;
    //    var campo5 = "camp4-reng" + renglon2;

    document.getElementById(campo1).innerHTML = campoxx[0];
    document.getElementById(campo2).innerHTML = campoxx[1];
    document.getElementById(campo3).innerHTML = campoxx[2];
    document.getElementById(campo4).innerHTML = campoxx[3];
    //  document.getElementById(campo5).innerHTML = campoxx[4];
}

// Encabezado de capacitación adicional
function creaEncabezado1(textoth, columnas) {
    //   alert("Crea Encabezado: " + textoth);

    if (!document.getElementById(encabezadox11)) { // Si no existe encabezado, lo crea
        //        alert("Crea el encabezado");
        thead1 = document.createElement("thead", {
            class: "formato"
        });
        thead1.id = encabezadox11;

        var hilera = document.createElement("tr");

        for (var i3 = 0; i3 < columnas; i3++) {
            var celdath = document.createElement("th");
            celdath.id = "enca" + i3;
            var textoCelda = document.createTextNode(textoth[i3]);
            celdath.appendChild(textoCelda);
            celdath.style.paddingRight = "10px";
            celdath.style.paddingLeft = "10px";
            celdath.style.textAlign = "center";
            //            alert("i3: " + i3 + "  cuerpox: " + cuerpox);
            if (i3 == 0 || i3 == 1) {
                //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
                celdath.style.columnWidth = "30%";
            }
            if (i3 == 2) {
                //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
                celdath.style.columnWidth = "20%";
            }
            if ((i3 == 3) || (i3 == 4)) {
                //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
                celdath.style.columnWidth = "10%";
            }

            hilera.appendChild(celdath);
        }
        thead1.appendChild(hilera);
    }

    if (document.getElementById(encabezadox11)) {
        for (var col23 = 0; col23 < columnas; col23++) {
            var encabezadox1 = "enca" + col23;
            var etiqueta = textoth[col23];
            if (etiqueta.length == 0) {
                etiqueta = " ";
            }
            document.getElementById(encabezadox1).innerHTML = etiqueta;
        }
    }
}

// Encabezado de herramientas
function creaEncabezado2(textoth, columnas) {
    //   alert("Crea Encabezado: " + textoth);

    if (!document.getElementById(encabezadox11)) { // Si no existe encabezado, lo crea
        //        alert("Crea el encabezado");
        thead2 = document.createElement("thead", {
            class: "formato"
        });
        thead2.id = encabezadox11;

        var hilera = document.createElement("tr");

        for (var i3 = 0; i3 < columnas; i3++) {
            var celdath = document.createElement("th");
            celdath.id = "enca" + i3;
            var textoCelda = document.createTextNode(textoth[i3]);
            celdath.appendChild(textoCelda);
            celdath.style.paddingRight = "10px";
            celdath.style.paddingLeft = "10px";
            celdath.style.textAlign = "center";
            //            alert("i3: " + i3 + "  cuerpox: " + cuerpox);

            if (i3 == 0) {
                //        encabezado6 = ["HERRAMIENTA", "NIVEL", "AÑOS", "MESES"];
                celdath.style.columnWidth = "40%";
            }
            if (i3 > 0) {
                //        encabezado6 = ["HERRAMIENTA", "NIVEL", "AÑOS", "MESES"];
                celdath.style.columnWidth = "20%";
            }

            hilera.appendChild(celdath);
        }
        thead2.appendChild(hilera);
    }

    if (document.getElementById(encabezadox11)) {
        for (var col23 = 0; col23 < columnas; col23++) {
            var encabezadox1 = "enca" + col23;
            var etiqueta = textoth[col23];
            if (etiqueta.length == 0) {
                etiqueta = " ";
            }
            document.getElementById(encabezadox1).innerHTML = etiqueta;
        }
    }
}


function limpiaTabla2() {
    //    alert("Limpia Tabla renglones: " + renglones2);
    var vacio = "";
    var col2;

    if (!document.getElementById(tablah)) {
        alert("No hay tabla a limpiar");
        return;
    }

    for (var renglon2 = 0; renglon2 < renglones2; renglon2++) {
        for (col2 = 0; col2 < columnas2; col2++) {
            var campox1 = "camp" + col2 + "-reng" + renglon2;
            document.getElementById(campox1).innerHTML = vacio;
        }
    }
}

// Experiencia laboral
function creaTabla55(registros) {
    //    alert("Crea tabla de experiencia laboral");
    registros = registros - 1;

    if (registros <= 0) {
        alert("No hay renglones a crear: " + registros);
        return;
    }

    var altura = 0;
    altura = (registros * 300);
    var altura_max = altura + "px";
    var tabla;
    var tblBody;

    document.getElementById("myDiv").style.maxHeight = altura_max;
    var div = document.getElementById("myDiv");

    var body = document.getElementsByTagName("body8")[0];
    body.className = "container";

    if (!document.getElementById("tabla5")) {
        //           alert("No existe la tabla, se crea tabla y el cuerpo de la tabla");
        tabla = document.createElement("table");
        tabla.id = tablah;
        tabla.style.width = "100%";
        //    tabla.style.width = "100%";
        tabla.style.maxHeight = altura_max;
        tblBody = document.createElement("tbody");
        tblBody.id = tbodyx1;
    } else {
        //        tabla = document.getElementById("tabla5");
        tabla = document.getElementById(tablah);
        tblBody = document.getElementById(tbodyx1);
    }

    //    alert("Registros: " + registros);
    for (var i = 0; i < registros; i++) { // Experiencias laborales
        for (var i2 = 0; i2 <= 7; i2++) { // Renglon del registro - informacion de cada experiencia
            var color = "rgb(133, 228, 235)";
            if (i2 == 0) {
                color = "rgb(241, 183, 94)";
            }
            var hilera = document.createElement("tr");
            hilera.id = i2;
            hilera.style.backgroundColor = color;

            for (var i3 = 0; i3 < 2; i3++) { // Columna del registro - columna de titulo y columna de datos 
                var idcampo = "reg-" + i + "ren-" + i2 + "col-" + i3;
                var celda = document.createElement("td");
                //                var parrafo = document.createElement("p");
                celda.id = idcampo;

                if (i3 == 0) {
                    celda.style.paddingRight = "5px";
                    celda.style.paddingLeft = "5px";
                    celda.style.textAlign = "left";
                    celda.style.columnWidth = "20%";
                    celda.style.fontWeight = "bold";
                }

                if (i3 == 1) {
                    celda.style.paddingRight = "5px";
                    celda.style.paddingLeft = "5px";
                    celda.style.textAlign = "left";
                    //                    parrafo.style.columnWidth = "400px";
                    celda.style.fontWeight = "normal";
                    celda.style.columnWidth = "80%";
                }

                var titulo = "";
                if (i2 == 0) {
                    titulo = "Empresa:";
                }
                if (i2 == 1) {
                    titulo = "Puesto:";
                }
                if (i2 == 2) {
                    titulo = "Período:";
                }
                if (i2 == 3) {
                    titulo = "Sueldo:";
                }
                if (i2 == 4) {
                    titulo = "Jefe:";
                }
                if (i2 == 5) {
                    titulo = "Actividades realizadas:";
                }
                if (i2 == 6) {
                    titulo = "Motivo de separación:";
                }
                if (i2 == 7) {
                    titulo = "Herramientas utilizadas:";
                }

                if (i3 == 0) {
                    var textoCelda = document.createTextNode(titulo);
                    celda.appendChild(textoCelda);
                }
                //                celda.appendChild(parrafo);
                hilera.appendChild(celda);
            }
            tblBody.appendChild(hilera);
        }
        var salto = document.createElement("br");
        tblBody.appendChild(salto);
        var salto2 = document.createElement("br");
        tblBody.appendChild(salto2);
        //        tabla.setAttribute("border", "2");
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    div.appendChild(body);
}

// Crea tabla para datos desplegados por linea individual de  
// herramientas que maneja
function creaTabla2(renglones, columnas) {
    //    alert("Crea formato de tabla:  " + tablah + "  renglones: " + renglones);
    var altura = 0;
    altura = (renglones * 100);
    var altura_max = altura + "px";
    var tabla;
    var tblBody;

    document.getElementById("myDiv3").style.maxHeight = altura_max;
    var div = document.getElementById("myDiv3");

    //    var body = document.getElementsByTagName(body2)[0];
    var body = document.getElementsByTagName(cuerpox)[0];
    //    body.className = "container";
    //    body.style.maxHeight = "5em";

    //    alert("valida existencia de tabla: " + tablah + "  si no la encuentra la crea");
    if (!document.getElementById(tablah)) {
        //      alert("No existe la tabla, se crea tabla y el cuerpo de la tabla");
        tabla = document.createElement("table");
        tabla.id = tablah;
        tabla.style.width = "100%";
        //        tabla.style.marginLeft = "10%";
        //      tabla.style.marginRight = "10%";
        tabla.style.maxHeight = altura_max;

        tblBody = document.createElement("tbody");
        tblBody.id = tbodyx1;
    } else {
        tabla = document.getElementById(tablah);
        tblBody = document.getElementById(tbodyx1);
    }

    //alert("Crea los renglones de la tabla: " + tablah);
    for (var i = 0; i < renglones; i++) {
        //  alert("Crea linea: " + i);
        var hilera = document.createElement("tr");
        hilera.id = i;

        for (var i2 = 0; i2 < columnas; i2++) {
            //    alert("Crea campo: " + i2 + "  linea:" + i);
            var idcampo = "camp" + i2 + "-reng" + i;
            var celda = document.createElement("td");
            //     var parrafo = document.createElement("p");
            celda.id = idcampo;
            //    celda.appendChild(parrafo);
            /*
                                celda.style.paddingRight = "5px";
                                celda.style.paddingLeft = "5px";
                                celda.style.textAlign = "left";
                                celda.style.columnWidth = "20%";
                                celda.style.fontWeight = "bold";
                        */

            if (i2 == 0) {
                celda.style.textAlign = "left";
                celda.style.paddingRight = "9px";
                celda.style.columnWidth = "40%";
            } else {
                celda.style.textAlign = "center";
                celda.style.paddingRight = "20px";
            }
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }

    if (renglones2 < renglones) {
        renglones2 = renglones;
    }
    //    alert("Arma secuencia de tabla y body");
    tabla.appendChild(tblBody);
    tabla.appendChild(thead2);
    body.appendChild(tabla);
    div.appendChild(body);
}

//Formacion complementaria
function creaTabla1(renglones, columnas) {
    //    alert("Crea formato de tabla:  " + tablah + "  renglones: " + renglones);

    var altura = 0;
    altura = (renglones * 100);
    var altura_max = altura + "px";
    var tabla;
    var tblBody;

    //  document.getElementById("myDiv2").style.maxHeight = altura_max;
    var div = document.getElementById("myDiv2");

    var body = document.getElementsByTagName("body10")[0];

    //    alert("valida existencia de tabla: " + tablah + "  si no la encuentra la crea");
    if (!document.getElementById(tablah)) {
        //      alert("No existe la tabla, se crea tabla y el cuerpo de la tabla");
        tabla = document.createElement("table");
        tabla.id = tablah;
        tabla.style.width = "100%";
        //        tabla.style.marginLeft = "10%";
        //      tabla.style.marginRight = "10%";
        //        tabla.style.maxHeight = altura_max;

        tblBody = document.createElement("tbody");
        tblBody.id = tbodyx1;
    } else {
        tabla = document.getElementById(tablah);
        tblBody = document.getElementById(tbodyx1);
    }

    //alert("Crea los renglones de la tabla: " + tablah);
    for (var i = 0; i < renglones; i++) {
        //  alert("Crea linea: " + i);
        var hilera = document.createElement("tr");
        hilera.id = i;

        for (var i2 = 0; i2 < columnas; i2++) {
            //    alert("Crea campo: " + i2 + "  linea:" + i);
            var idcampo = "camp" + i2 + "-reng" + i;
            var celda = document.createElement("td");
            //     var parrafo = document.createElement("p");
            celda.id = idcampo;
            //    celda.appendChild(parrafo);

            //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
            if (i2 == 0 || i2 == 1) {
                //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
                //alert("Formatea col: " + i2 + "  de renglon: " + i);
                celda.style.columnWidth = "30%";
                //celda.style.columnWidth = "100px";
                celda.style.textAlign = "left";
                celda.style.paddingRight = "20px";
            }
            if (i2 == 2) {
                //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
                celda.style.columnWidth = "20%";
                celda.style.textAlign = "left";
                celda.style.paddingRight = "20px";
            }
            if ((i2 == 3) || (i2 == 4)) {
                //        encabezadox = ["CURSO", "COLEGIO", "CAMPUS", "FECHA", "ESTATUS"];
                celda.style.columnWidth = "10%";
                celda.style.textAlign = "center";
                celda.style.paddingRight = "9px";
            }

            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }

    if (renglones2 < renglones) {
        renglones2 = renglones;
    }
    //    alert("Arma secuencia de tabla y body");
    tabla.appendChild(tblBody);
    tabla.appendChild(thead1);
    body.appendChild(tabla);
    div.appendChild(body);
}