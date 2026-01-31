
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

/// Lista cors consentiti ///
const allowedOriginCors = process.env.CORS_ORIGIN_ALLOWED

// ===== CORS CONFIGURAZIONE BASE =====
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Consenti richieste senza origin (es. mobile apps, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if(!allowedOriginCors) {
      return callback(new Error('CORS non configurato correttamente'));
    }

    if (allowedOriginCors.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Non esiste permesso di accesso da questo dominio'));
    }
  },
  credentials: false, // Permette cookies per il momento false da gestire dopo con nicola!!!
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // Cache preflight per 24h
};
