import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());


// Avvio del server
app.listen(PORT, () => {
  console.log(`\x1b[32m[SERVER]\x1b[0m Running on http://localhost:${PORT}`);
  console.log(`\x1b[33m[MODE]\x1b[0m Development mode active`);
});
