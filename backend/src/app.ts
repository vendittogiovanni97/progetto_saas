import express from 'express';
import cors from 'cors';
import { corsOptions } from './middleware/cors.middleware';
import routeAll from './router/routeAll';

const app = express();

// ===== CORS ===== //
app.use(cors(corsOptions));

// ===== BODY PARSER JSON ===== //
app.use(express.json());

// ===== ROUTES ===== //
app.use('/api', routeAll);

export default app;
