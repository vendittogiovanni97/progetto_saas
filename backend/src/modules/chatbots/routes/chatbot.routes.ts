import { Router } from 'express';
import { 
  createChatbot, 
  getUserChatbots, 
  getChatbot, 
  updateChatbot, 
  deleteChatbot,
  createConversation, 
  getConversations, 
  deleteConversation,
  sendMessage, 
  getMessages, 
  deleteMessage 
} from '../controllers/chatbot.controller';

const router = Router();

/* CHATBOT ROUTES
 * TODO: Aggiungere middleware di autenticazione a tutte le rotte
 * TODO: Aggiungere middleware di validazione dei dati
 * TODO: Aggiungere middleware di autorizzazione (user ownership check)
 */

// CHATBOT ROUTES - Gestione dei chatbot
router.post('/', createChatbot); // POST /chatbots - Crea un nuovo chatbot
router.get('/', getUserChatbots); // GET /chatbots - Prendi tutti i chatbot di un utente (usa ?accountId=123)
router.get('/:id', getChatbot); // GET /chatbots/:id - Prendi un chatbot specifico
router.put('/:id', updateChatbot); // PUT /chatbots/:id - Aggiorna un chatbot
router.delete('/:id', deleteChatbot); // DELETE /chatbots/:id - Elimina un chatbot

// CONVERSATION ROUTES - Gestione delle conversazioni
router.post('/conversations', createConversation); // POST /conversations - Crea una nuova conversazione
router.get('/conversations', getConversations); // GET /conversations - Prendi conversazioni di un chatbot (usa ?chatbotId=123)
router.delete('/conversations/:id', deleteConversation); // DELETE /conversations/:id - Elimina una conversazione

// MESSAGE ROUTES - Invio e gestione messaggi
router.post('/messages', sendMessage); // POST /messages - Invia un messaggio e ricevi risposta
router.get('/messages', getMessages); // GET /messages - Prendi messaggi di una conversazione (usa ?conversationId=123)
router.delete('/messages/:id', deleteMessage); // DELETE /messages/:id - Elimina un messaggio

export default router;
