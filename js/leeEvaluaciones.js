var evaluaciones2 = [];

function leeEvaluaciones() {
    //    alert("Entra a catalogo de evaluaciones: ");
    //    var limpia = "";
    //    limpiaPantalla_eval();

    var archivo1 = servidor + "httpdocs/catalogoEvaluaciones.php";
    var archivo2 = archivo1;
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
            alert("Cadena de evaluaciones: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var evaluacion = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < evaluacion.length; i++) {
                var campo = evaluacion[i];
                if (campo) {
                    evaluaciones2[i2] = campo.trim();
                    evaluaciones2[i2] = evaluaciones2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            evaluaciones2[i2] = "0|Seleccione la Evaluación";
            var select = document.getElementById("evaluaciones");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = evaluaciones2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}