var map2;

function initMap() {
    alert("entra a init Map");
    map2 = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 30,
            lng: -110
        },
        zoom: 8
    });
}