import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// TODO: Implement a custom Logger middleware (e.g., Winston)
app.use(cors());
app.use(express.json());
// TODO: Implement authentication middleware (e.g., authenticateJWT) for protected routes
// TODO: Use a validation library like Zod or Joi for input verification on request bodies

// TODO: Add global Error Handling middleware

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Authentication' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Authentication service running on port ${PORT}`);
});
