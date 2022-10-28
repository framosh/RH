window.onload = function () {
    //    alert("Carga página de vacantes");
    elige_servidor();
    leeVacantes();
};

var vacantesx1;

function leeVacantes() {
    //    alert("Lee vacantes");

    var archivo1 = servidor + "httpdocs/vacantes_activas.php";
    var archivo2 = archivo1;
    var xhttp;

    //    alert(archivo2);

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", archivo2, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        //  alert("paso 1.7");
        if (this.readyState == 4 && this.status == 200) {
            //            alert("paso 1.8");
            var cadena = xhttp.responseText;
            //            alert(cadena);
            if (cadena == "No hay Vacantes") {
                alert("No hay Vacantes");
                return;
            }
            vacantesx1 = JSON.parse(this.response);

            //$query="SELECT Vacantes.clv_vacante, Puestos.puesto_desc, Vacantes.Nivel,Vacantes.Funciones,
            //Vacantes.Requisitos, Vacantes.vac_sdo1, Vacantes.vac_sdo2,Vacantes.horario, Vacantes.Lugar,
            //Vacantes.Observaciones FROM Vacantes 

            //            alert("Despliega datos 15");

            new gridjs.Grid({
                columns: [{
                    name: 'CLAVE',
                    width: '6%'
                }, {
                    name: 'VACANTE',
                    width: '10%'
                }, {
                    name: 'NIVEL',
                    width: '6%'
                }, {
                    name: 'FUNCIONES',
                    width: '20%'
                }, {
                    name: 'REQUISITOS',
                    width: '17%'
                }, {
                    name: 'SUELDO',
                    width: '6%'
                }, {
                    name: 'HORARIO',
                    width: '10%'
                }, {
                    name: 'LUGAR',
                    width: '10%'
                }, {
                    name: 'NOTAS',
                    width: '15%'
                }],
                search: true,
                sort: false,
                fixedHeader: true,
                height: '400px',
                data: function () {
                    return vacantesx1.map(function (datos) {
                        return [datos.datos1, datos.datos2, datos.datos3, datos.datos4,
                            datos.datos5, datos.datos6, datos.datos8,
                            datos.datos9, datos.datos10
                        ];
                    });
                },
                style: {
                    table: {
                        width: '2000px'
                    },
                    th: {
                        backgroundColor: "#999",
                        color: "#fff",
                        'white-space': 'nowrap'
                    }
                },
                pagination: {
                    limit: 7
                }
            }).render(document.getElementById("tabla"));
        }
    };
}
/*
                style: {
                    table: {
                        'white-space': 'nowrap'
                    },
                    th: {
                        backgroundColor: "#999",
                        color: "#fff",
                        'white-space': 'nowrap'
                    }
                },


                columns: [
                    {
                    name: 'clave',
                    formatter: function (cell) {
                        return html('<b>${cell}</b>');
                    },
                }, {
                    name: 'vacante',
                    formatter: function (cell) {
                        return html('<b>${cell}</b>');
                    },
                }, {
                    name: 'nivel',
                    formatter: function (cell) {
                        return html('<b>${cell}</b>');
                    },
                }, {
                    name: 'funciones',
                    formatter: function (cell) {
                        return html('<b>${cell}</b>');
                    },
                }],

*/
//                columns: ["Clave", "Vacante", "Nivel", "Funciones"],
/*
                columns: [{
                    id: 'clave',
                    name: html('<div>Clave</div>'),
                }, {
                    id: 'vacante',
                    name: html('<div>Vacante</div>'),
                }, {
                    id: 'nivel',
                    name: html('<div>Nivel</div>'),
                }, {
                    id: 'funciones',
                    name: html('<div>Funciones</div>'),
                }],

*/
/*
            new gridjs.Grid({
                search: true,
                sort: true,
                columns: ["Clave", "Vacante", "Nivel", "Funciones", "Requisitos",
                    "Sueldo Ini.", "Sueldo Fin.", "Horario", "Lugar de trabajo", "Observaciones"
                ],
                data: function () {
                    return vacantesx1.map(function (datos) {
                        return [datos.datos1, datos.datos2, datos.datos3, datos.datos4, datos.datos5, datos.datos6, datos.datos7, datos.datos8, datos.datos9, datos.datos10];
                    });
                },
                style: {
                    table: {
                        width: "100%"
                    },
                    th: {
                        backgroundColor: "#999",
                        color: "#fff"
                    }
                },
                pagination: {
                    limit: 7
                }
            }).render(document.getElementById("tabla"));
*/