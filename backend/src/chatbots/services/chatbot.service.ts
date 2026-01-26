import { PrismaClient, Chatbot, Conversation, Message } from '@prisma/client';

const prisma = new PrismaClient();

export class ChatbotService {
  /**
   * Crea un nuovo chatbot per un utente
   */
  async createChatbot(
    userId: number,
    data: {
      name: string;
      welcomeMessage?: string;
      systemPrompt?: string;
      primaryColor?: string;
    }
  ): Promise<Chatbot> {
    return await prisma.chatbot.create({
      data: {
        name: data.name,
        welcomeMessage: data.welcomeMessage || 'Ciao! Come posso aiutarti?',
        systemPrompt: data.systemPrompt,
        primaryColor: data.primaryColor || '#3b82f6',
        userId,
      },
    });
  }

  /**
   * Recupera tutti i chatbot di un utente
   */
  async getChatbotsByUserId(userId: number): Promise<Chatbot[]> {
    return await prisma.chatbot.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Recupera un chatbot specifico
   */
  async getChatbotById(id: number): Promise<Chatbot | null> {
    return await prisma.chatbot.findUnique({
      where: { id },
    });
  }

  /**
   * Aggiorna un chatbot
   */
  async updateChatbot(
    id: number,
    data: Partial<Chatbot>
  ): Promise<Chatbot | null> {
    try {
      return await prisma.chatbot.update({
        where: { id },
        data,
      });
    } catch (error) {
      return null;
    }
  }

  /**
   * Elimina un chatbot
   */
  async deleteChatbot(id: number): Promise<boolean> {
    try {
      await prisma.chatbot.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export class ConversationService {
  /**
   * Crea una nuova conversazione
   */
  async createConversation(
    chatbotId: number,
    visitorId?: string
  ): Promise<Conversation> {
    return await prisma.conversation.create({
      data: {
        chatbotId,
        visitorId,
      },
    });
  }

  /**
   * Recupera tutte le conversazioni di un chatbot
   */
  async getConversationsByChatbotId(chatbotId: number): Promise<Conversation[]> {
    return await prisma.conversation.findMany({
      where: { chatbotId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Recupera una conversazione specifica
   */
  async getConversationById(id: number): Promise<Conversation | null> {
    return await prisma.conversation.findUnique({
      where: { id },
    });
  }

  /**
   * Elimina una conversazione
   */
  async deleteConversation(id: number): Promise<boolean> {
    try {
      await prisma.conversation.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export class MessageService {
  /**
   * Aggiunge un messaggio a una conversazione
   */
  async createMessage(
    conversationId: number,
    role: 'user' | 'assistant',
    content: string
  ): Promise<Message> {
    return await prisma.message.create({
      data: {
        conversationId,
        role,
        content,
      },
    });
  }

  /**
   * Recupera tutti i messaggi di una conversazione
   */
  async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Recupera gli ultimi N messaggi
   */
  async getLastMessages(
    conversationId: number,
    limit: number = 10
  ): Promise<Message[]> {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Elimina un messaggio
   */
  async deleteMessage(id: number): Promise<boolean> {
    try {
      await prisma.message.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { prisma };
