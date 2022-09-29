function despliegaEvalXcand(candidato_clv) {
    //    alert("Despliega evaluaciones por candidato: " + candidato_clv);

    var archivo1 = servidor + "httpdocs/evalXcandidato.php";
    var archivo2 = archivo1 + "?candidato=" + candidato_clv;
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
            //                        alert("Cadena de evaluaciones: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";
            if (cadena == "No hay Evaluaciones") { //No hay Evaluaciones
                document.getElementById("mensaje_gral").value = cadena;
                return;
            }
            //$query="SELECT Evaluaciones.clv_tipo_eval, Evaluaciones.nombre_eval, Evaluaciones.nivel_cono, 
            //conocimientos.cono_desc FROM eval_XPuesto 

            var subtitulo = ["CLAVE", "NOMBRE", "ESTATUS", "AREA DE CONOCIMIENTO"];

            var aplicacion = cadena.split("\n");
            preguntas = aplicacion;
            var tablax1 = "tablax21";
            var cuerpox1 = "cuerpox21";
            var apli4 = 0;
            apli4 = aplicacion.length;
            apli4--;
            quickReport(aplicacion, tablax1, cuerpox1, subtitulo);

            renglones2 = apli4;
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}