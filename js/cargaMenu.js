//var servidor_local = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";
//var clave_empresa;
var aplicacion3 = [];

function cargaInicio() {
    //    clave_empresa = dato4[5];

    switch (dato4[2]) // Nivel
    {
        case 'A':
            window.location.href = "principal.htm" + "?user=" + dato4[0] + "&nombre=" + dato4[1] + "&nivel=" + dato4[2] + "&puesto=" + dato4[3] + "&em1=" + dato4[5];
            //                  window.location.href = "soporte.htm"+"?user="+dato4[0]+"&nivel="+dato4[1]+"&nombre="+dato4[2]+"&puesto="+dato4[3];
            break;
        case 'B':
            window.location.href = "principal.htm" + "?user=" + dato4[0] + "&nombre=" + dato4[1] + "&nivel=" + dato4[2] + "&puesto=" + dato4[3] + "&em1=" + dato4[5];

            break;
        default:
            alert("No hay nivel signado para : " + dato4[1]);
    }
}

/*
dato4[0]  //  User
dato4[1]   //  Nombre
dato4[2]   //  Nivel A-B_C
dato4[3]   //  Puesto
dato4[4]   //  Empresa
*/

function lanzaAplicacion(aplicacion) {
    var aplicacion2 = aplicacion + ".htm";
    var usuario1 = dato4[0];
    var nombre1 = dato4[1];
    var nivel = dato4[2];
    //    clave_empresa = dato4[4];
    var pl = "";
    //    alert("Empresa 2: " + dato4[4]);
    //   alert("Lanza: " + aplicacion2);

    var puesto33 = dato4[3];
    leeApliAsignadas(puesto33);

    updatePlease();

    alert("Aplicaciones validas: " + aplicacion3.length);

    for (var i = 0; i < aplicacion3.length; i++) {
        var aplicacion4 = aplicacion3[i].split("|");
        var aplicacionx = aplicacion4[0] + ".htm";
        pl = aplicacion4[2];

        if (aplicacionx == aplicacion2) {
            window.location.href = aplicacion2 + "?u1=" + usuario1 + "&no1=" + nombre1 + "&ni1=" + nivel + "&puesto=" + dato4[3] + "&pl=" + pl + "&em1=" + dato4[4];
            return;
        }
    }
    alert("No tiene permiso de ingreso a la aplicacion");
}

var timer = 60;

function updatePlease() {
    timer--;
    if (timer > 0) {
        document.getElementById("mensajes").innerHTML = timer;
        setTimeout(updatePlease, 1000);
    }
}


function captura_Teclado() {
    var aplica = "";

    window.addEventListener('keydown', function (e) {
        //        alert("dato4:" + dato4[1]);

        if (dato4[2] == 'A') {
            if (e.ctrlKey && e.key == 'z') {
                aplica = 'admon';
            } // Ctlr-Z
            //            if(e.ctrlKey && e.keyCode == 90){ aplica='reset_db'; } // Ctlr-Z
            if (e.ctrlKey && e.key == 'x') {
                aplica = 'principal';
            } // Ctlr-X

            //          if(e.ctrlKey && e.keyCode == 88){ aplica='permisos'; } // Ctlr-Y
            if (aplica != "") {
                lanzaAplicacion(aplica);
            }
        }
    });
}

/* CONSULTA APLICACIONES ASIGNADAS AL PUESTO */
function leeApliAsignadas(puestox) {
    captura_Teclado();
    //    alert("Lee aplicaciones asignadas Puesto: " + puestox);

    for (var i4 = 0; i4 < aplicacion3.length; i4++) {
        aplicacion3[i4] = "";
    }
    //        var archivo1 = "https://svr.itbp.com.mx/httpdocs/consultaAplicaciones.php";
    var archivo1 = servidor + "httpdocs/consultaAplicaciones.php";
    var archivo2 = archivo1 + "?puesto=" + puestox;
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
            //            alert("Aplicaciones asignadas para el puesto: " + puestox + "  aplicaciones: " + cadena);

            if (cadena == "No hay Aplicaciones asignadas") {
                //                document.getElementById("mensaje_permisos").innerHTML = cadena;
                document.getElementById("mensaje_permisos").value = cadena;
                return;
            }
            aplicacion3 = cadena.split("\n");
            //           alert("Registros encontrados: " + aplicacion3.length);
        }
    };
}