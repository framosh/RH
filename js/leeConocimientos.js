// Catalogo de conocimientos
var conocimientos2 = [];

function leeConocimientos(vacante_clv) {
    //    alert("Lee Conocimientos de la vacante: " + vacante_clv);
    //    limpiaTabla();
    //    limpiaPantalla_Con();
    var archivo1 = servidor + "httpdocs/catalogoConocimientos.php";
    var archivo2 = archivo1 + "?Vacante=" + vacante_clv;
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
            //            alert("Cadena del catalogo de conocimientos: " + cadena);
            var conocimientos = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < conocimientos.length; i++) {
                var campo = conocimientos[i];
                if (campo != null && campo != "") {
                    conocimientos2[i2] = campo.trim();
                    conocimientos2[i2] = conocimientos2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            conocimientos2[i2] = "0|Seleccione el Conocimiento";
            var select = document.getElementById("conocimientos");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = conocimientos2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        } else {
            //            alert("Estado: " + xhttp.readyState + "  Status: " + xhttp.status);
        }
    };
    xhttp.send();
}