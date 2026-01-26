import { Request, Response } from 'express';
import { Chatbot, Conversation, Message } from '@prisma/client';
import {
  ChatbotService,
  ConversationService,
  MessageService,
} from '../services/chatbot.service';

// TODO: Aggiungere middleware di autenticazione per verificare ownership del chatbot
// TODO: Implementare proper error handling con status codes specifici

const chatbotService = new ChatbotService();
const conversationService = new ConversationService();
const messageService = new MessageService();

export class ChatbotController {
  /**
   * POST /chatbots
   * Crea un nuovo chatbot
   */
  static async createChatbot(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Validare req.user.id da token JWT
      const userId = req.user?.id || req.body.userId ;

      const { name, welcomeMessage, systemPrompt, primaryColor } = req.body;

      // TODO: Aggiungere validazione dei dati in input con Joi o Zod

      const chatbot = await chatbotService.createChatbot(userId, {
        name,
        welcomeMessage,
        systemPrompt,
        primaryColor,
      });

      res.status(201).json({
        success: true,
        data: chatbot,
      });
    } catch (error) {
      // TODO: Implementare logger strutturato
      res.status(500).json({
        success: false,
        message: 'Errore nella creazione del chatbot',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /chatbots
   * Recupera tutti i chatbot dell'utente
   */
  static async getUserChatbots(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id || req.query.userId;

      // TODO: Aggiungere paginazione
      const chatbots = await chatbotService.getChatbotsByUserId(userId);

      res.status(200).json({
        success: true,
        data: chatbots,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero dei chatbot',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /chatbots/:id
   * Recupera un chatbot specifico
   */
  static async getChatbot(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chatbotId = parseInt(id as string, 10);

      const chatbot = await chatbotService.getChatbotById(chatbotId);

      if (!chatbot) {
        res.status(404).json({
          success: false,
          message: 'Chatbot non trovato',
        });
        return;
      }

      // TODO: Verificare che l'utente sia il proprietario

      res.status(200).json({
        success: true,
        data: chatbot,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero del chatbot',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * PUT /chatbots/:id
   * Aggiorna un chatbot
   */
  static async updateChatbot(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chatbotId = parseInt(id as string, 10);
      const updateData = req.body;

      // TODO: Verificare che l'utente sia il proprietario
      // TODO: Aggiungere validazione dei dati

      const chatbot = await chatbotService.updateChatbot(chatbotId, updateData);

      if (!chatbot) {
        res.status(404).json({
          success: false,
          message: 'Chatbot non trovato',
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
        message: 'Errore nell\'aggiornamento del chatbot',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * DELETE /chatbots/:id
   * Elimina un chatbot
   */
  static async deleteChatbot(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chatbotId = parseInt(id as string, 10);

      // TODO: Verificare che l'utente sia il proprietario

      const success = await chatbotService.deleteChatbot(chatbotId);

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Chatbot non trovato',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Chatbot eliminato con successo',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nell\'eliminazione del chatbot',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export class ConversationController {
  /**
   * POST /chatbots/:chatbotId/conversations
   * Crea una nuova conversazione
   */
  static async createConversation(req: Request, res: Response): Promise<void> {
    try {
      const { chatbotId } = req.params;
      const chatbotIdNum = parseInt(chatbotId as string, 10);
      const { visitorId } = req.body;

      // TODO: Generare visitorId automaticamente se non fornito

      const conversation = await conversationService.createConversation(
        chatbotIdNum,
        visitorId
      );

      res.status(201).json({
        success: true,
        data: conversation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nella creazione della conversazione',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /chatbots/:chatbotId/conversations
   * Recupera tutte le conversazioni di un chatbot
   */
  static async getConversations(req: Request, res: Response): Promise<void> {
    try {
      const { chatbotId } = req.params;
      const chatbotIdNum = parseInt(chatbotId as string, 10);

      // TODO: Aggiungere paginazione da query params
      const conversations = await conversationService.getConversationsByChatbotId(
        chatbotIdNum
      );

      res.status(200).json({
        success: true,
        data: conversations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero delle conversazioni',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /conversations/:id
   * Recupera una conversazione specifica
   */
  static async getConversation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const conversationId = parseInt(id as string, 10);

      const conversation = await conversationService.getConversationById(conversationId);

      if (!conversation) {
        res.status(404).json({
          success: false,
          message: 'Conversazione non trovata',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: conversation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero della conversazione',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * DELETE /conversations/:id
   * Elimina una conversazione
   */
  static async deleteConversation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const conversationId = parseInt(id as string, 10);

      const success = await conversationService.deleteConversation(conversationId);

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Conversazione non trovata',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Conversazione eliminata con successo',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nell\'eliminazione della conversazione',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export class MessageController {
  /**
   * POST /conversations/:conversationId/messages
   * Aggiunge un messaggio a una conversazione
   */
  static async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { conversationId } = req.params;
      const conversationIdNum = parseInt(conversationId as string, 10);
      const { role, content } = req.body;

      // TODO: Validare che role sia 'user' o 'assistant'
      // TODO: Implementare integrazione con AI API per generare risposta

      const message = await messageService.createMessage(conversationIdNum, role, content);

      res.status(201).json({
        success: true,
        data: message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nell\'invio del messaggio',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /conversations/:conversationId/messages
   * Recupera tutti i messaggi di una conversazione
   */
  static async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { conversationId } = req.params;
      const conversationIdNum = parseInt(conversationId as string, 10);

      // TODO: Aggiungere paginazione
      const messages = await messageService.getMessagesByConversationId(conversationIdNum);

      res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero dei messaggi',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * DELETE /messages/:id
   * Elimina un messaggio
   */
  static async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const messageId = parseInt(id as string, 10);

      const success = await messageService.deleteMessage(messageId);

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Messaggio non trovato',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Messaggio eliminato con successo',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Errore nell\'eliminazione del messaggio',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
