import Sequelize from 'sequelize';
import { sequelize } from '../config/db.js';

const Travel = sequelize.define('travel', {
  origen_lat: {
    type: Sequelize.DECIMAL(12, 10),
    allowNull: false
  },
  origen_lng: {
    type: Sequelize.DECIMAL(12, 10),
    allowNull: false
  },
  destino_lat: {
    type: Sequelize.DECIMAL(12, 10),
    allowNull: true // Puede ser null si el destino no se ha establecido
  },
  destino_lng: {
    type: Sequelize.DECIMAL(12, 10),
    allowNull: true // Puede ser null si el destino no se ha establecido
  },
  estado: {
    type: Sequelize.INTEGER,
    defaultValue: 1 // Valor por defecto para el estado (activo)
  }
});

export default Travel;