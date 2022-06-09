var dato4 = [];
var bandera = 1;
var bandera2 = 0;
var bandera3 = 0;
var permiso_Aplicacion;
var timeOutId;
var intervalo = 300000;
var sinActividad = 300000;

window.onload = function () {
      //alert("Entra a carga de pagina");
      window.setInterval(startTimeOut, intervalo);

      elige_servidor();
      //alert("Servidor: "+servidor);

      var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {},
            tmp;
      var l = params.length;
      var url2 = document.location.href;
      //alert("Url2: "+url2);

      /*
dato4[0]  //  User
dato4[1]   //  Nombre
dato4[2]   //  Nivel A-B_C
dato4[3]   //  Puesto
*/

      for (var i = 0; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1].replace(/%20/g, " ");
            dato4[i] = data[tmp[0]];
            dato4[i] = dato4[i].trim();
            //            alert("data: (" + data[tmp[0]] + ")  tmp:(" + tmp[0] + ")");
            //            alert("Dato4: " + i + "  contiene: " + dato4[i]);
      }

      document.getElementById("usuario1").innerHTML = dato4[1];

      var direccion2 = url2.split("?")[0].split("/");
      direccion2[3] = direccion2[3].trim();
      var mensa = direccion2[3];

      var pagina = "";
      var puesto33 = 0;

      if (servidor == "/arhsi_local/") {
            pagina = direccion2[4];
      } else {
            pagina = direccion2[3];
      }

      //      alert("Checa permisos del puesto: " + dato4[3]);

      puesto33 = dato4[3];
      leeApliAsignadas(puesto33);

      //    alert("Pagina: " + pagina);

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
            document.getElementById("usuarios").textContent = leeUsuarios(); // Carga el catalogo de personal
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

      if (pagina == "evaluacion.htm") {
            //            limpiaPantalla_eval();
            var valorx21 = 0;
            document.getElementById("evaluaciones").textContent = leeEvaluaciones(); // Carga el catalogo de Conocimientos
            document.getElementById("conocimientos").textContent = leeConocimientos(valorx21); // Carga el catalogo de Conocimientos
            document.getElementById("puestos").textContent = leePuestos(); // Carga el catalogo de Puestos
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
      window.addEventListener('keydown', function (e) {
            if (!e.ctrlKey) {
                  salirx1();
            }

            if (e.ctrlKey && e.key == 'r') { // Ctrl R
                  return;
            } else {
                  salirx1();
            }
      });
      //      window.addEventListener('click', salirx1);
}

function salirx1() {
      alert("Sale de pantalla");
      var archivo3 = "index.htm";
      window.location.href = archivo3;
}

function startTimeOut() {
      timeOutId = window.setTimeout(controlDePantalla, sinActividad);
      window.addEventListener('mousemove', stopTimer);
      //      window.addEventListener('click', stopTimer);
      //    window.addEventListener('input', stopTimer);
}

function stopTimer() {
      window.clearTimeout(timeOutId);
}