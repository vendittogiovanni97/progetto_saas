import { Router } from 'express';
import { createChatbot, createConversation, deleteChatbot, deleteConversation, deleteMessage, getChatbot, getConversations, getMessages, getUserChatbots, sendMessage, updateChatbot, handleChat, getAvailableChatbotTypes } from '../controllers/chatbot.controller';

const router = Router();

/**
 * CHATBOT ROUTES
 * TODO: Aggiungere middleware di autenticazione a tutte le rotte
 * TODO: Aggiungere middleware di validazione dei dati
 * TODO: Aggiungere middleware di autorizzazione (user ownership check)
 */

// POST /chatbots - Crea un nuovo chatbot
router.post('/chatbots', createChatbot);

// GET /chatbots - Recupera tutti i chatbot dell'utente
router.get('/chatbots', getUserChatbots);

// GET /chatbots/:id - Recupera un chatbot specifico
router.get('/chatbots/:id', getChatbot);

// PUT /chatbots/:id - Aggiorna un chatbot
router.put('/chatbots/:id', updateChatbot);

// DELETE /chatbots/:id - Elimina un chatbot
router.delete('/chatbots/:id', deleteChatbot);

/**
 * CONVERSATION ROUTES
 */

// POST /chatbots/:chatbotId/conversations - Crea una nuova conversazione
router.post('/chatbots/:chatbotId/conversations', createConversation);

// GET /conversations/:id - Recupera una conversazione specifica
router.get('/conversations/:id', getConversations);
// DELETE /conversations/:id - Elimina una conversazione
router.delete('/conversations/:id', deleteConversation);

/**
 * MESSAGE ROUTES
 */

// POST /conversations/:conversationId/messages - Invia un messaggio
router.post(
  '/conversations/:conversationId/messages',
  sendMessage
);

// GET /conversations/:conversationId/messages - Recupera messaggi di una conversazione
router.get(
  '/conversations/:conversationId/messages',
  getMessages
);

// DELETE /messages/:id - Elimina un messaggio
router.delete('/messages/:id', deleteMessage);

/**
 * OLLAMA INTEGRATION ROUTES
 */

// POST /api/chat - Endpoint principale per la chat con Ollama
router.post('/api/chat', handleChat);

// GET /api/chat/types - Endpoint per ottenere i tipi di chatbot disponibili
router.get('/api/chat/types', getAvailableChatbotTypes);

export default router;
