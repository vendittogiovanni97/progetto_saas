import { Conversation } from './Conversation.entity';

export enum ChatbotType {
  DEFAULT = 'DEFAULT',
  AI = 'AI',
}

export enum ChatbotTemplate {
  GENERIC = 'GENERIC',
  CUSTOM = 'CUSTOM',
}

export enum ChatbotPersonality {
  AMICHEVOLE = 'AMICHEVOLE',
  PROFESSIONALE = 'PROFESSIONALE',
  ESPERTO = 'ESPERTO',
  DETTAGLIATO = 'DETTAGLIATO',
  TECNICO = 'TECNICO',
  DIVERTENTE = 'DIVERTENTE',
}

/**
 * Entity class per Chatbot
 * Riflette il modello Prisma "thin"
 */
export class Chatbot {
  id: number = 0;
  name: string | null = null;
  projectId: number = 0;
  createdAt: string | Date = new Date();
  updatedAt: string | Date = new Date();

  constructor(data?: Partial<Chatbot>) {
    if (data) {
      Object.assign(this, data);
      
      if (data.createdAt && typeof data.createdAt === 'string') this.createdAt = new Date(data.createdAt);
      if (data.updatedAt && typeof data.updatedAt === 'string') this.updatedAt = new Date(data.updatedAt);
    }
  }
}

/**
 * Chatbot con relazioni (Project, Conversations)
 */
export class ChatbotWithRelations extends Chatbot {
  project?: any; // Usiamo any per evitare circular dependency con Project
  conversations?: Conversation[] = [];

  constructor(data?: Partial<ChatbotWithRelations>) {
    super(data);
    if (data) {
      this.project = data.project;
      this.conversations = data.conversations || [];
    }
  }
}

// ============================================
// DTOs
// ============================================

export interface UpdateChatbotDTO {
  name?: string | null;
}


