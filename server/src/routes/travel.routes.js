import express from 'express';
import travelController from '../controllers/travel.controller.js';


const travelRouter = express.Router();

travelRouter.post('/newTravel', travelController.saveTravel);

travelRouter.get('/list', travelController.showTravelList);

travelRouter.get('/:id', travelController.getTravel)

travelRouter.post('/update/:travelId', travelController.updateTravelStatus); 

export {travelRouter};