var cliente2 = [];

function leeClientes() {
    //  alert("Entra a leeClientes ");
    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo2 = servidor + "httpdocs/catalogoClientes.php";
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
            //            alert("Clientes: " + cadena);
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "  longitud: (" + cadena.length + ")";

            var clientes = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < clientes.length; i++) {
                var campo = clientes[i];
                if (campo) {
                    cliente2[i2] = campo.trim();
                    cliente2[i2] = cliente2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }

            cliente2[i2] = "0|Seleccione una Empresa";
            var select = document.getElementById("empresas");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = cliente2[i1].split("|");
                option.text = option.value = nombre[1];
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}