/*
window.onload = function () {
    //    limpiaPantalla_emp();
    elige_servidor();
    document.getElementById("estados").textContent = leeEstados(); // Carga el catalogo de Estados
    document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de Clientes

    alert("Entra a empresa");
};
*/
/* LANZA REPORTE EN PANTALLA */
function reporteEmpresa() {
    window.location.href = "httpdocs/reporte_Empresa.php";
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelEmpresa() {
    window.location.href = "httpdocs/sp_Empresa.php";
}

/* LIMPIA PANTALLA  */
function limpiaPantalla_emp() {
    //alert("Inicializa pantalla para nuevo registro");
    var campo = "";
    var opcion0 = 0;

    document.getElementById("mensaje_gral").value = campo;
    document.getElementById("empresa").value = campo;
    document.getElementById("contacto").value = campo;
    document.getElementById("correo").value = campo;
    document.getElementById("tel1").value = campo;
    document.getElementById("tel2").value = campo;
    document.getElementById("direccion").value = campo;
    document.getElementById("colonia").value = campo;
    document.getElementById("delegacion").value = campo;
    document.getElementById("estatus").selectedIndex = opcion0;
    document.getElementById("estados").selectedIndex = opcion0;
    document.getElementById("observaciones").value = campo;
    document.getElementById("alta").disabled = false;
    document.getElementById("actualiza").disabled = true;
}

/* ACTUALIZA DATOS  */
function actualizaEmpresa() {
    var aviso = "";
    document.getElementById("mensaje_gral").value = aviso;

    var cliente = document.getElementById("empresas").value;
    var contacto = document.getElementById("contacto").value;
    var correo = document.getElementById("correo").value;
    var tel1 = document.getElementById("tel1").value;
    var tel2 = document.getElementById("tel2").value;
    var direccion = document.getElementById("direccion").value;
    var colonia = document.getElementById("colonia").value;
    var delegacion = document.getElementById("delegacion").value;
    var estatus = document.getElementById("estatus").value;
    var estado = document.getElementById("estados").value;
    var observaciones = document.getElementById("observaciones").value;
    observaciones = observaciones.replace(/\n/g, "\\n");

    if (estado == "Seleccione un Estado") {
        aviso = "Por favor seleccione un estado geografico";
        document.getElementById("mensaje_gral").value = aviso;
        return;
    }

    var renglones = estados2.length;
    renglones--;
    var posicion22 = document.getElementById("estados").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = estados2[posicion22].split("|");
    var estado_clv = clavex22[0];


    if (cliente == "Seleccione una Empresa") {
        aviso = "Por favor Seleccione una Empresa";
        document.getElementById("mensaje_gral").value = aviso;
        return;
    }

    renglones = cliente2.length;
    renglones--;
    posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    clavex22 = cliente2[posicion22].split("|");
    var cliente_clv = clavex22[0];

    var campos = [];
    campos[0] = cliente_clv;
    campos[1] = contacto;
    campos[2] = correo;
    campos[3] = tel1;
    campos[4] = tel2;
    campos[5] = direccion;
    campos[6] = colonia;
    campos[7] = delegacion;
    campos[8] = estado_clv;
    campos[9] = estatus;
    campos[10] = observaciones;

    var camposx2 = campos.join("|");

    //    alert("Campos: (" + camposx2 + ")");

    //var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/act_emp.php";
    var archivo1 = servidor + "httpdocs/act_emp.php";
    var archivo2 = archivo1 + "?campos=" + camposx2;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //        alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //          alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("cadena: " + cadena);
            document.getElementById("mensaje_gral").innerHTML = cadena;
            //            document.getElementById("alta").disabled = true;
            //          document.getElementById("actualiza").disabled = false;
        }
    };
}

/* ALTA EMPRESA  */
function altaEmpresa() {
    var vacio = "";
    document.getElementById("mensaje_gral").value = vacio;

    var empresa = document.getElementById("empresa").value;
    var contacto = document.getElementById("contacto").value;
    var correo = document.getElementById("correo").value;
    var tel1 = document.getElementById("tel1").value;
    var tel2 = document.getElementById("tel2").value;
    var direccion = document.getElementById("direccion").value;
    var colonia = document.getElementById("colonia").value;
    var delegacion = document.getElementById("delegacion").value;
    var estatus = document.getElementById("estatus").value;
    var estado = document.getElementById("estados").value;
    var observaciones = document.getElementById("observaciones").value;
    observaciones = observaciones.replace(/\n/g, "\\n");

    //alert("Alta Empresa: ("+empresa+")");

    if (estado == "Seleccione un Estado") {
        var aviso = "Por favor seleccione un estado geografico";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var renglones = estados2.length;
    renglones--;
    var posicion22 = document.getElementById("estados").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = estados2[posicion22].split("|");
    var estado_clv = clavex22[0];

    var campos = [];
    campos[0] = empresa;
    campos[1] = contacto;
    campos[2] = correo;
    campos[3] = tel1;
    campos[4] = tel2;
    campos[5] = direccion;
    campos[6] = colonia;
    campos[7] = delegacion;
    campos[8] = estado_clv;
    campos[9] = estatus;
    campos[10] = observaciones;

    var camposx2 = campos.join("|");

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/reg_emp.php";
    var archivo1 = servidor + "httpdocs/reg_emp.php";
    var archivo2 = archivo1 + "?campos=" + camposx2;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //     alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("mensaje_gral").value = cadena;
            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;
        } else {
            //        alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function consultaEmpresa() {
    limpiaPantalla_emp();
    var cliente = document.getElementById("empresas").value;

    if (cliente == "Seleccione una Empresa") {
        var aviso = "Por favor Seleccione una Empresa";
        document.getElementById("mensaje_gral").innerHTML = aviso;
        return;
    }

    var renglones = cliente2.length;
    renglones--;
    var posicion22 = document.getElementById("empresas").selectedIndex;
    posicion22 = (renglones - posicion22);
    var clavex22 = cliente2[posicion22].split("|");
    var cliente_clv = clavex22[0];

    document.getElementById("empresa").value = cliente_clv;

    //alert("Entra a Consulta de Empresa: "+llave2[1]);

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/consultaEmpresa.php";
    var archivo1 = servidor + "httpdocs/consultaEmpresa.php";
    var archivo2 = archivo1 + "?empresa=" + cliente_clv;
    var xhttp;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert("Cadena: (" + cadena + ")");

            var ids = cadena.split("|");

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].trim();
                    ids[i] = ids[i].replace(/\"/g, "");
                    //                  alert("campo: (" + i + ") - (" + ids[i] + ")");
                } else {
                    ids[i] = " ";
                    //                    alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            var opcion4 = 0;
            var opcion3 = "";
            var opcion2 = "0";
            var opcion1 = ids[9].replace(/\s/g, ""); // Estatus

            switch (opcion1) // Estatus
            {
                case "Prospecto":
                    opcion3 = "0";
                    break;
                case "Cliente":
                    opcion3 = "1";
                    break;
                case "Inactivo":
                    opcion3 = "2";
                    break;
                case "Perdido":
                    opcion3 = "3";
                    break;
                default:
                    opcion3 = "0";
            }

            //            alert("Estatus: " + opcion3);

            var estado = 0;
            var cantEstados = 0;

            if ((ids[7] != "") && (ids[7] != "0") && (ids[7] != null) && (ids[7] != " ")) {
                cantEstados = estados2.length;
                cantEstados--;

                for (var i1 = cantEstados; i1 >= 0; i1--) {
                    var campo2 = estados2[i1];
                    var clave = campo2.split("|");
                    if (campo2) {
                        opcion4++;
                        if (clave[0] == ids[7]) {
                            estado = opcion4;
                            //                            estado--;
                            //                     alert("Estado: "+estado2[i1]+"  opcion5:("+opcion5+")  ids[7]:("+ids[7]+")   longitud:"+estado2.length);
                            break;
                        }
                    }
                }
            }

            document.getElementById("contacto").value = ids[10];
            document.getElementById("correo").value = ids[11];
            document.getElementById("tel1").value = ids[2];
            document.getElementById("tel2").value = ids[3];
            document.getElementById("direccion").value = ids[4];
            document.getElementById("colonia").value = ids[5];
            document.getElementById("delegacion").value = ids[6];
            document.getElementById("estatus").selectedIndex = opcion3;
            document.getElementById("estados").selectedIndex = estado;
            document.getElementById("observaciones").value = ids[8];
            document.getElementById("alta").disabled = true;
            document.getElementById("actualiza").disabled = false;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}