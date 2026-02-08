
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CORS_ORIGIN_ALLOWED
].filter(Boolean) as string[];

// ===== CORS CONFIGURAZIONE BASE =====
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Consenti richieste senza origin (es. mobile apps, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.some(o => o === origin || o.includes(origin))) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Non esiste permesso di accesso da questo dominio'));
    }
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
};
