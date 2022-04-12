let map2: google.maps.Map;

function initMap(): void {
  map2 = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: {lat: 30, lng: -110},
    zoom: 8
  });
}
