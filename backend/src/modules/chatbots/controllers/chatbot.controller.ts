import { Request, Response } from "express";
import { prisma } from "../../../config/prisma";
import { getAvailableTypes, getTemplate } from "./chatbot.templates";

// =============================================================================
// CHATBOTS - Qui gestiamo la creazione e modifica dei Bot
// =============================================================================

/**
 * Crea un nuovo chatbot
 * POST /chatbots
 */
export async function createChatbot(req: Request, res: Response): Promise<void> {
  try {
    // TODO (Junior): Qui dovremmo assicurarci che l'utente sia loggato (middleware).
    // Per ora prendiamo l'ID dall'utente (se c'è il token) o dal body.
    const accountId = (req as any).user?.id || req.body.accountId;

    if (!accountId || Number.isNaN(accountId)) {
      throw new Error("accountId non valido");
    }

    // TODO (Junior): Sarebbe utile controllare se il nome è vuoto prima di salvare.
    const { name, welcomeMessage, systemPrompt, primaryColor } = req.body;

    // Salviamo nel database usando Prisma direttamente
    const chatbot = await prisma.chatbot.create({
      data: {
        name,
        // Messaggi di default se l'utente non li fornisce
        welcomeMessage: welcomeMessage || "Ciao! Sono il tuo assistente. Come posso aiutarti?",
        systemPrompt: systemPrompt || "Sei un assistente utile e gentile.",
        primaryColor: primaryColor || "#3b82f6",
        accountId: parseInt(accountId as string, 10),
      },
    });

    res.status(201).json({
      success: true,
      data: chatbot,
    });
  } catch (error) {
    // TODO (Junior): Meglio usare un logger (tipo Winston) invece di console.log
    res.status(500).json({
      success: false,
      message: "C'è stato un errore nel creare il chatbot. Riprova più tardi.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Recupera tutti i chatbot che appartengono all'utente
 * GET /chatbots
 */
export async function getUserChatbots(req: Request, res: Response): Promise<void> {
  try {
    const accountId = (req as any).user?.id || req.query.accountId;

    if (!accountId || Number.isNaN(accountId)) {
      throw new Error("accountId non valido");
    }

    // TODO (Junior): Se l'utente ha 1000 chatbot, la pagina sarà lenta. 
    // In futuro aggiungiamo la paginazione qui!
    const chatbots = await prisma.chatbot.findMany({
      where: { accountId: parseInt(accountId as string, 10) },
      orderBy: { createdAt: "desc" }, // I più nuovi per primi
    });

    res.status(200).json({
      success: true,
      data: chatbots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero dei tuoi chatbot.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Prende i dettagli di un singolo chatbot basandosi sull'ID
 * GET /chatbots/:id
 */
export async function getChatbot(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const chatbotId = parseInt(id as string, 10);

    const chatbot = await prisma.chatbot.findUnique({
      where: { id: chatbotId },
    });

    // TODO (Junior): Aggiungi un controllo per vedere se il chatbot appartiene
    // veramente all'utente che lo sta chiedendo (Security Check!).
    if (!chatbot) {
      res.status(404).json({
        success: false,
        message: "Chatbot non trovato. Controlla l'ID.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: chatbot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Non sono riuscito a trovare questo chatbot.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Permette di modificare i dati di un chatbot esistente
 * PUT /chatbots/:id
 */
export async function updateChatbot(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const chatbotId = parseInt(id as string, 10);
    const updateData = req.body;

    // TODO (Junior): Ricordati di validare i dati nel body prima di aggiornare.
    const chatbot = await prisma.chatbot.update({
      where: { id: chatbotId },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      data: chatbot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore durante l'aggiornamento del chatbot.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Elimina un chatbot dal sistema
 * DELETE /chatbots/:id
 */
export async function deleteChatbot(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const chatbotId = parseInt(id as string, 10);

    // TODO (Junior): Si potrebbe fare una 'soft delete' (nascondere il bot invece di cancellarlo).
    await prisma.chatbot.delete({
      where: { id: chatbotId },
    });

    res.status(200).json({
      success: true,
      message: "Chatbot eliminato con successo!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Impossibile eliminare il chatbot.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

// =============================================================================
// CONVERSATIONS - Gestione delle chat aperte dai visitatori
// =============================================================================

/**
 * Crea una nuova sessione di chat (conversazione)
 * POST /chatbots/:chatbotId/conversations
 */
export async function createConversation(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId } = req.params;
    const chatbotIdNum = parseInt(chatbotId as string, 10);
    const { visitorId } = req.body;

    // TODO (Junior): Se visitorId non c'è, creane uno random per tracciare l'utente anonimo.
    const conversation = await prisma.conversation.create({
      data: {
        chatbotId: chatbotIdNum,
        visitorId,
      },
    });

    res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'iniziare una nuova chat.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Prende la lista delle conversazioni per un bot specifico
 * GET /chatbots/:chatbotId/conversations
 */
export async function getConversations(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId } = req.params;
    const chatbotIdNum = parseInt(chatbotId as string, 10);

    const conversations = await prisma.conversation.findMany({
      where: { chatbotId: chatbotIdNum },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel caricamento delle conversazioni.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Elimina una conversazione (e i suoi messaggi se impostato il Cascade)
 * DELETE /conversations/:id
 */
export async function deleteConversation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const conversationId = parseInt(id as string, 10);

    await prisma.conversation.delete({
      where: { id: conversationId },
    });

    res.status(200).json({
      success: true,
      message: "Chat eliminata definitivamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Non sono riuscito a eliminare la conversazione.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

// =============================================================================
// MESSAGES - Gestione dei singoli messaggi inviati
// =============================================================================

/**
 * Invia un messaggio e (in futuro) ottieni risposta dall'AI
 * POST /conversations/:conversationId/messages
 */
export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.params;
    const conversationIdNum = parseInt(conversationId as string, 10);
    const { role, content } = req.body;

    // TODO (Junior): Qui dovrai integrare l'AI (OpenAI, Gemini, etc.)!
    // 1. Salva il messaggio dell'utente.
    // 2. Invia la storia della chat all'AI.
    // 3. Salva la risposta dell'AI e mandala indietro.

    const message = await prisma.message.create({
      data: {
        conversationId: conversationIdNum,
        role, // Può essere 'user' o 'assistant'
        content,
      },
    });

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'invio del messaggio.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Recupera tutti i messaggi di una specifica conversazione
 * GET /conversations/:conversationId/messages
 */
export async function getMessages(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.params;
    const conversationIdNum = parseInt(conversationId as string, 10);

    const messages = await prisma.message.findMany({
      where: { conversationId: conversationIdNum },
      orderBy: { createdAt: "asc" }, // Ordine cronologico per leggere la chat bene
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero della cronologia messaggi.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Elimina un singolo messaggio
 * DELETE /messages/:id
 */
export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const messageId = parseInt(id as string, 10);

    await prisma.message.delete({
      where: { id: messageId },
    });

    res.status(200).json({
      success: true,
      message: "Messaggio rimosso.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Non ho potuto cancellare il messaggio.",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * Chatbot Controller
 * 
 * Questo controller gestisce le chiamate all'API di Ollama.
 * Per un junior developer: questo è il "cervello" che parla con l'AI.
 * 
 * Funzionalità principali:
 * - Validazione dell'input
 * - Chiamata a Ollama
 * - Gestione degli errori
 * - Supporto ai template per diversi tipi di chatbot
 */

// Interfaccia per la richiesta al nostro endpoint
interface ChatRequest {
  message: string;
  type?: string; // Tipo di chatbot (support, ecommerce, pharmacy, ecc.)
}

// Interfaccia per la risposta di Ollama
interface OllamaResponse {
  message: {
    content: string;
  };
}

// Funzione principale che gestisce la chat
export async function handleChat(req: Request, res: Response): Promise<void> {
  try {
    // 1. Validazione dell'input
    const { message, type }: ChatRequest = req.body;

    // Controlliamo che il messaggio non sia vuoto
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Il messaggio è obbligatorio e deve essere una stringa non vuota.'
      });
      return;
    }

    // 2. Prepariamo il prompt di sistema basato sul tipo di chatbot
    const template = getTemplate(type || 'generic');
    const systemPrompt = template.systemPrompt;

    // 3. Chiamiamo Ollama
    const response = await callOllama(message, systemPrompt);

    // 4. Restituiamo la risposta
    res.status(200).json({
      success: true,
      reply: response.message.content
    });

  } catch (error) {
    // 5. Gestione degli errori
    console.error('Errore nella gestione della chat:', error);
    
    res.status(500).json({
      success: false,
      error: 'Si è verificato un errore durante l\'elaborazione della richiesta.'
    });
  }
}

// Funzione che effettua la chiamata HTTP a Ollama
async function callOllama(userMessage: string, systemPrompt: string): Promise<OllamaResponse> {
  // Leggiamo le variabili d'ambiente
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const ollamaModel = process.env.OLLAMA_MODEL || 'phi3';

  // Costruiamo l'URL completo per l'API di Ollama
  const apiUrl = `${ollamaUrl}/v1/chat/completions`;

  // Prepariamo il corpo della richiesta
  const requestBody = {
    model: ollamaModel,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userMessage
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  };

  // Effettuiamo la chiamata HTTP usando fetch (nativo in Node.js)
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Controlliamo se la risposta è ok
  if (!response.ok) {
    throw new Error(`Errore Ollama: ${response.status} - ${response.statusText}`);
  }

  // Parsiamo la risposta JSON
  const data = await response.json();

  // Controlliamo che la risposta abbia il formato atteso
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Risposta Ollama non valida');
  }

  // Restituiamo l'oggetto nel formato che ci aspettiamo
  return {
    message: {
      content: data.choices[0].message.content
    }
  };
}

// Funzione per ottenere i tipi di chatbot disponibili (opzionale, per debug)
export function getAvailableChatbotTypes(req: Request, res: Response): void {
  try {
    const types = getAvailableTypes();
    
    res.status(200).json({
      success: true,
      types: types
    });
  } catch (error) {
    console.error('Errore nel recupero dei tipi di chatbot:', error);
    
    res.status(500).json({
      success: false,
      error: 'Si è verificato un errore durante il recupero dei tipi di chatbot.'
    });
  }
}

