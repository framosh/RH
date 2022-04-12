
function creaEncabezado() {
//    alert("Crea Encabezado 1");

    var textoth=[];
    var body = document.getElementsByTagName('body2')[0];
    //var tabla = body.getElementsByTagName("table");

    if(document.getElementById('tabla3')) 
        {    
//        alert("Tabla ya creada: "+document.getElementById('tabla3'));
        return; }

var tabla = document.createElement("table");
tabla.id = "tabla3";
tabla.className = "formato";

var encabezado= document.createElement("thead");

var hilera = document.createElement("tr");
//hilera.id=solido;
//hilera.className = "nohover";
textoth[0] = "APLICACION";
textoth[1] = "DIRECCION WEB";
textoth[2] = "ALTA";
textoth[3] = "BAJA";
textoth[4] = "CAMBIO";
textoth[5] = "CONSULTA";

var columnas = 6;
for(var i3=0;i3<columnas;i3++){
    var celdath = document.createElement("th");
    var textoCelda = document.createTextNode(textoth[i3]);
    celdath.appendChild(textoCelda);
    hilera.appendChild(celdath);    
    }

encabezado.appendChild(hilera);
tabla.appendChild(encabezado);
body.appendChild(tabla);
}

function limpiaTabla() {
//    alert("Limpia Tabla");

    var tblbody = document.querySelector("tbody2");
    var encabezado= document.querySelector("thead");

    if((tblbody == null) || (encabezado == null)) {
//        alert("No hay tabla a Limpiar");
        return;
    }

    var vacio="";
    for(var renglon2=0;renglon2<renglones2;renglon2++){
        var campo1 = "camp0-reng"+renglon2;
        var campo2 = "camp1-reng"+renglon2;
        var campo3 = "camp2-reng"+renglon2;
        var campo4 = "camp3-reng"+renglon2;
        var campo5 = "camp4-reng"+renglon2;
        var campo6 = "camp5-reng"+renglon2;
    
        document.getElementById(campo1).innerHTML=vacio;
        document.getElementById(campo2).innerHTML=vacio;
        document.getElementById(campo3).innerHTML=vacio;
        document.getElementById(campo4).innerHTML=vacio;
        document.getElementById(campo5).innerHTML=vacio;
        document.getElementById(campo6).innerHTML=vacio; 
    }   
}

var renglones2=0;
var tabla;
var tblbody;

function creaTabla(renglones) {

//   alert("Crea Tabla con renglones:"+renglones);
    if((renglones<=0) || (renglones < renglones2)){
//        alert("No hay renglones a crear - renglones2:  "+renglones2);
        return;
    }

    var body = document.getElementsByTagName("body2")[0];
    body.className = "formato";

  //  alert("Paso 2");

    if(document.getElementById("tabla4")) { 
  //      alert("Ya existe la tabla");
        /*
        var tabla = document.getElementById("tabla4");
        tabla.id = "tabla4";
        tabla.className = "formato";
        var tblbody = document.getElementsByTagName("tbody2");   
        tblbody.className = "formato";
        */
    } 
    else { 
//        alert("No existe la tabla");
        tabla = document.createElement("table");
        tabla.id = "tabla4";
        tabla.className = "formato";
    
        tblbody= document.createElement("tbody2");
        tblbody.className = "formato";
        }

//alert("Paso 3, renglones2: "+renglones2+" renglones: "+renglones);
var columnas =6;

    for (var i=renglones2;i<renglones;i++) {
//        alert("Crea linea: "+i);
        var hilera = document.createElement("tr");
        hilera.id = i;
        for(var i2=0;i2<columnas;i2++){
            var idcampo = "camp"+i2+"-reng"+i;
            var celda = document.createElement("td");
            var parrafo = document.createElement("p");
            parrafo.id=idcampo;
            celda.appendChild(parrafo);
            hilera.appendChild(celda);            
            }
//        alert("Adiciona linea: "+i);
        tblbody.appendChild(hilera);
        }

//alert("Paso 4, renglones2: "+renglones2+" renglones: "+renglones);
    if(renglones2<renglones){
//        alert("Modifica la tabla");
        tabla.appendChild(tblbody);
        body.appendChild(tabla);
        renglones2=renglones;
        }
//    tabla.setAttribute("border","1");
}
