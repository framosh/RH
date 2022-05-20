var puestos2 = [];

function leePuestos() {
    //    alert("Lee Conocimientos de la vacante: " + vacante_clv);
    //    limpiaTabla();
    //    limpiaPantalla_Con();
    var archivo2 = servidor + "httpdocs/catalogoPuestos.php";
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

            conocimientos2[i2] = "0|Seleccione el Puesto";
            var select = document.getElementById("puestos");

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