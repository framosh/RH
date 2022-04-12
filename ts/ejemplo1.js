var map;
var center = {
    lat: 30,
    lng: -110
};

function initMap() {
    alert("entra al initMap");
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 8
    });
}