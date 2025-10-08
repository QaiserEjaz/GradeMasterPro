import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import rootRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import calcRouter from './routes/calculations.js';
import insightsRouter from './routes/insights.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', rootRouter);
app.use('/api/auth', authRouter);
app.use('/api/calculations', calcRouter);
app.use('/api/insights', insightsRouter);

export default app;


