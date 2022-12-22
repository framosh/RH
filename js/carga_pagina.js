var dato4 = [];
var bandera = 1;
var bandera2 = 0;
var bandera3 = 0;
var permiso_Aplicacion;
var timeOutId;
var intervalo = 300000;
var sinActividad = 300000;
var clave_empresa;

window.onload = function () {
      //      alert("Entra a carga de pagina");
      window.setInterval(startTimeOut, intervalo);

      elige_servidor();
      //alert("Servidor: "+servidor);

      var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {},
            tmp;
      var l = params.length;

      //      alert("l: " + l);

      if (l < 6) {
            window.location.href = "index.htm";
      }

      var url2 = document.location.href;

      /*
            dato4[0]  //  User
            dato4[1]   //  Nombre
            dato4[2]   //  Nivel A-B_C
            dato4[3]   //  Puesto
            dato4[4]   // permisos
            dato4[5]   //  Empresa 
*/

      for (var i = 0; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1].replace(/%20/g, " ");
            dato4[i] = data[tmp[0]];
            dato4[i] = dato4[i].trim();
            //        alert("Dato4: " + i + "  contiene: " + dato4[i]);
      }

      var direccion2 = url2.split("?")[0].split("/");
      direccion2[3] = direccion2[3].trim();
      var mensa = direccion2[3];

      var pagina = "";

      if (servidor == "/arhsi_local/") {
            pagina = direccion2[4];
      } else {
            pagina = direccion2[3];
      }

      clave_empresa = dato4[5];
      //      alert("Empresa: (" + clave_empresa + ")");
      //      alert("Pagina: " + pagina);

      document.getElementById("usuario1").innerHTML = dato4[1];
      buscaEmpresa(clave_empresa); // Busca el nombre de la empresa a donde pertenece el usuario

      if (pagina == "areas.htm") {
            document.getElementById("areas").textContent = leeAreas(); // Carga el catalogo de Areas
      }

      if (pagina == "aplicaciones.htm") {
            document.getElementById("aplicaciones").textContent = leeAplicaciones(); // Carga el catalogo de Aplicaciones
      }

      if (pagina == "permisos.htm") {
            //            alert("Entra a permisos");
            document.getElementById("aplicaciones").textContent = leeAplicaciones(); // Carga el catalogo de Aplicaciones
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
      }

      if (pagina == "area.htm") {
            document.getElementById("areas").textContent = leeAreas(); // Carga el catalogo de Areas
      }

      if (pagina == "puestos.htm") {
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
      }

      if (pagina == "personal.htm") {
            document.getElementById("personal1").textContent = leePersonal(); // Carga el catalogo de Personal
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
            document.getElementById("areas").textContent = leeAreas(); // Carga el catalogo de Areas
            document.getElementById("areas").textContent = leeEmpresas(); // Carga el catalogo de Empresas
      }

      if (pagina == "clientes.htm") {
            //alert("Carga catalogos de cliente y estados");
            document.getElementById("cliente").textContent = leeClientes(); // Carga el catalogo de clientes
            document.getElementById("estado").textContent = leeEstados(); // Carga el catalogo de los estados
      }

      if (pagina == "cap-usuario.htm") {
            //alert("Carga catalogo de usuarios");
            document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de personal
            //document.getElementById("usuarios").textContent = leeUsuarios(); // Carga el catalogo de personal
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
      }

      if (pagina == "cap-vac.htm") {
            document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de Clientes
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
      }

      if (pagina == "cap_empresa.htm") {
            document.getElementById("estados").textContent = leeEstados(); // Carga el catalogo de Estados
            document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de Clientes
            limpiaPantalla_emp();
      }

      if (pagina == "puestos-users.htm") {
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
            document.getElementById("areas").textContent = leeAreas(); // Carga el catalogo de Puestos
      }

      if (direccion2[3] == "tipo_educa.htm") {
            document.getElementById("tipos_edu").textContent = leeTipoEdu(); // Carga el catalogo de Clientes
      }

      if (pagina == "evaluacion.htm") {
            //            limpiaPantalla_eval();
            var valorx21 = 0;
            document.getElementById("evaluaciones").textContent = leeEvaluaciones(); // Carga el catalogo de Conocimientos
            document.getElementById("conocimientos").textContent = leeConocimientos(valorx21); // Carga el catalogo de Conocimientos
      }

      if (pagina == "eval_x_puesto.htm") {
            limpiaPantalla_eval();
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
            document.getElementById("evaluaciones").textContent = leeEvaluaciones(); // Carga el catalogo de Conocimientos
      }

      if (pagina == "eval_x_candidato.htm") {
            //            limpiaPantalla_eval();
            document.getElementById("vacantes").textContent = leeVacantes(clave_empresa); // Carga el catalogo de Vacantes
      }

      if (pagina == "preg_x_eval.htm") {
            //            limpiaPantalla_eval();
            document.getElementById("evaluaciones").textContent = leeEvaluaciones(); // Carga el catalogo de Conocimientos
      }

      if (pagina == "preg_om.htm") {
            //            limpiaPantalla_eval();
            var valorx22 = 0;
            document.getElementById("conocimientos").textContent = leeConocimientos(valorx22); // Carga el catalogo de Conocimientos
      }

      if (pagina == "resp_xom.htm") {
            // Calificacion de respuestas de opcion multiple
            nueva_vacante();
            document.getElementById("vacantes").textContent = leeVacantes(clave_empresa); // Carga el catalogo de Vacantes
      }

      if (pagina == "resp_xcom.htm") {
            // Calificacion de respuestas de opcion multiple
            nueva_vacante();
            document.getElementById("vacantes").textContent = leeVacantes(clave_empresa); // Carga el catalogo de Vacantes
      }

      if (pagina == "preg_xcom.htm") {
            limpiaPantalla_preg();
            //            alert("Carga Preguntas por Complemento");
            var valorx23 = 0;
            document.getElementById("conocimientos").textContent = leeConocimientos(valorx23); // Carga el catalogo de Conocimientos
      }


      if (pagina == "cat_conocimiento.htm") {
            document.getElementById("conocimientos").textContent = leeConocimientos(); // Carga el catalogo de Conocimientos
      }

      if (pagina == "cono_requerido.htm") {
            document.getElementById("empresas").textContent = leeClientes(); // Carga el catalogo de Clientes
      }

      if (pagina == "cono_candidato.htm") {
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
      }

      if (pagina == "experiencia_p.htm") {
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
      }

      if (pagina == "cap-candidato-a.htm") {
            //            alert("Entra a cap-candidato");
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
            document.getElementById("estado").textContent = leeEstados2(); // Carga el catalogo de Estados
            //        document.getElementById("conocimientos").textContent = leeConocimientos(); // Carga el catalogo de Conocimientos
      }

      if (pagina == "consulta_candidatos.htm") {
            //alert("Entra a consulta_candidatos");
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
      }

      if (pagina == "edu_x_cand_p.htm") {
            //            alert("Entra a edu_x_cand_p");
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
      }

      if (pagina == "rep_candidatos.htm") {
            //            alert("Entra a cap-candidato");
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
      }

      if (pagina == "rep_vacantes.htm") {
            //            alert("Entra a rep_vacantes");
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
      }

      if (pagina == "cand_x_vacante.htm") {
            document.getElementById("empresas").textContent = leeClientes2(); // Carga el catalogo de Clientes
            document.getElementById("candidatos").textContent = leeCandidatos2(); // Carga el catalogo de Estados
      }
};

function controlDePantalla() {
      if (confirm("¿Quiere salir?")) {
            var archivo3 = "index.htm";
            window.location.href = archivo3;
      }
      stopTimer();
}

function salirx1() {
      //      alert("Sale de pantalla");
      var archivo3 = "index.htm";
      window.location.href = archivo3;
}

function startTimeOut() {
      timeOutId = window.setTimeout(controlDePantalla, sinActividad);
      window.addEventListener('mousemove', stopTimer);
      window.addEventListener('click', stopTimer);
      window.addEventListener('input', stopTimer);
}

function stopTimer() {
      window.clearTimeout(timeOutId);
      //      window.setInterval(startTimeOut, intervalo);
}

function buscaEmpresa(clave) {
      //      alert("Busca empresa");
      //    var archivo2 = "https://admonarh.arhsi.com.mx/httpdocs/catalogoClientes.php";
      var archivo1 = servidor + "httpdocs/buscaEmpresa.php";
      var archivo2 = archivo1 + "?clave=" + clave;
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
                  //                alert("cadena: " + cadena);
                  document.getElementById("mensajes").innerHTML = cadena;
            }
      };
      xhttp.send();
      //    xhttp.disabled();  
}