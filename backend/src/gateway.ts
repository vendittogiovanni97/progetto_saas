import app from './app';
import dotenv from 'dotenv';
import databaseConnection from './config/mongodb';

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  if (!PORT) throw new Error('La porta del server non è definita nel file .env');
  try {
    await databaseConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Server avviato sulla porta ${PORT}`); console.log(`🔗 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Errore di connessione al database:', error);
    process.exit(1);
  } 
};

startServer();