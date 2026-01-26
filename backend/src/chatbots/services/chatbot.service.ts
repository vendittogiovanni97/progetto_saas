import { Types } from 'mongoose';
import { Chatbot, Conversation, Message } from '../models';
import type { IChatbot, IConversation, IMessage } from '../models';
import { getNextId } from '../../utils/idCounter';

export class ChatbotService {
  /**
   * Crea un nuovo chatbot per un utente
   * TODO: Aggiungere validazione del numero massimo di chatbot per utente (plan-based)
   */
  async createChatbot(
    userId: string | Types.ObjectId,
    data: {
      name: string;
      welcomeMessage?: string;
      systemPrompt?: string;
      primaryColor?: string;
    }
  ): Promise<IChatbot> {
    const id = await getNextId('chatbots');

    const chatbot = new Chatbot({
      id, // ID numerico auto-incrementato
      ...data,
      userId: new Types.ObjectId(userId),
    });
    return await chatbot.save();
  }

  /**
   * Recupera tutti i chatbot di un utente
   * TODO: Implementare paginazione in futuro
   */
  async getChatbotsByUserId(userId: string | Types.ObjectId): Promise<IChatbot[]> {
    return await Chatbot.find({
      userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
  }

  /**
   * Recupera un chatbot specifico
   * TODO: Aggiungere check permessi (utente proprietario)
   */
  async getChatbotById(chatbotId: string | Types.ObjectId): Promise<IChatbot | null> {
    return await Chatbot.findById(chatbotId);
  }

  /**
   * Aggiorna un chatbot
   * TODO: Aggiungere validazione dei dati prima dell'update
   */
  async updateChatbot(
    chatbotId: string | Types.ObjectId,
    data: Partial<IChatbot>
  ): Promise<IChatbot | null> {
    return await Chatbot.findByIdAndUpdate(chatbotId, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Elimina un chatbot
   * TODO: Implementare soft delete per audit trail
   * TODO: Cascading delete delle conversations e messages
   */
  async deleteChatbot(chatbotId: string | Types.ObjectId): Promise<boolean> {
    const result = await Chatbot.findByIdAndDelete(chatbotId);
    return result !== null;
  }
}

export class ConversationService {
  /**
   * Crea una nuova conversazione
   * TODO: Aggiungere validazione chatbot exists
   */
  async createConversation(
    chatbotId: string | Types.ObjectId,
    visitorId?: string
  ): Promise<IConversation> {
    const id = await getNextId('conversations');

    const conversation = new Conversation({
      id, // ID numerico auto-incrementato
      chatbotId: new Types.ObjectId(chatbotId),
      visitorId,
    });
    return await conversation.save();
  }

  /**
   * Recupera tutte le conversazioni di un chatbot
   * TODO: Implementare paginazione con limit/offset
   * TODO: Aggiungere filtri per data, status
   */
  async getConversationsByChatbotId(
    chatbotId: string | Types.ObjectId
  ): Promise<IConversation[]> {
    return await Conversation.find({
      chatbotId: new Types.ObjectId(chatbotId),
    })
      .populate('chatbotId')
      .sort({ createdAt: -1 });
  }

  /**
   * Recupera una conversazione specifica
   */
  async getConversationById(
    conversationId: string | Types.ObjectId
  ): Promise<IConversation | null> {
    return await Conversation.findById(conversationId).populate('chatbotId');
  }

  /**
   * Elimina una conversazione
   * TODO: Cascading delete dei messages associati
   */
  async deleteConversation(conversationId: string | Types.ObjectId): Promise<boolean> {
    const result = await Conversation.findByIdAndDelete(conversationId);
    return result !== null;
  }
}

export class MessageService {
  /**
   * Aggiunge un messaggio a una conversazione
   * TODO: Aggiungere validazione conversation exists
   * TODO: Implementare token counting per tracking costi API
   */
  async createMessage(
    conversationId: string | Types.ObjectId,
    role: 'user' | 'assistant',
    content: string
  ): Promise<IMessage> {
    const id = await getNextId('messages');

    const message = new Message({
      id, // ID numerico auto-incrementato
      conversationId: new Types.ObjectId(conversationId),
      role,
      content,
    });
    return await message.save();
  }

  /**
   * Recupera tutti i messaggi di una conversazione
   * TODO: Implementare paginazione per conversazioni lunghe
   */
  async getMessagesByConversationId(
    conversationId: string | Types.ObjectId
  ): Promise<IMessage[]> {
    return await Message.find({
      conversationId: new Types.ObjectId(conversationId),
    }).sort({ createdAt: 1 });
  }

  /**
   * Recupera gli ultimi N messaggi (per context AI)
   * TODO: Implementare smart context window per ottimizzare tokens
   */
  async getLastMessages(
    conversationId: string | Types.ObjectId,
    limit: number = 10
  ): Promise<IMessage[]> {
    return await Message.find({
      conversationId: new Types.ObjectId(conversationId),
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec()
      .then((messages) => messages.reverse());
  }

  /**
   * Elimina un messaggio
   * TODO: Implementare soft delete per mantenere l'integrità storica
   */
  async deleteMessage(messageId: string | Types.ObjectId): Promise<boolean> {
    const result = await Message.findByIdAndDelete(messageId);
    return result !== null;
  }
}
