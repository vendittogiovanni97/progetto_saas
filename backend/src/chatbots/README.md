# Chatbots Module

Questo modulo gestisce la creazione, configurazione e gestione dei chatbot e delle loro conversazioni.

## Struttura

```
chatbots/
├── models/           # Schemi Mongoose (Chatbot, Conversation, Message)
├── services/         # Logica di business (ChatbotService, ConversationService, MessageService)
├── controllers/      # Gestori delle richieste HTTP
├── routes/          # Definizione delle rotte API
└── README.md        # Questo file
```

## Modelli

### Chatbot
Rappresenta un chatbot creato da un utente.

**TODO Future:**
- Validazione HEX color format
- Validazione lunghezza systemPrompt
- Cascading delete quando utente eliminato
- Indici per performance queries

### Conversation
Rappresenta una conversazione tra un visitatore e un chatbot.

**TODO Future:**
- UUID generation per visitorId
- Campo metadata (device, browser, location)
- Campo isActive per tracciare conversazioni concluse
- Rating/feedback della conversazione

### Message
Rappresenta un singolo messaggio in una conversazione.

**TODO Future:**
- Supporto per allegati (immagini, file)
- Feedback dell'utente (helpful/not helpful)
- Response time tracking
- Token usage tracking per costi API

## Services

### ChatbotService
Gestisce operazioni su chatbot:
- `createChatbot()` - Crea nuovo chatbot
- `getChatbotsByUserId()` - Recupera chatbot di un utente
- `getChatbotById()` - Recupera chatbot specifico
- `updateChatbot()` - Aggiorna chatbot
- `deleteChatbot()` - Elimina chatbot

**TODO Future:**
- Validazione numero massimo chatbot per utente (plan-based)
- Paginazione

### ConversationService
Gestisce operazioni su conversazioni:
- `createConversation()` - Crea nuova conversazione
- `getConversationsByChatbotId()` - Recupera conversazioni di un chatbot
- `getConversationById()` - Recupera conversazione specifica
- `deleteConversation()` - Elimina conversazione

**TODO Future:**
- Paginazione con limit/offset
- Filtri per data e status
- Cascading delete dei messages

### MessageService
Gestisce operazioni su messaggi:
- `createMessage()` - Crea nuovo messaggio
- `getMessagesByConversationId()` - Recupera messaggi di una conversazione
- `getLastMessages()` - Recupera ultimi N messaggi (per context AI)
- `deleteMessage()` - Elimina messaggio

**TODO Future:**
- Smart context window per AI
- Soft delete per integrità storica

## Controllers

### ChatbotController
Gestisce le richieste HTTP per i chatbot.

**TODO Future:**
- Middleware autenticazione JWT
- Validazione dati in input (Joi/Zod)
- Logger strutturato
- Verificare ownership del chatbot

### ConversationController
Gestisce le richieste HTTP per le conversazioni.

**TODO Future:**
- Paginazione da query params
- Generazione automatica visitorId

### MessageController
Gestisce le richieste HTTP per i messaggi.

**TODO Future:**
- Validazione role enum
- Integrazione con AI API per generare risposte
- Paginazione
- Soft delete

## Routes

### Chatbot Endpoints
- `POST /chatbots` - Crea chatbot
- `GET /chatbots` - Lista chatbot utente
- `GET /chatbots/:id` - Dettagli chatbot
- `PUT /chatbots/:id` - Aggiorna chatbot
- `DELETE /chatbots/:id` - Elimina chatbot

### Conversation Endpoints
- `POST /chatbots/:chatbotId/conversations` - Crea conversazione
- `GET /chatbots/:chatbotId/conversations` - Lista conversazioni
- `GET /conversations/:id` - Dettagli conversazione
- `DELETE /conversations/:id` - Elimina conversazione

### Message Endpoints
- `POST /conversations/:conversationId/messages` - Invia messaggio
- `GET /conversations/:conversationId/messages` - Lista messaggi
- `DELETE /messages/:id` - Elimina messaggio

## TODO Global

- [ ] Aggiungere middleware autenticazione JWT
- [ ] Aggiungere validazione input (Joi/Zod)
- [ ] Implementare proper error handling
- [ ] Aggiungere logger strutturato
- [ ] Implementare paginazione
- [ ] Aggiungere soft delete per audit trail
- [ ] Integrazione con AI API per generazione risposte
- [ ] Rate limiting
- [ ] Caching delle query frequenti
- [ ] Monitoring e analytics
- [ ] Tests unitari e integrazione
