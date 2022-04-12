/* LANZA REPORTE EN PANTALLA */
function reporteProyecto() {
    window.location.href = "httpdocs/reporte_Proyectos.php";
}

/* LANZA REPORTE EN EXCEL */
function reporteExcelProyecto() {
    window.location.href = "httpdocs/sp_Proyectos.php";
}

/* LIMPIA PANTALLA  */
function limpiaPantalla() {
    //alert("Inicializa pantalla para nuevo proyecto");
    document.getElementById("alta_proy").reset();

    var limpia = "";
    var opcion = 0;

    document.getElementById("contacto").setAttribute('value', limpia);
    document.getElementById("telefono").setAttribute('value', limpia);
    document.getElementById("celular").setAttribute('value', limpia);
    document.getElementById("correo").setAttribute('value', limpia);
    document.getElementById("descripcion").innerHTML = limpia;
    document.getElementById("estatus").selectedIndex = opcion;

    document.getElementById("cliente").innerHTML = "";
    document.getElementById("proyecto").innerHTML = "";
    document.getElementById("servicio").innerHTML = "";
    document.getElementById("altar").innerHTML = "";
    cargaClientes();
    cargaServicios();
}

/* ACTUALIZA DATOS  */
function actualizaProyecto() {
    document.getElementById("altar").innerHTML = "";

    var empresa = document.getElementById("cliente").value;
    var proyecto = document.getElementById("proyecto").value;
    var servicio = document.getElementById("servicio").value;
    var contacto = document.getElementById("contacto").value;
    var telefono = document.getElementById("telefono").value;
    var celular = document.getElementById("celular").value;
    var correo = document.getElementById("correo").value;
    var estatus = document.getElementById("estatus").value;
    var descripcion = document.getElementById("descripcion").value;

    var clave = [];
    var clave2 = [];
    var clave3 = [];

    clave = empresa.split("|");
    clave2 = servicio.split("|");
    clave3 = proyecto.split("|");

    alert("Actualiza Proyecto: (" + clave[1] + ")");

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/act_proy.php";
    var archivo1 = servidor + "httpdocs/act_proy.php";
    var archivo2 = archivo1 + "?empresa=" + clave[0] + "&proyecto=" + clave3[0] + "&servicio=" + clave2[0] + "&contacto=" + contacto + "&telefono=" + telefono + "&celular=" + celular + "&correo=" + correo + "&estatus=" + estatus + "&descripcion=" + descripcion;

    // alert("Datos de actualizacion: ("+archivo2+")");

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("altar").innerHTML = cadena;
        }
    };
}

function altaProyecto() {
    document.getElementById("altar").innerHTML = "";

    var empresa = document.getElementById("cliente").value;
    var servicio = document.getElementById("servicio").value;
    var contacto = document.getElementById("contacto").value;
    var telefono = document.getElementById("telefono").value;
    var celular = document.getElementById("celular").value;
    var correo = document.getElementById("correo").value;
    var estatus = document.getElementById("estatus").value;
    var descripcion = document.getElementById("descripcion").value;

    var clave = [];
    var clave2 = [];
    clave = empresa.split("|");
    clave2 = servicio.split("|");

    //alert("Alta proyecto de empresa: ("+clave[1]+")");

    if (empresa == "Seleccione un Cliente") {
        var aviso = "Por favor seleccione un Cliente";
        document.getElementById("altar").innerHTML = aviso;
        return;
    }

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/reg_proy.php";
    var archivo1 = servidor + "httpdocs/reg_proy.php";
    var archivo2 = archivo1 +
        "?empresa=" + clave[0] +
        "&servicio=" + clave2[0] +
        "&contacto=" + contacto +
        "&telefono=" + telefono +
        "&celular=" + celular +
        "&estatus=" + estatus +
        "&correo=" + correo +
        "&descripcion=" + descripcion;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //     alert("paso 1.8");
            var cadena = xhttp.responseText;
            document.getElementById("altar").innerHTML = cadena;
        } else {
            //        alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

function consultaProyecto() {
    document.getElementById("altar").innerHTML = "";
    var llave1 = document.getElementById("proyecto").value;
    llave2 = llave1.split("-");

    //alert("Entra a Consulta de Proyecto: "+llave2[1]);

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/consultaProyecto.php";
    var archivo1 = servidor + "httpdocs/consultaProyecto.php";
    var archivo2 = archivo1 + "?proyecto=" + llave2[0];

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send(null);

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //      alert("paso 1.8");
            var cadena = xhttp.responseText;

            //       document.getElementById("altar").innerHTML=cadena;

            var ids = cadena.split("|");
            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    ids[i] = ids[i].trim();
                    ids[i] = ids[i].replace(/\"/g, "");
                    //             alert("campo: ("+i+") - ("+ids[i]+")");
                }
            }

            var opcion1 = 0;
            var opcion2 = 0;

            if (ids[2] != "") {
                var cantServicios = servicio2.length;
                cantServicios--;

                for (var i1 = cantServicios; i1 >= 0; i1--) {
                    var campo2 = servicio2[i1];
                    var clave = campo2.split("|");
                    if (campo2 && clave[0] != "0") {
                        opcion1++;
                        if (clave[0] == ids[2]) {
                            opcion2 = opcion1;
                            opcion2--;
                            //                     alert("Servicio: "+servicio2[i1]+"  opcion2:("+opcion2+")  ids[2]:("+ids[2]+")   longitud:"+servicio2.length);
                            break;
                        }
                    }
                }
            } else {
                opcion2 = 0;
            }

            var opcion4 = "0";
            var opcion3 = ids[9]; // Estatus

            switch (opcion3) // Estatus
            {
                case "Prospectar":
                    opcion4 = "0";
                    break;
                case "Proyecto n":
                    opcion4 = "1";
                    break;
                case "Desarrolla":
                    opcion4 = "2";
                    break;
                case "Terminado":
                    opcion4 = "3";
                    break;
                case "Cancelado":
                    opcion4 = "4";
                    break;
                case "Stand by":
                    opcion4 = "5";
                    break;
            }

            document.getElementById("servicio").selectedIndex = opcion2;
            //       document.getElementById("fecha").setAttribute('value',ids[3]);
            document.getElementById("contacto").setAttribute('value', ids[4]);
            document.getElementById("telefono").setAttribute('value', ids[5]);
            document.getElementById("celular").setAttribute('value', ids[6]);
            document.getElementById("correo").setAttribute('value', ids[7]);
            document.getElementById("descripcion").innerHTML = ids[8];
            document.getElementById("estatus").selectedIndex = opcion4;
        } else {
            //   alert("readyState="+xhttp.readyState+"        Status="+xhttp.status);
        }
    };
}

/* CARGA CLIENTES  */
function cargaClientes() {
    document.getElementById("altar").innerHTML = "";
    //alert("Entra a cargaClientes: ");

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
    var archivo2 = servidor + "httpdocs/catalogoClientes.php";

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7 de folios");
        if (this.readyState == 4 && this.status == 200) {
            //   alert("paso 1.8  de folios");
            var cadena = xhttp.responseText;

            //   document.getElementById("altar").textContent="Clientes: ("+cadena+")";

            var ids = cadena.split("\n");
            var i2 = 0;
            var clie = [];

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    clie[i2] = ids[i].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+clie[i2]+")");
                    i2++;
                }
            }

            clie[i2] = "Seleccione un Cliente";
            var select = document.getElementById("cliente");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                option.text = option.value = clie[i1];
                select.add(option);
            }
        }
    };
}

/* CARGA PROYECTOS DEL CLIENTE  */
function cargaProyectos() {
    document.getElementById("altar").innerHTML = "";
    var cliente = document.getElementById("cliente").value;
    var clie1 = [];
    clie1 = cliente.split("|");

    //alert("Entra a carga de proyectos del Cliente: ("+clie1[1]+")");

    //    var archivo1 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoProyecto.php";
    var archivo1 = servidor + "httpdocs/catalogoProyecto.php";
    var archivo2 = archivo1 + "?cliente=" + clie1[0];

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //    alert("paso 1.8");
            var cadena = xhttp.responseText;

            //    document.getElementById("altar").textContent="("+cadena+")    longitud: ("+cadena.length+")";
            //    alert("press enter");

            if (cadena.length > 1) {
                var proy1 = cadena.split("\n");
                var i2 = 1;
                var proy2 = [];
                var proy3 = [];
                var proy4 = "";

                for (var i = 0; i < proy1.length; i++) {
                    var campo = proy1[i];
                    if (campo) {
                        proy2[i2] = campo.replace(/\"/g, "");
                        proy2[i2] = proy2[i2].trim();
                        //               alert("Proyecto: ("+i2+") - ("+proy2[i2]+")");
                        i2++;
                    }
                }

                proy2[i2] = "0|0|Seleccione un proyecto";
                var select = document.getElementById("proyecto");

                for (var i1 = i2; i1 >= 1; i1--) {
                    var option = document.createElement('option');
                    proy3 = proy2[i1].split("|");
                    proy4 = proy3[0] + " - " + proy3[2];
                    option.text = option.value = proy4;
                    select.add(option);
                }
            } else {
                document.getElementById("altar").innerHTML = "El Cliente no tiene proyectos";
            }
        }
    };
}

var servicio2 = [];

function cargaServicios() {
    document.getElementById("altar").innerHTML = "";
    //alert("Entra a carga Servicios: ");

    //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoServicios.php";
    var archivo2 = servidor + "httpdocs/catalogoServicios.php";

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7 de folios");
        if (this.readyState == 4 && this.status == 200) {
            //    alert("paso 1.8  de folios");
            var cadena = xhttp.responseText;

            //   document.getElementById("altar").textContent="Servicios: ("+cadena+")";

            var ids = cadena.split("\n");
            var i2 = 0;
            var clie = [];

            for (var i = 0; i < ids.length; i++) {
                var campo = ids[i];
                if (campo) {
                    servicio2[i2] = ids[i].replace(/\"/g, "");
                    //           alert("campo: ("+i2+") - ("+servicio2[i2]+")");
                    i2++;
                }
            }

            servicio2[i2] = "Seleccione un servicio";

            var select = document.getElementById("servicio");

            for (var i1 = i2; i1 >= 0; i1--) {
                var option = document.createElement('option');
                option.text = option.value = servicio2[i1];
                select.add(option);
            }
        }
    };
}