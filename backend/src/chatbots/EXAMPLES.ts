/**
 * ESEMPI DI UTILIZZO - CHATBOTS MODULE
 * 
 * Questo file mostra esempi pratici di come usare il modulo chatbots
 * nei controller, service o direttamente dall'API
 */

import { Types } from 'mongoose';
import {
  ChatbotService,
  ConversationService,
  MessageService,
} from '../services/chatbot.service';

// ============================================
// ESEMPIO 1: Creare un chatbot
// ============================================

async function createChatbotExample() {
  const chatbotService = new ChatbotService();

  const newChatbot = await chatbotService.createChatbot(
    new Types.ObjectId('userId'),
    {
      name: 'Customer Support Bot',
      welcomeMessage: 'Ciao! Sono qui per aiutarti. Come posso assisterti?',
      systemPrompt: 'Sei un agente di supporto clienti. Rispondi in italiano.',
      primaryColor: '#ff6b6b',
    }
  );

  console.log('Chatbot creato:', newChatbot);
}

// ============================================
// ESEMPIO 2: Recuperare chatbot di un utente
// ============================================

async function getUserChatsExample() {
  const chatbotService = new ChatbotService();

  const userChatbots = await chatbotService.getChatbotsByUserId(
    new Types.ObjectId('userId')
  );

  console.log('Chatbot utente:', userChatbots);
}

// ============================================
// ESEMPIO 3: Creare una conversazione
// ============================================

async function createConversationExample() {
  const conversationService = new ConversationService();

  const newConversation = await conversationService.createConversation(
    new Types.ObjectId('chatbotId'),
    'visitor-123' // ID del visitatore (può essere assente per anonimi)
  );

  console.log('Conversazione creata:', newConversation);
}

// ============================================
// ESEMPIO 4: Inviare un messaggio dell'utente
// ============================================

async function sendUserMessageExample() {
  const messageService = new MessageService();

  const userMessage = await messageService.createMessage(
    new Types.ObjectId('conversationId'),
    'user',
    'Salve, vorrei sapere i vostri orari di apertura'
  );

  console.log('Messaggio utente salvato:', userMessage);

  // TODO: In futuro, qui si integrerà con l'AI API per generare la risposta
  // const aiResponse = await generateAIResponse(userMessage.content, systemPrompt);

  // Salvare la risposta del chatbot
  // const assistantMessage = await messageService.createMessage(
  //   new Types.ObjectId('conversationId'),
  //   'assistant',
  //   aiResponse
  // );
}

// ============================================
// ESEMPIO 5: Recuperare tutta una conversazione
// ============================================

async function getConversationHistoryExample() {
  const messageService = new MessageService();

  const messages = await messageService.getMessagesByConversationId(
    new Types.ObjectId('conversationId')
  );

  // Formattare per passare all'AI
  const conversationHistory = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  console.log('Cronologia conversazione:', conversationHistory);
}

// ============================================
// ESEMPIO 6: Ottenere ultimi messaggi (context AI)
// ============================================

async function getLastMessagesExample() {
  const messageService = new MessageService();

  // Recupera gli ultimi 5 messaggi per il context dell'AI
  const recentMessages = await messageService.getLastMessages(
    new Types.ObjectId('conversationId'),
    5
  );

  console.log('Ultimi messaggi:', recentMessages);
}

// ============================================
// ESEMPIO 7: Aggiornare configurazione chatbot
// ============================================

async function updateChatbotExample() {
  const chatbotService = new ChatbotService();

  const updatedChatbot = await chatbotService.updateChatbot(
    new Types.ObjectId('chatbotId'),
    {
      name: 'Customer Support Bot v2',
      welcomeMessage: 'Benvenuto! Come possiamo aiutarti?',
      primaryColor: '#4c6ef5',
    }
  );

  console.log('Chatbot aggiornato:', updatedChatbot);
}

// ============================================
// ESEMPIO 8: Eliminare una conversazione
// ============================================

async function deleteConversationExample() {
  const conversationService = new ConversationService();

  const deleted = await conversationService.deleteConversation(
    new Types.ObjectId('conversationId')
  );

  console.log('Conversazione eliminata:', deleted);
}

// ============================================
// ESEMPIO 9: API Request (da Frontend)
// ============================================

/**
 * Creare un chatbot (POST /api/chatbots)
 * 
 * curl -X POST http://localhost:5000/api/chatbots \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer <token>" \
 *   -d '{
 *     "name": "Sales Bot",
 *     "welcomeMessage": "Ciao! Posso aiutarti con le nostre soluzioni?",
 *     "systemPrompt": "Sei un esperto di vendita...",
 *     "primaryColor": "#1abc9c"
 *   }'
 */

/**
 * Recuperare chatbot utente (GET /api/chatbots)
 * 
 * curl -X GET http://localhost:5000/api/chatbots \
 *   -H "Authorization: Bearer <token>"
 */

/**
 * Creare conversazione (POST /api/chatbots/:chatbotId/conversations)
 * 
 * curl -X POST http://localhost:5000/api/chatbots/123abc/conversations \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "visitorId": "visitor-456"
 *   }'
 */

/**
 * Inviare messaggio (POST /api/conversations/:conversationId/messages)
 * 
 * curl -X POST http://localhost:5000/api/conversations/456def/messages \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "role": "user",
 *     "content": "Quale è il vostro prodotto più popolare?"
 *   }'
 */

/**
 * Recuperare messaggi (GET /api/conversations/:conversationId/messages)
 * 
 * curl -X GET http://localhost:5000/api/conversations/456def/messages
 */

// ============================================
// FLUSSO COMPLETO ESEMPIO
// ============================================

async function completeFlowExample() {
  const userId = new Types.ObjectId('user-123');
  const chatbotService = new ChatbotService();
  const conversationService = new ConversationService();
  const messageService = new MessageService();

  // 1. Utente crea un chatbot
  console.log('1. Creazione chatbot...');
  const chatbot = await chatbotService.createChatbot(userId, {
    name: 'FAQ Bot',
    welcomeMessage: 'Ciao! Come posso aiutarti?',
    systemPrompt: 'Rispondi alle domande frequenti',
  });
  console.log('✓ Chatbot creato:', chatbot._id);

  // 2. Visitatore crea una conversazione
  console.log('\n2. Creazione conversazione...');
  const conversation = await conversationService.createConversation(
    chatbot._id,
    'visitor-789'
  );
  console.log('✓ Conversazione creata:', conversation._id);

  // 3. Visitatore invia primo messaggio
  console.log('\n3. Visitatore invia messaggio...');
  const userMsg1 = await messageService.createMessage(
    conversation._id,
    'user',
    'Quali sono i vostri orari?'
  );
  console.log('✓ Messaggio salvato:', userMsg1._id);

  // TODO: Generare risposta con AI
  // const aiReply = await generateAIResponse(...);

  // 4. ChatBot risponde
  console.log('\n4. ChatBot risponde...');
  const assistantMsg1 = await messageService.createMessage(
    conversation._id,
    'assistant',
    'Siamo aperti dal lunedì al venerdì dalle 9:00 alle 18:00.'
  );
  console.log('✓ Risposta salvata:', assistantMsg1._id);

  // 5. Recuperare la cronologia
  console.log('\n5. Cronologia conversazione...');
  const history = await messageService.getMessagesByConversationId(conversation._id);
  console.log('✓ Messaggi:', history.length);

  history.forEach((msg) => {
    console.log(`  [${msg.role}]: ${msg.content}`);
  });
}

export {};
