import express from 'express';
import cors from 'cors';
import { corsOptions } from './middleware/cors.middleware';
import AuthRouter from './modules/koda-gup/routes/auth';
import chatbotRoutes from './modules/chatbots/routes/chatbot.routes';

const app = express();

// ===== CORS ===== //
app.use(cors(corsOptions));

// ===== BODY PARSER JSON ===== //
app.use(express.json());

// ===== ROUTES ===== //
app.use('/api', AuthRouter);
app.use('/api', chatbotRoutes);

export default app;
