import express from 'express';
import logger from '../middleware/logger';
import { vehicleController } from './vehicle.controller';
import auth from '../middleware/auth';


const router = express.Router();

//! create vehicle
router.post('/', logger, auth("admin"), vehicleController.createVehicle);

//! get vehicle
router.get('/', logger, vehicleController.getVehicle);

//! get single vehicle
router.get('/:vehicleId', logger, vehicleController.getSingleVehicle);

//! update vehicle
router.put('/:vehicleId', logger, auth("admin"), vehicleController.updateVehicle);

//! delete vehicle
router.delete('/:vehicleId', logger, auth("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;