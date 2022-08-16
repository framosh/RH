var dato = [];

window.onload = function () {
    //alert("Entra a funcion");
    elige_servidor();
    alert("Servidor: " + servidor);

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {},
        tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1].replace(/%20/g, " ");
        dato[i] = data[tmp[0]];
        alert("data:(" + data[tmp[0]] + ")  tmp:(" + tmp[0] + ")");
    }

    var mensaje = "";
    document.getElementById("mensajes").value = mensaje;
    //    document.getElementById("usuario1").value = data.nombre;
    document.getElementById("usuario1").value = data[0];

    var url2 = document.location.href;
    var direccion2 = url2.split("?")[0].split("/");

    alert("Pagina: " + direccion2[3]);

    /*
    dato[0] = "6502";
    dato[1] = "A";
    dato[2] = "Federico Ramos";
    alert(direccion2[3]);
    */

    if (direccion2[3] == "areas.htm") {
        document.getElementById("areas").textContent = leeAreas(); // Carga el catalogo de Areas
    }

    if (direccion2[3] == "cap-vac.htm") {
        document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de Clientes
        document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
    }

    if (direccion2[3] == "cap_empresa.htm") {
        document.getElementById("estado").textContent = leeEstados(); // Carga el catalogo de Estados
        document.getElementById("cliente").textContent = cargaClientes(); // Carga el catalogo de Clientes
    }

    if (direccion2[3] == "puestos.htm") {
        document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
    }

    if (direccion2[3] == "cat_conocimiento.htm") {
        document.getElementById("conocimientos").textContent = leeConocimientos(); // Carga el catalogo de Conocimientos
    }

    if (direccion2[3] == "cono_requerido.htm") {
        document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de Clientes
    }

    if (direccion2[3] == "cono_candidato.htm") {
        document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
    }

    if (direccion2[3] == "cap-candidato.htm") {
        document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
        document.getElementById("estado").textContent = leeEstados2(); // Carga el catalogo de Estados
        //        document.getElementById("conocimientos").textContent = leeConocimientos(); // Carga el catalogo de Conocimientos
    }

    if (direccion2[3] == "cand_x_vacante.htm") {
        document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
        document.getElementById("candidatos").textContent = leeCandidatos2(); // Carga el catalogo de Estados
    }

    if (direccion2[3] == "tipo_educa.htm") {
        document.getElementById("tipos_edu").textContent = leeTipoEdu(); // Carga el catalogo de Clientes
    }


    //document.getElementById("userclv").innerHTML=data.user;
    //alert("nombre: ("+data.nombre+")  User:("+data.user+")  Nivel:("+data.nivel+")");
    //window.location.href = "estados.php";   // Verifica el catálogo de los Estados geográficos
};

/* GARCA PANTALLA PRINCIPAL  */
function cargaInicio() {
    //alert("Entra a cargaInicio  nivel:("+dato[1]+")");
    //alert("nombre: ("+dato[2]+")  User:("+dato[0]+")  Nivel:("+dato[1]+")");

    switch (dato[1]) // Estatus
    {
        case "A":
            window.location.href = "index.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
            break;
        case "B":
            //                       window.location.href = "inicio2.htm"+"?user="+dato[0]+"&nivel="+dato[1]+"&nombre="+dato[2];
            break;
        default:
            alert("No hay nivel signado");
    }
}

function candidatoXvacante() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cand_x_vacante.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function preguntaXCOMP() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "preg_xcom.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function preguntaOM() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "preg_om.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function pregunta_xom_xeval() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "preg_omxev.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function pregunta_xcom_xeval() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "preg_x_eval.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function Evaluacion() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "evaluacion.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function respuestaOM() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "resp_xom.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function respuestaXCOMP() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "resp_xcom.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function evaluacionCandidato() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "eval_x_candidato.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function catalogoPuestos() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "puestos.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function catalogoConocimientos() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cat_conocimiento.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function conocimientoRequerido() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cono_requerido.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function conocimientoCandidato() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cono_candidato.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function educacionCandidato() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "edu_candidato.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function tipoEducacion() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "tipo_educa.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function capturaVacante() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cap-vac.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function capturaEmpresa() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cap_empresa.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function capturaProyecto() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cap_proy.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}


function capturaRequerimiento() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cap-req.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function capturaCandidato() {
    alert("Lanza Captura de Candidatos");
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cap-candidato.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}

function capturaUsuario() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "cap-usuario.htm" + "?user=" + dato[0] + "&nivel=" + dato[1] + "&nombre=" + dato[2];
}


function reporteContactos() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "httpdocs/reporte_de_contactos.php";
}

function reporteVacantes() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "httpdocs/reporte_de_vacantes.php";
}

function reporteCandidatos() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "httpdocs/reporte_de_candidatos.php";
}

function reporteRequerimientos() {
    if (dato[1] != "A") {
        var mensaje = "No tiene permisos para entrar a esta opcion";
        document.getElementById("mensajes").value = mensaje;
        return;
    }
    window.location.href = "httpdocs/reporte_de_requerimientos.php";
}