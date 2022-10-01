var candidatos2 = [];

function leeCandidatos(vacante_clv) {
    //    alert("Entra a candidatos de la vacante: " + vacante_clv);
    //    var limpia = "";
    //  document.getElementById("candidatos").innerHTML = limpia;

    var archivo1 = servidor + "httpdocs/catalogoCandidatos.php";
    var archivo2 = archivo1 + "?vacante=" + vacante_clv;
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
            //            alert("cadena: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "   longitud: (" + cadena.length + ")";

            var candidatos = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < candidatos.length; i++) {
                var campo = candidatos[i];
                if (campo) {
                    candidatos2[i2] = campo.trim();
                    candidatos2[i2] = candidatos2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + puestos2[i2] + ")");
                    i2++;
                }
            }

            candidatos2[i2] = "0|Seleccione el Candidato";
            var select = document.getElementById("candidatos");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = candidatos2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}