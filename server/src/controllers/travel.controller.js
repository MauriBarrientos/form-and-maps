import Travel from '../models/travel.js';

const travelController = {};

travelController.saveTravel = async (req, res) => {
  const { origen_lat, origen_lng, destino_lat, destino_lng } = req.body;

  try {
    const newTravel = await Travel.create({
      origen_lat,
      origen_lng,
      destino_lat,  // Agregar destino_lat a la creación del viaje
      destino_lng,
      estado: 1 // Estado activo por defecto
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

export const getTravelDetails = async (req, res) => {
  const { travelId } = req.params;

  try {
    const travel = await Travel.findByPk(travelId);

    if (!travel) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    return res.status(200).json({ travel });
  } catch (error) {
    console.error('Error al obtener los detalles del viaje:', error);
    return res.status(500).json({ error: 'Hubo un error al obtener los detalles del viaje' });
  }
};

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

travelController.updateTravelStatus = async (req, res) => {
  const { travelId } = req.params;

  try {
    const travel = await Travel.findByPk(travelId);

    if (!travel) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    // Actualiza el estado del viaje a 0 (aceptado)
    travel.estado = 0;
    await travel.save();

    return res.status(200).json({ message: 'Estado del viaje actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el estado del viaje:', error);
    return res.status(500).json({ error: 'Hubo un error al actualizar el estado del viaje' });
  }
};



export default travelController;