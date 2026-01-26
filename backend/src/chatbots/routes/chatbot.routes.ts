import { Router } from 'express';
import {
  ChatbotController,
  ConversationController,
  MessageController,
} from '../controllers/chatbot.controllers';

const router = Router();

/**
 * CHATBOT ROUTES
 * TODO: Aggiungere middleware di autenticazione a tutte le rotte
 * TODO: Aggiungere middleware di validazione dei dati
 * TODO: Aggiungere middleware di autorizzazione (user ownership check)
 */

// POST /chatbots - Crea un nuovo chatbot
router.post('/chatbots', ChatbotController.createChatbot);

// GET /chatbots - Recupera tutti i chatbot dell'utente
router.get('/chatbots', ChatbotController.getUserChatbots);

// GET /chatbots/:id - Recupera un chatbot specifico
router.get('/chatbots/:id', ChatbotController.getChatbot);

// PUT /chatbots/:id - Aggiorna un chatbot
router.put('/chatbots/:id', ChatbotController.updateChatbot);

// DELETE /chatbots/:id - Elimina un chatbot
router.delete('/chatbots/:id', ChatbotController.deleteChatbot);

/**
 * CONVERSATION ROUTES
 */

// POST /chatbots/:chatbotId/conversations - Crea una nuova conversazione
router.post('/chatbots/:chatbotId/conversations', ConversationController.createConversation);

// GET /chatbots/:chatbotId/conversations - Recupera conversazioni di un chatbot
router.get(
  '/chatbots/:chatbotId/conversations',
  ConversationController.getConversations
);

// GET /conversations/:id - Recupera una conversazione specifica
router.get('/conversations/:id', ConversationController.getConversation);

// DELETE /conversations/:id - Elimina una conversazione
router.delete('/conversations/:id', ConversationController.deleteConversation);

/**
 * MESSAGE ROUTES
 */

// POST /conversations/:conversationId/messages - Invia un messaggio
router.post(
  '/conversations/:conversationId/messages',
  MessageController.sendMessage
);

// GET /conversations/:conversationId/messages - Recupera messaggi di una conversazione
router.get(
  '/conversations/:conversationId/messages',
  MessageController.getMessages
);

// DELETE /messages/:id - Elimina un messaggio
router.delete('/messages/:id', MessageController.deleteMessage);

export default router;
