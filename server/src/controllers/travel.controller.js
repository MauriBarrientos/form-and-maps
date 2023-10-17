import Travel from '../models/travel.js';

const travelController = {};

travelController.saveTravel = async (req, res) => {
  const { origen, destino,
    origen_lat, origen_lng
} = req.body;

  try {
    // // Registrar el pasajero
    // const nuevoPasajero = await Pasajero.create({
    //   nombre,
    //   email,
    //   telefono
    // });

    // Registrar el viaje
    const newTravel = await Travel.create({
      origen,
      destino,
      origen_lat,
      origen_lng
    //   pasajeroId: nuevoPasajero.id // Asocia el viaje al pasajero
    });

    return res.status(201).json({ mensaje: 'Pasajero y viaje registrados correctamente', travel: newTravel });
  } catch (error) {
    console.error('Error al registrar el pasajero y viaje:', error);
    return res.status(500).json({ error: 'Hubo un error al registrar el pasajero y viaje' });
  }
};

travelController.getTravel = async (req, res) => {
  const travelId = req.params.id;
  try {
    const travel = await Travel.findOne({ where: { id: travelId } });

    if (!travel) {
      return res.status(404).json({ error: 'No se encontró el viaje con el ID proporcionado' });
    }

    // Renderiza la vista y pasa los datos del viaje
    res.render('detalleViaje', { travel });
  } catch (error) {
    console.error('Error al obtener el viaje:', error);
    return res.status(500).json({ error: 'Hubo un error al obtener el viaje' });
  }
}

travelController.showTravelList = async (req, res) => {
  try {
    console.log('Executing showTravelList')
    const travels = await Travel.findAll();

    res.render('travelList', { travels });
  } catch (error) {
    console.error('Error al obtener la lista de viajes:', error);
    return res.status(500).json({ error: 'Hubo un error al obtener la lista de viajes' });
  }
};



export default travelController;