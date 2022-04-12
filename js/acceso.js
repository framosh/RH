//var servidor = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";

/* VALIDA INGRESO AL SISTEMA  */
function validacion() {
    var dato = [];

    //limpiaPantalla();
//    alert("Validacion: "+servidor);

    var usuario = document.getElementById("Uclave").value;
    var clave = document.getElementById("clvacceso").value;

    var archivo1 = servidor + "validacion.php";
    var archivo2 = archivo1 + "?Uclave=" + usuario + "&clvacceso=" + clave;
    var xhttp;

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
//        alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
//            alert("paso 1.8");
            var cadena = xhttp.responseText;

//            alert("cadena: " + cadena);
            dato = cadena.split("|");

            for (var i = 0; i < dato.length; i++) {
                var campo = dato[i];
                if (campo) {
                    dato[i] = dato[i].replace(/\"/g, "");
                    dato[i] = dato[i].trim();
//                    alert("campo: (" + i + ") - (" + dato[i] + ")");
                }
            }

            document.getElementById("nombre").innerHTML = dato[1];
            /*
            dato[0]  //  User
            dato[1]   //  Nombre
            dato[2]   //  Nivel
            dato[3]   //  Clave
            dato[4]   //  Puesto
            */
            //  dato[i]: 0=usuario, 1=nivel, 2=nombre
            
//            alert("Datos 1: (" + dato[0] + ")-(" + dato[1] + ")-(" + dato[2] + ")-(" + dato[3] + ")-(" + dato[4] + ")");

            if (dato[3] == clave) {
                switch (dato[2]) // Nivel
                {
                    case "1":
                        window.location.href = "principal.htm" + "?u1=" + usuario + "&ni1=" + dato[2] + "&no1=" + dato[1] + "&pu1=" + dato[4];
                        //                       window.location.href = "soporte.htm"+"?u1="+usuario+"&ni1="+dato[2]+"&no1="+dato[1]+"&pu1="+dato[4];
                        break;
                    case "2":
                        window.location.href = "principal.htm" + "?u1=" + usuario + "&ni1=" + dato[2] + "&no1=" + dato[1] + "&pu1=" + dato[4];
                        break;
                    default:
                        window.location.href = "index.htm";
//                        opcion3 = "0";
                }
            } else {
                alert("Clave invalida");
                }
        } else {
//            alert("readyState=" + xhttp.readyState + "   Status=" + xhttp.status);
        }
    };
}
