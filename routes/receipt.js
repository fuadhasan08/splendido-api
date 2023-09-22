import express from 'express';
import { getReceipt, addReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.get('/', getReceipt);
router.post('/add', addReceipt);

export default router;
