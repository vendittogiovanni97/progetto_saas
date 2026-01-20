import { Router } from 'express';
import * as chatbotController from '../controllers/chatbotController';

const router = Router();

router.post('/', chatbotController.createChatbot);
router.get('/', chatbotController.getChatbots);
router.post('/message', chatbotController.sendMessage);

export { router as chatbotRoutes };
