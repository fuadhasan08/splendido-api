import express from 'express';
import servicesRoute from './routes/services.js';
import receiptRoute from './routes/receipt.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Services Route Register
app.use('/api/v1/services', servicesRoute);
app.use('/api/v1/receipt', receiptRoute);

app.listen(process.env.PORT, () => {
  console.log(`App is Listening to port ${process.env.PORT}`);
});
