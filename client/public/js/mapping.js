const map = L.map('map').setView([-26.1775, -58.1787], 13);  // Coordenadas de Formosa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker([-26.1775, -58.1787], { draggable: true }).addTo(map);

// Cambia la posición del marcador al hacer clic en el mapa
map.on('click', (e) => {
  const { lat, lng } = e.latlng;
  marker.setLatLng([lat, lng]);
  document.getElementById('origenLat').value = lat;
  document.getElementById('origenLng').value = lng;
});