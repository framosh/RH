var estados2 = [];

function leeEstados() {
    //    alert("Lee Estados ");

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/consultaEstados.php";
    var archivo2 = servidor + "httpdocs/consultaEstados.php";
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;

            var estados = cadena.split("\n");
            var i2 = 1;

            for (var i = 0; i < estados.length; i++) {
                var campo = estados[i];
                if (campo) {
                    estados2[i2] = campo.replace(/\"/g, "");
                    estados2[i2] = estados2[i2].trim();
                    //           alert("campo: ("+i2+") - ("+estado2[i2]+")");
                    i2++;
                }
            }
            i2--;

            estados2[i2] = "0|Seleccione un Estado";

            var select = document.getElementById("estados");

            for (var i1 = i2; i1 >= 1; i1--) {
                var option = document.createElement('option');
                var nombre = estados2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    xhttp.send(null);
}