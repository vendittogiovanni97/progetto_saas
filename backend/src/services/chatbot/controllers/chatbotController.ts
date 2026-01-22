import { Request, Response } from 'express';
import { prisma } from '../../../utils/prisma';

export const createChatbot = async (req: Request, res: Response) => {
  const { name, welcomeMessage, systemPrompt, primaryColor, userId } = req.body;

  try {
    // --- FIX PER SVILUPPO ---
    // Se l'utente è quello di debug (USR-001), assicuriamoci che esista nel DB
    if (userId === 'USR-001') {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        console.log("Creating dev user USR-001...");
        await prisma.user.create({
          data: {
            id: userId,
            email: 'admin@example.com',
            password: 'dev_password_insecure',
            role: 'ADMIN',
          },
        });
      }
    }
    // ------------------------

    const chatbot = await prisma.chatbot.create({
      data: {
        name,
        welcomeMessage,
        systemPrompt,
        primaryColor,
        userId, 
      },
    });
    res.status(201).json({ data: chatbot });
  } catch (error) {
    console.error('Error creating chatbot:', error);
    res.status(500).json({ error: 'Errore durante la creazione del chatbot' });
  }
};

export const getChatbots = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const chatbots = await prisma.chatbot.findMany({
      where: userId ? { userId: String(userId) } : {},
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ data: chatbots });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei chatbot' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { chatbotId, message, visitorId } = req.body;

  try {
    // 1. Trova o crea conversazione
    let conversation = await prisma.conversation.findFirst({
      where: { chatbotId, visitorId },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { chatbotId, visitorId },
      });
    }

    // 2. Salva messaggio utente
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: message,
      },
    });

    // 3. Genera risposta (Logica semplice per ora)
    const chatbot = await prisma.chatbot.findUnique({ where: { id: chatbotId } });
    let responseContent = `Ho ricevuto il tuo messaggio: "${message}". Sto imparando a rispondere meglio!`;
    
    if (message.toLowerCase().includes('ciao')) {
      responseContent = chatbot?.welcomeMessage || "Ciao! Come posso aiutarti?";
    } else if (message.toLowerCase().includes('chi sei')) {
      responseContent = `Sono ${chatbot?.name}, il tuo assistente virtuale personalizzato.`;
    }

    // 4. Salva messaggio assistente
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: responseContent,
      },
    });

    res.status(200).json({ data: assistantMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Errore nell\'invio del messaggio' });
  }
};
