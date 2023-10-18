const origenLat = parseFloat('<%= travel.origen_lat %>');
    const origenLng = parseFloat('<%= travel.origen_lng %>');
    const destinoLat = parseFloat('<%= travel.destino_lat %>');
    const destinoLng = parseFloat('<%= travel.destino_lng %>');

    const map = L.map('map').setView([origenLat, origenLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([origenLat, origenLng]).addTo(map).bindPopup('Origen').openPopup();
    L.marker([destinoLat, destinoLng]).addTo(map).bindPopup('Destino').openPopup();

    document.getElementById('origen').innerText = 'Origen: ' + '<%= travel.origen %>';
    document.getElementById('destino').innerText = 'Destino: ' + '<%= travel.destino %>';

    const acceptTripButton = document.getElementById('acceptTripButton');

acceptTripButton.addEventListener('click', () => {
  const travelId = '<%= travel.id %>';

  fetch(`http://localhost:4000/travel/update/${travelId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      travelId: travelId
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Estado del viaje actualizado:', data);
    // Aquí puedes realizar acciones adicionales después de cambiar el estado del viaje.
  })
  .catch(error => {
    console.error('Error al actualizar el estado del viaje:', error);
  });
});