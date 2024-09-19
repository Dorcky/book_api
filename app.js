// app.js
import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import { limiter } from './middleware/rateLimit.js';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
app.use(limiter);
app.use('/api/books', bookRoutes);

export default app;
