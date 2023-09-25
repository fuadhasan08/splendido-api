import express from 'express';
import {
  getReceipt,
  addReceipt,
  deleteReceipt,
  searchByName,
} from '../controllers/receiptController.js';

const router = express.Router();

router.get('/', getReceipt);
router.post('/add', addReceipt);
router.post('/delete', deleteReceipt);
router.get('/get', searchByName);

export default router;
