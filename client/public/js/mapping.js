// const map = L.map('map').setView([-26.1775, -58.1787], 13);  // Coordenadas de Formosa
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors'
// }).addTo(map);

// const marker = L.marker([-26.1775, -58.1787], { draggable: true }).addTo(map);

// // Cambia la posición del marcador al hacer clic en el mapa
// map.on('click', (e) => {
//   const { lat, lng } = e.latlng;
//   marker.setLatLng([lat, lng]);
//   document.getElementById('origenLat').value = lat;
//   document.getElementById('origenLng').value = lng;
// });

const getLocationButton = document.getElementById("getLocationButton");
const latitudeElement = document.getElementById("latitude");
const longitudeElement = document.getElementById("longitude");
const mapElement = document.getElementById("map");
let map;
let marker;

const successCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('origenLat').value = latitude;
    document.getElementById('origenLng').value = longitude;

    // latitudeElement.textContent = latitude;
    // longitudeElement.textContent = longitude;

    // Crea un mapa Leaflet y establece la vista en la ubicación del usuario
    map = L.map('map').setView([latitude, longitude], 15);

    // Añade una capa de mapeo de OpenStreetMap
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileURL, {
        maxZoom: 19,
    }).addTo(map);

    // Coloca un marcador en la ubicación del usuario
    L.marker([latitude, longitude]).addTo(map).bindPopup("Origen.").openPopup();

    // agrega marcador al hacer clic en el mapa
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
    
      // Actualiza las coordenadas del destino en los campos ocultos
      document.getElementById('destinoLat').value = lat;
      document.getElementById('destinoLng').value = lng;
    
      if (marker) {
        // Si el marcador ya existe, simplemente cambia su posición y abre el popup
        marker.setLatLng([lat, lng]).bindPopup("Destino").openPopup();
      } else {
        // Si no existe, crea el marcador y agrégalo al mapa
        marker = L.marker([lat, lng]).addTo(map).bindPopup("Destino");
      }
    });
};

const errorCallback = (error) => {
    console.error("Error al obtener la ubicación:", error.message);
};

const getLocation = () => {
  if (navigator.geolocation) {
      // Intenta obtener la ubicación a través del GPS
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });
  } else {
      console.error("Geolocalización no es compatible en este navegador.");
  }
};

getLocationButton.addEventListener("click", getLocation);
