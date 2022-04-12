//var servidor = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";

/* VALIDA INGRESO AL SISTEMA  */
var dato4 = [];

function validacion() {
    var usuario = document.getElementById("Uclave").value;
    var clave = document.getElementById("clvacceso").value;

    var archivo1 = servidor + "httpdocs/validacion.php";
    var archivo2 = archivo1 + "?Uclave=" + usuario + "&clvacceso=" + clave;
    var xhttp;

    //    alert("archivo2: " + archivo2);

    //    alert("Entra a validacion de Usuario: (" + usuario + ")  pwd: (" + clave + ")");
    //    alert("url a activar: " + archivo2);
    //    var actual_url = window.location.href;
    //    var actual_url = window.location.pathname;
    //    alert("Actual url: " + actual_url);


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
            //            alert("Cadena: " + cadena);
            dato4 = cadena.split("|");

            for (var i = 0; i < dato4.length; i++) {
                var campo = dato4[i];
                if (campo) {
                    dato4[i] = dato4[i].replace(/\"/g, "");
                    dato4[i] = dato4[i].trim();
                    //                    alert("campo: (" + i + ") - (" + dato4[i] + ")");
                }
            }

            document.getElementById("nombre").innerHTML = dato4[1];
            /*
            dato4[0]  //  User
            dato4[1]   //  Nombre
            dato4[2]   //  Nivel A-B_C
            dato4[3]   //  Clave
            dato4[4]   //  Puesto
            */

            //            alert("Datos: (" + dato4[0] + ")-(" + dato4[1] + ")-(" + dato4[2] + ")-(" + dato4[3] + ")-(" + dato4[4] + ")");
            //          alert("dato4[3]=(" + dato4[3] + ")  Clave= (" + clave + ")");

            if (dato4[3] == clave) {
                switch (dato4[2]) // Nivel
                {
                    case 'A':
                        window.location.href = "principal.htm" + "?u1=" + dato4[0] + "&no1=" + dato4[1] + "&ni1=" + dato4[2] + "&pu1=" + dato4[4];
                        break;
                    case 'B':
                        window.location.href = "principal.htm" + "?u1=" + dato4[0] + "&no1=" + dato4[1] + "&ni1=" + dato4[2] + "&pu1=" + dato4[4];
                        break;
                    default:
                        window.location.href = "index.htm";
                }
            } else {
                alert("Clave invalida");
            }
        } else {
            //            alert("readyState=" + xhttp.readyState + "   Status=" + xhttp.status);
        }
    };
}