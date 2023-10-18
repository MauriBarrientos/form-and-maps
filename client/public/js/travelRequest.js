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
    }
  }
);