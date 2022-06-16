var vacantes2 = [];

function leeVacantes(cliente_clv) {
    //    alert("lee vacantes del cliente: " + cliente_clv);
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;

    var estatus = 1;
    if (cliente_clv == 0 || cliente_clv == null || cliente_clv == "") {
        cliente_clv = clave_empresa;
    }

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo1 = servidor + "httpdocs/catalogoVacantes.php";
    var archivo2 = archivo1 + "?Empresa=" + cliente_clv + "&estatus=" + estatus;
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
            //            document.getElementById("mensaje_gral").textContent = "(" + cadena + ")" + "        longitud: (" + cadena.length + ")";

            var clientes = cadena.split("\n");
            var i2 = 0;

            for (var i = 0; i < clientes.length; i++) {
                var campo = clientes[i];
                if (campo) {
                    vacantes2[i2] = campo.trim();
                    vacantes2[i2] = vacantes2[i2].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+cliente2[i2]+")");
                    i2++;
                }
            }

            vacantes2[i2] = "0|Seleccione una Vacante";
            var select = document.getElementById("vacantes");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                var nombre = vacantes2[i1].split("|");
                var vac1 = nombre[0] + "-" + nombre[1];
                option.text = option.value = vac1;
                select.add(option);
            }
        }
    };
    xhttp.send();
    //    xhttp.disabled();
}