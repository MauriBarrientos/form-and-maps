document.addEventListener('DOMContentLoaded', () => {

  const travelForm = document.getElementById('travelForm');
  
    if (travelForm) {
      travelForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar que el formulario haga la solicitud por defecto
  
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const origenLat = document.getElementById('origenLat').value;
        const origenLng = document.getElementById('origenLng').value;
  
        // Realizar el fetch
        fetch('http://localhost:4000/travel/newTravel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ origen, destino, origen_lat: origenLat, origen_lng: origenLng })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Viaje almacenado con éxito:', data);
          // Puedes redirigir a otra página o hacer algo con la respuesta si lo necesitas
        })
        .catch(error => {
          console.error('Error al almacenar el viaje:', error);
        });
      });
    }const getLocationButton = document.getElementById("getLocationButton");
const latitudeElement = document.getElementById("latitude");
const longitudeElement = document.getElementById("longitude");
const mapElement = document.getElementById("map");
let map;
let marker;

const successCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    latitudeElement.textContent = latitude;
    longitudeElement.textContent = longitude;

    // Crea un mapa Leaflet y establece la vista en la ubicación del usuario
    map = L.map('map').setView([latitude, longitude], 15);

    // Añade una capa de mapeo de OpenStreetMap
    L.tileLayer('https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
        maxZoom: 19,
    }).addTo(map);

    // Coloca un marcador en la ubicación del usuario
    L.marker([latitude, longitude]).addTo(map).bindPopup("Origen.").openPopup();

    // agrega marcador al hacer clic en el mapa
map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    L.marker([lat, lng]).addTo(map).bindPopup("Destino").openPopup();
  });
};

const errorCallback = (error) => {
    console.error("Error al obtener la ubicación:", error.message);
};

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.error("Geolocalización no es compatible en este navegador.");
    }
};

getLocationButton.addEventListener("click", getLocation);
  }
);