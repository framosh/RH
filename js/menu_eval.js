var dato6 = [];
var candidatox1;
var permiso_Aplicacion;
var timeOutId;
var intervalo = 300000;
var sinActividad = 300000;
var clave_empresa;

window.onload = function () {
    //      alert("Entra a carga de pagina");
    window.setInterval(startTimeOut, intervalo);

    elige_servidor();

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;
    var l = params.length;


    //      alert("l: " + l);
    /*
        if (l < 6) {
            window.location.href = "index.htm";
        }
    */
    //    var url2 = document.location.href;

    /*
            dato4[0]  //  User
            dato4[1]   //  Nombre
            dato4[2]   //  Nivel A-B_C
            dato4[3]   //  Puesto
            dato4[4]   // permisos
            dato4[5]   //  Empresa 
*/

    for (var i = 0; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1].replace(/%20/g, " ");
        dato6[i] = data[tmp[0]];
        dato6[i] = dato6[i].trim();
        //        alert("Dato4: " + i + "  contiene: " + dato4[i]);
    }

    candidatox1 = dato6[0];
    /*
        var direccion2 = url2.split("?")[0].split("/");
        direccion2[3] = direccion2[3].trim();
        var mensa = direccion2[3];

        var pagina = "";

        if (servidor == "/arhsi_local/") {
            pagina = direccion2[4];
        } else {
            pagina = direccion2[3];
        }
        */
    /*
        clave_empresa = dato4[5];
        //      alert("Empresa: (" + clave_empresa + ")");

        document.getElementById("nombre_candidato").innerHTML = dato4[1];
        buscaEmpresa(clave_empresa); // Busca el nombre de la empresa a donde pertenece el usuario

        if (pagina == "evalua_OM.htm") {
            document.getElementById("areas").textContent = leeAreas(); // Carga el catalogo de Areas
        }

        if (pagina == "evalua_XCOM.htm") {
            document.getElementById("aplicaciones").textContent = leeAplicaciones(); // Carga el catalogo de Aplicaciones
        }
        */
    buscaCandidato(candidatox1);
    //    buscaExamenes(candidatox1);
    despliega_menu();
};

var titulos = [];
var imagen = [];
var estatus = [];

function despliega_menu() {
    alert("Entra despliega menu del candidato: " + candidatox1);
    titulos = ["JavaScript", "HTML", "Java", "Android", "C#", "SQL"];
    imagen = ["js.png", "html.png", "java.png", "android.png", "C sharp.png", "sql.png"];
    estatus = ["pendiente", "aplicado"];
    var i = 0;
    for (i = 0; i < 6; i++) {
        var titulox = "evalua" + (i + 1);
        var estatusx = "estatus" + (i + 1);
        var tecnologia = "tecnologia" + (i + 1);
        var logo_url = "../img/" + imagen[i];
        document.getElementById(titulox).innerHTML = titulos[i];
        document.getElementById(estatusx).innerHTML = estatus[0];
        //        var preview = document.querySelector('.display_image');
        var preview = document.getElementById(tecnologia);
        preview.src = logo_url;
    }
}

function controlDePantalla() {
    if (confirm("¿Quiere salir?")) {
        var archivo3 = "index.htm";
        window.location.href = archivo3;
    }
    stopTimer();
}

function salirx1() {
    //      alert("Sale de pantalla");
    var archivo3 = "index.htm";
    window.location.href = archivo3;
}

function startTimeOut() {
    timeOutId = window.setTimeout(controlDePantalla, sinActividad);
    window.addEventListener('mousemove', stopTimer);
    window.addEventListener('click', stopTimer);
    window.addEventListener('input', stopTimer);
}

function stopTimer() {
    window.clearTimeout(timeOutId);
    //      window.setInterval(startTimeOut, intervalo);
}


function buscaExamenes(clave) {
    //      alert("Busca empresa");
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/buscaExamenes.php";
    var archivo2 = archivo1 + "?clave=" + clave;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //                alert("cadena: " + cadena);
            //document.getElementById("empresa").innerHTML = cadena;
            var evaluaciones = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < evaluaciones.length; i++) {
                var campo = evaluaciones[i];
                if (campo) {
                    var evalua = [];
                    evaluaciones[i2] = campo.trim();
                    evaluaciones[i2] = evaluaciones[i2].replace(/\"/g, "");
                    evalua = evaluaciones[i2].split("|");
                    titulos[i2] = evalua[0];
                    imagen[i2] = evalua[1];
                    estatus[i2] = evalua[2];
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();  
}

function buscaCandidato(clave) {
    //    alert("Busca Candidato");
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/consultaCandidato2.php";
    var archivo2 = archivo1 + "?candidato=" + clave;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            //          alert("Cadena: " + cadena);

            if (cadena == "No existe el Candidato") {
                //                document.getElementById("mensaje_gral").innerHTML = cadena;
                alert(cadena);
                return;
            }

            var ids = cadena.split("|");
            for (var i1 = 0; i1 < ids.length; i1++) {
                if (ids[i1] == null) {
                    ids[i1] = "";
                }
                var campo = ids[i1];
                if (campo != null && campo != "") {
                    ids[i1] = ids[i1].replace(/\"/g, "");
                    ids[i1] = ids[i1].trim();
                    //                    alert("campo: (" + i1 + ") - (" + ids[i1] + ")");
                }
            }

            document.getElementById("nombre").value = ids[1];
            document.getElementById("vacante").value = ids[0];
        }
    };
    xhttp.send();
    //    xhttp.disabled();  
}