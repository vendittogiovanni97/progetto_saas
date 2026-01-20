import { Router } from 'express';
import { register, login, getMe } from '../../controllers/authController';

const router = Router();

// Routes definition
router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

export { router as authRoutes };
