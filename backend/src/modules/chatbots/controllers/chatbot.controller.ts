import { Request, Response } from "express";
import { prisma } from "../../../config/prisma";
import { encodePrompt, decodePrompt, getFinalSystemPrompt } from "../../../modules/chatbots/utils/utils-chatbot";
import { callOllama } from "../../../config/ollama";

/**
 * GET /chatbots
 * Recupera tutti i chatbot di un account (tramite i progetti)
 */
export async function getUserChatbots(req: Request, res: Response): Promise<void> {
  try {
    const { accountId } = req.query;

    const chatbots = await prisma.chatbot.findMany({
      where: { accountId: Number(accountId) },
      include: {
        project: true, // Include il progetto associato
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: chatbots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero dei chatbot",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

/**
 * GET /chatbots/:id
 * Recupera un singolo chatbot con il progetto associato
 */
export async function getChatbot(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const chatbot = await prisma.chatbot.findUnique({
      where: { id: Number(id) },
      include: {
        project: true, // Include il progetto
        conversations: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!chatbot) {
      res.status(404).json({
        success: false,
        message: "Chatbot non trovato",
      });
      return;
    }

    // Se c'è un prompt codificato, decodificalo
    const response = {
      ...chatbot,
      decodedPrompt: chatbot.encodedPrompt 
        ? decodePrompt(chatbot.encodedPrompt) 
        : null
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero del chatbot",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

export async function createConversation(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId, visitorId } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        chatbotId: Number(chatbotId),
        visitorId: visitorId || `visitor_${Date.now()}`,
      },
    });

    res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nella creazione della conversazione",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

export async function getConversations(req: Request, res: Response): Promise<void> {
  try {
    const { chatbotId } = req.query;

    const conversations = await prisma.conversation.findMany({
      where: { chatbotId: Number(chatbotId) },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero delle conversazioni",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

export async function deleteConversation(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.conversation.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Conversazione eliminata",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'eliminazione della conversazione",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId, content } = req.body;

    // 1. Salva il messaggio dell'utente
    const userMessage = await prisma.message.create({
      data: {
        conversationId: Number(conversationId),
        role: 'user',
        content,
      },
    });

    // 2. Prendi il chatbot per sapere come rispondere
    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(conversationId) },
      include: { chatbot: true }
    });

    if (!conversation) {
      res.status(404).json({
        success: false,
        message: "Conversazione non trovata"
      });
      return;
    }

    let botResponse = '';

    // 3. Se il chatbot è DEFAULT, usa risposta fissa
    if (conversation.chatbot.type === 'DEFAULT') {
      botResponse = 'Grazie per il messaggio! Ti risponderemo presto.';
    } 
    // 4. Se il chatbot è AI, chiama l'intelligenza artificiale
    else if (conversation.chatbot.type === 'AI') {
      const systemPrompt = getFinalSystemPrompt(conversation.chatbot);
      botResponse = await callOllama(content, systemPrompt);
    }

    // 5. Salva la risposta del bot
    const botMessage = await prisma.message.create({
      data: {
        conversationId: Number(conversationId),
        role: 'assistant',
        content: botResponse,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        userMessage,
        botMessage
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'invio del messaggio",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

export async function getMessages(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.query;

    const messages = await prisma.message.findMany({
      where: { conversationId: Number(conversationId) },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nel recupero dei messaggi",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.message.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Messaggio eliminato",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore nell'eliminazione del messaggio",
      error: error instanceof Error ? error.message : "Errore sconosciuto",
    });
  }
}

