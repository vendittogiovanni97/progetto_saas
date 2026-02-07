import { Request, Response } from 'express';
import { prisma } from '../../../config/prisma';
import { callOllama } from '../../../config/ollama';

/**
 * GET /chatbots
 * Recupera tutti i chatbot associati all'account tramite i progetti
 */
export async function getUserChatbots(req: Request, res: Response): Promise<void> {
  try {
    const { accountId } = req.query;

    if (!accountId) {
      res.status(400).json({ success: false, message: 'accountId è richiesto' });
      return;
    }

    const chatbots = await prisma.chatbot.findMany({
      where: {
        project: {
          accountId: Number(accountId),
        },
      },
      include: {
        project: true,
      },
    });

    res.status(200).json({ success: true, data: chatbots });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero dei chatbot',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * GET /chatbots/:id
 * Recupera un singolo chatbot
 */
export async function getChatbot(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const chatbot = await prisma.chatbot.findUnique({
      where: { id: Number(id) },
      include: {
        project: true,
      },
    });

    if (!chatbot) {
      res.status(404).json({ success: false, message: 'Chatbot non trovato' });
      return;
    }

    res.status(200).json({ success: true, data: chatbot });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero del chatbot',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * POST /chatbots/conversations
 * Crea una nuova conversazione per un chatbot
 */
export async function createConversation(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId, visitorId } = req.body;

    if (!chatbotId) {
      res.status(400).json({ success: false, message: 'chatbotId è richiesto' });
      return;
    }

    const conversation = await prisma.conversation.create({
      data: {
        chatbotId: Number(chatbotId),
        visitorId: visitorId || null,
      },
    });

    res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nella creazione della conversazione',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * GET /chatbots/conversations
 * Recupera le conversazioni di un chatbot
 */
export async function getConversations(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId } = req.query;

    if (!chatbotId) {
      res.status(400).json({ success: false, message: 'chatbotId è richiesto' });
      return;
    }

    const conversations = await prisma.conversation.findMany({
      where: { chatbotId: Number(chatbotId) },
      include: {
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero delle conversazioni',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * DELETE /chatbots/conversations/:id
 */
export async function deleteConversation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    // Elimina messaggi associati prima (se non c'è cascade nel DB)
    await prisma.message.deleteMany({
      where: { conversationId: Number(id) },
    });

    await prisma.conversation.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, message: 'Conversazione eliminata' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nell\'eliminazione della conversazione',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * POST /chatbots/messages
 * Invia un messaggio e genera risposta AI
 */
export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId, visitorId, message, conversationId } = req.body;

    if (!chatbotId || !message) {
      res.status(400).json({ success: false, message: 'chatbotId e message sono richiesti' });
      return;
    }

    // 1. Trova o crea la conversazione
    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: Number(conversationId) },
      });
    } else if (visitorId) {
      conversation = await prisma.conversation.findFirst({
        where: { 
          chatbotId: Number(chatbotId),
          visitorId: String(visitorId)
        },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          chatbotId: Number(chatbotId),
          visitorId: visitorId ? String(visitorId) : null,
        },
      });
    }

    // 2. Salva il messaggio dell'utente
    const userMsg = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: message,
      },
    });

    // 3. Recupera info chatbot per il prompt
    const chatbot = await prisma.chatbot.findUnique({
      where: { id: Number(chatbotId) },
      include: { project: true },
    });

    // Default prompt se non specificato
    let systemPrompt = "Sei un assistente virtuale utile e professionale.";
    if (chatbot?.project?.structure) {
      try {
        const config = JSON.parse(chatbot.project.structure);
        if (config.systemPrompt) systemPrompt = config.systemPrompt;
        else if (config.encodedPrompt) systemPrompt = config.encodedPrompt; // Fallback
      } catch (e) {
        console.warn('Errore parsing struttura progetto per prompt');
      }
    }

    // 4. Chiama Ollama
    const aiResponse = await callOllama(message, systemPrompt);

    // 5. Salva la risposta dell'assistente
    const assistantMsg = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponse,
      },
    });

    // Aggiorna data ultima attività conversazione
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    res.status(200).json({
      success: true,
      data: assistantMsg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nell\'invio del messaggio',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * GET /chatbots/messages
 */
export async function getMessages(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.query;

    if (!conversationId) {
      res.status(400).json({ success: false, message: 'conversationId è richiesto' });
      return;
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: Number(conversationId) },
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nel recupero dei messaggi',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}

/**
 * DELETE /chatbots/messages/:id
 */
export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.message.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, message: 'Messaggio eliminato' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Errore nell\'eliminazione del messaggio',
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    });
  }
}
