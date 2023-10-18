document.addEventListener('DOMContentLoaded', () => {
  const travelForm = document.getElementById('travelForm');

  if (travelForm) {
    travelForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evitar que el formulario haga la solicitud por defecto

      const origenLat = document.getElementById('origenLat').value;
      const origenLng = document.getElementById('origenLng').value;

      // Obtén los datos del destino desde los campos ocultos
      const destinoLat = document.getElementById('destinoLat').value;
      const destinoLng = document.getElementById('destinoLng').value;

      // Realizar el fetch
      try {
        const response = await fetch('http://localhost:4000/travel/newTravel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ origen_lat: origenLat, origen_lng: origenLng, destino_lat: destinoLat, destino_lng: destinoLng })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Viaje almacenado con éxito:', data);
          // Puedes redirigir a otra página o hacer algo con la respuesta si lo necesitas
          // Cambiar el texto del botón a "Remis solicitado"
          const submitBtn = document.getElementById('submitBtn');
          submitBtn.textContent = 'Remis solicitado';
        } else {
          throw new Error('Error al almacenar el viaje');
        }
      } catch (error) {
        console.error('Error al almacenar el viaje:', error);
      }
    });
  }
});