import express from 'express';
import { addReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.post('/add', addReceipt);

export default router;
