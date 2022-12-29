var vacantes2 = [];

function leeVacantes2(cliente_clv, vacante_clv) {
    if (cliente_clv == 0 || cliente_clv == null || cliente_clv == "") {
        alert("No hay cliente asignado");
    }

    //    alert("lee vacantes del cliente: " + cliente_clv);
    var limpia = "";
    document.getElementById("vacantes").innerHTML = limpia;

    var archivo1 = servidor + "httpdocs/catalogoVacantes3.php";
    var archivo2 = archivo1 + "?Empresa=" + cliente_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = xhttp.responseText;
            var vacantes = cadena.split("\n");
            //            alert("Vacantes: " + vacantes);
            var i2 = 0;

            for (var i = 0; i < vacantes.length; i++) {
                var campo = vacantes[i];
                if (campo[0] != "" && campo[0] != null) {
                    vacantes2[i2] = campo.trim();
                    vacantes2[i2] = vacantes2[i2].replace(/\"/g, "");
                    //                    alert("campo: (" + i2 + ") - (" + vacantes2[i2] + ")");
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
            //            alert("Vacantes leidas y cargadas");
            posiciona_apuntador(vacante_clv);
        }
    };
    //    xhttp.disabled();
}

var vacante;

function posiciona_apuntador(vacante_clv) {
    var cantVacantes = vacantes2.length;
    cantVacantes--;

    //  alert("Cantidad de vacantes: " + cantVacantes);
    //alert("Vacante: " + vacante_clv);
    //alert("Vacantes2: " + vacantes2);

    if (cantVacantes > 0) {
        //        alert("Busca posicion de la vacante");
        var opcion6 = 0;

        if (vacante_clv != "" && vacante_clv != "0") {
            for (var i1 = cantVacantes; i1 >= 0; i1--) {
                var campo4 = vacantes2[i1].trim();
                //                alert("campo4: " + campo4);
                var clave4 = campo4.split("|");
                if (clave4[0] != "0" && clave4[0] != "") {
                    opcion6++;
                    if (clave4[0] == vacante_clv) {
                        vacante = opcion6;
                        //                      alert("Vacante: " + vacante_clv + "  opcion6:(" + opcion6 + ")");
                        break;
                    }
                }
            }
        } else {
            vacante = 0;
        }
        document.getElementById("vacantes").selectedIndex = vacante;
    }
}