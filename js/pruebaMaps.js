window.onload = function () {
    initMap();
};

function calculaDistancia() {
    alert("Calcula distancia");
    var punto1 = document.getElementById("nombre1").value;
    var lat1 = document.getElementById("lat1").value;
    var lon1 = document.getElementById("lon1").value;
    var punto2 = document.getElementById("nombre2").value;
    var lat2 = document.getElementById("lat2").value;
    var lon2 = document.getElementById("lon2").value;

    var from = new google.maps.LatLng(46.5610058, 26.9098054);
    var fromName = 'Bacau';
    var dest = new google.maps.LatLng(44.391403, 26.1157184);
    var destName = 'Bucuresti';

    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
        origins: [from, fromName],
        destinations: [destName, dest],
        travelMode: 'DRIVING'
    }, callback);
}

var distance;
var duration;
var from2;
var to;

function callback(response, status) {
    alert("entra al callback");
    if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            console.log(results);
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                distance = element.distance.text;
                duration = element.duration.text;
                from2 = origins[i];
                to = destinations[j];
                document.getElementById("distancia").value = distance;
            }
        }
    }
}
/*
var map;
function initMap() {
    alert("entra al initMap");
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8,
    });
}
*/