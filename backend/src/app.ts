import express from 'express';
import cors from 'cors';
import { corsOptions } from './middleware/cors.middleware';
import AuthRouter from './modules/koda-gup/routes/auth';


const app = express();

// ===== CORS ===== //
app.use(cors(corsOptions));

// ===== BODY PARSER JSON ===== //
app.use(express.json());

app.use('/api',AuthRouter);

export default app;