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

    /*
    //    var today = new Date();
    var today = new Date().toLocaleDateString();
    var tiempo = new Date().toLocaleTimeString();
    var fecha = today;
    var hora = tiempo;
    alert("Fecha: " + fecha);
    alert("Hora: " + hora);

    document.getElementById(fecha).innerHTML = fecha;
    document.getElementById(hora).innerHTML = hora;
*/
    candidatox1 = dato6[0];
    despliega(candidatox1);
};

function getData() {
    return new Promise((resolve, reject) => {
        if (examen.length == 0) {
            reject(new Error('No hay examenes asignados'));
            //            return;
        }
        setTimeout(() => {
            resolve(despliega_menu(candidatox1));
        }, 2000);
    });
}

async function despliega(candidatox1) {
    buscaCandidato(candidatox1);
    buscaExamenes(candidatox1);
    await getData();
}

/*
getData()
.then((response) => console.log(response))
.catch((err) => console.log(err.message))
*/


var examen = [];
var estatus = [];

function despliega_menu(candidatox1) {
    //    alert("Entra despliega menu del candidato: " + candidatox1);
    var titulos = ["", "JavaScript", "HTML", "Java", "Android", "C#", "SQL"];
    var imagen = ["", "js.png", "html.png", "java.png", "android.png", "C sharp.png", "sql.png"];
    var estatus2 = ["", "pendiente", "aplicado"];
    var i = 0;
    var evaluaciones = examen.length;
    //    alert("examen: " + examen);
    //  alert("examen length: " + evaluaciones);
    if (evaluaciones == 0) {
        alert("No hay evaluaciones por aplicar");
        return;
    }
    var examenx1 = 0;
    var estatusx1 = 0;
    for (i = 0; i < evaluaciones; i++) {
        examenx1 = examen[i];
        estatusx1 = estatus[i];
        var titulox = "evalua" + (i + 1);
        var estatusx = "estatus" + (i + 1);
        var tecnologia = "tecnologia" + (i + 1);
        var logo_url = "../img/" + imagen[examenx1];
        document.getElementById(titulox).innerHTML = titulos[examenx1];
        document.getElementById(estatusx).innerHTML = estatus2[estatusx1];
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


function buscaExamenes(candidatox1) {
    //    alert("Busca examenes del candidato: " + candidatox1);
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/buscaExamenes.php";
    var archivo2 = archivo1 + "?candidato=" + candidatox1;
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
            var mensaje = cadena.split("|");
            if (mensaje[0] == "No hay evaluaciones") {
                document.getElementById("mensaje_gral").innerHTML = cadena;
                return;
            }
            //            alert("cadena de examenes: " + cadena);
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
                    examen[i2] = evalua[0];
                    //                    imagen[i2] = evalua[1];
                    estatus[i2] = evalua[1];
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();  
}

function buscaCandidato(candidatox1) {
    //    alert("Busca al candidato: " + candidatox1);
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/consultaCandidato2.php";
    var archivo2 = archivo1 + "?candidato=" + candidatox1;
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
            var today = new Date().toLocaleDateString();
            var tiempo = new Date().toLocaleTimeString();
            var fecha = today;
            var hora = tiempo;
            //            alert("Fecha: " + fecha);
            //          alert("Hora: " + hora);

            document.getElementById("fecha").value = fecha;
            document.getElementById("hora").value = hora;
            document.getElementById("nombre").value = ids[1];
            document.getElementById("vacante").value = ids[0];
        }
    };
    xhttp.send();
    //    xhttp.disabled();  
}