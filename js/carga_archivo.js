//var servidor_local = "/svr_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";

var url;
function carga() {
//    var form = document.querySelector('form');
    var form = document.getElementById("forma_archivo");
    var tipo_dato = document.getElementById("tipo_dato").value;

    if (tipo_dato == "Seleccione un tipo de dato") {
        var aviso = "Por favor seleccione un tipo de dato a cargar";
        alert(aviso);
//        document.getElementById("mensaje_tipo_dato").innerHTML = aviso;
        return;
    }

  //  alert("Tipo de dato a cargar: " + tipo_dato);
    var tipo_carga = sel_carga(tipo_dato);
//    alert("Programa: " + url);

/*
    if (tipo_carga > 1) {
        alert("Carga en desarrollo");
        return;
    }
*/
    form.addEventListener('submit', function (e) {
            e.preventDefault();

        var archivo = document.querySelector("input[type='file']");
//        alert("Archivo: "+archivo);
        var formData = new FormData();
        formData.append('files[]', archivo.files[0]);

        fetch(url, {
            method: 'POST',
            body: formData,
            dataType: 'json'
        })
            .then(function (response) {
                alert("Carga exitosa");
            })
            .catch(function (error) {
                var mensajex11 = error;
                alert(mensajex11);
            });
        });
}

function sel_carga(tipo_dato) {
    var tipo_carga = 0;
    url = servidor;

    switch (tipo_dato) {
        case "Clientes":
            tipo_carga = 1;
//            url = '../httpdocs/carga_clientes.php';
                        url = url+'carga_clientes.php';
            break;
        case "Sucursales":
            tipo_carga = 2;
            //url = '../httpdocs/carga_sucursales.php';
                        url = url+'carga_sucursales.php';
            break;
        case "Contactos":
            tipo_carga = 3;
          //  url = '../httpdocs/carga_contactos.php';
                        url = url+'carga_contactos.php';
            break;
        case "Estados":
            tipo_carga = 4;
        //    url = '../httpdocs/carga_estados.php';
                        url = url+'carga_estados.php';
            break;
        case "Vendedores":
            tipo_carga = 5;
      //      url = '../httpdocs/carga_vendedores.php';
                        url = url+'carga_vendedores.php';
            break;
        case "Rutas":
            tipo_carga = 6;
    //        url = '../httpdocs/carga_rutas.php';
                        url = url+'carga_rutas.php';
            break;
        case "Productos":
            tipo_carga = 7;
  //          url = '../httpdocs/carga_productos.php';
                        url = url+'carga_productos.php';
            break;
        case "Precios":
            tipo_carga = 8;
//            url = '../httpdocs/carga_precios.php';
                        url = url+'carga_precios.php';
            break;
        default:
            tipo_carga = 0;
            url="";
            break;
    }
    return tipo_carga;
}
