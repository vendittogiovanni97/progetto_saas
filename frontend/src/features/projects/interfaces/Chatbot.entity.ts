import { ChatbotType, ChatbotTemplate, ChatbotPersonality } from '@/types/shared.types';

// ============================================
// ENTITY CLASSES
// ============================================

/**
 * Entity class per Chatbot
 * Rappresenta un chatbot con valori di default e costruttore flessibile
 */
export class Chatbot {
  id: number = 0;
  welcomeMessage: string = 'Ciao! Come posso aiutarti?';
  encodedPrompt: string | null = null;
  type: ChatbotType = ChatbotType.AI;
  template: ChatbotTemplate = ChatbotTemplate.GENERIC;
  personality: ChatbotPersonality = ChatbotPersonality.PROFESSIONALE;
  primaryColor: string = '#3b82f6';
  accountId: number = 0;
  projectId: number = 0;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(data?: Partial<Chatbot>) {
    if (data) {
      Object.assign(this, data);
      
      // Converti date se arrivano come stringhe
      if (data.createdAt && typeof data.createdAt === 'string') {
        this.createdAt = new Date(data.createdAt);
      }
      if (data.updatedAt && typeof data.updatedAt === 'string') {
        this.updatedAt = new Date(data.updatedAt);
      }
    }
  }

  /**
   * Verifica se il chatbot è di tipo AI
   */
  isAI(): boolean {
    return this.type === ChatbotType.AI;
  }

  /**
   * Ottiene la configurazione come oggetto
   */
  getConfig() {
    return {
      welcomeMessage: this.welcomeMessage,
      type: this.type,
      template: this.template,
      personality: this.personality,
      primaryColor: this.primaryColor,
      encodedPrompt: this.encodedPrompt,
    };
  }
}

/**
 * Chatbot con relazioni incluse (project, conversations)
 */
export class ChatbotWithRelations extends Chatbot {
  project?: any = null;
  conversations?: any[] = [];

  constructor(data?: Partial<ChatbotWithRelations>) {
    super(data);
    if (data) {
      this.project = data.project;
      this.conversations = data.conversations || [];
    }
  }
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

/**
 * DTO per aggiornare un chatbot
 */
export interface UpdateChatbotDTO {
  welcomeMessage?: string;
  encodedPrompt?: string | null;
  type?: ChatbotType;
  template?: ChatbotTemplate;
  personality?: ChatbotPersonality;
  primaryColor?: string;
}
