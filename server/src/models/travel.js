import Sequelize from 'sequelize';
import {sequelize} from '../config/db.js';

const Travel = sequelize.define('travel', {
  origen: {
    type: Sequelize.STRING,
    allowNull: false
  },
  destino: {
    type: Sequelize.STRING,
    allowNull: false
  },
  origen_lat: {
    type: Sequelize.DECIMAL(12, 10),
    allowNull: false
  },
  origen_lng: {
    type: Sequelize.DECIMAL(12, 10),
    allowNull: false
  }
});

export default Travel;