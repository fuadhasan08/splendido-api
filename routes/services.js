import express from 'express';
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from '../controllers/servicesController.js';

const router = express.Router();

router.get('/', getServices);
router.post('/add', addService);
router.post('/update', updateService);
router.post('/delete', deleteService);

export default router;
