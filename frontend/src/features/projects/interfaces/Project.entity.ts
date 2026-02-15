// ============================================
// Enums
// ============================================

export enum ProjectStatus {
  ATTIVO = 'ATTIVO',
  DISATTIVATO = 'DISATTIVATO',
  ARCHIVIATO = 'ARCHIVIATO',
}

export enum ChatbotType {
  DEFAULT = 'DEFAULT',
  AI = 'AI',
  RULE_BASED = 'RULE_BASED',
  HYBRID = 'HYBRID',
}

export enum ChatbotTemplate {
  GENERIC = 'GENERIC',
  CUSTOM = 'CUSTOM',
  ECOMMERCE = 'ECOMMERCE',
  SUPPORT = 'SUPPORT',
  BOOKING = 'BOOKING',
  FAQ = 'FAQ',
}

export enum ChatbotPersonality {
  AMICHEVOLE = 'AMICHEVOLE',
  PROFESSIONALE = 'PROFESSIONALE',
  ESPERTO = 'ESPERTO',
  DETTAGLIATO = 'DETTAGLIATO',
  TECNICO = 'TECNICO',
  DIVERTENTE = 'DIVERTENTE',
}

export enum ChatbotLanguage {
  IT = 'IT',
  EN = 'EN',
  FR = 'FR',
  DE = 'DE',
  ES = 'ES',
}

export enum ChatbotPosition {
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  CENTER = 'CENTER',
}

// ============================================
// Interfaces & Entities
// ============================================

export interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string | null;
  color?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Account {
  id: number;
  email: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Message {
  id: number;
  conversationId: number;
  role: string; // 'user' | 'assistant'
  content: string;
  createdAt: string | Date;
}

export interface Conversation {
  id: number;
  chatbotId: number;
  visitorId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  messages?: Message[];
}

/**
 * Entity class per Project
 */
export class Project {
  id: number = 0;
  name: string = '';
  status: ProjectStatus = ProjectStatus.ATTIVO;
  categoryId: number = 0;
  structure: string | null = null;
  accountId: number = 0;
  createdAt: Date | string = new Date();
  updatedAt: Date | string = new Date();

  constructor(data?: Partial<Project>) {
    if (data) {
      Object.assign(this, data);
      if (data.createdAt && typeof data.createdAt === 'string') this.createdAt = new Date(data.createdAt);
      if (data.updatedAt && typeof data.updatedAt === 'string') this.updatedAt = new Date(data.updatedAt);
    }
  }

  getParsedStructure<T = any>(): T | null {
    if (!this.structure) return null;
    try {
      return JSON.parse(this.structure) as T;
    } catch {
      return null;
    }
  }

  setStructure(data: any): void {
    this.structure = JSON.stringify(data);
  }
}

/**
 * Entity class per Chatbot
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
 * Relational Entities
 */
export class ChatbotWithRelations extends Chatbot {
  project?: Project;
  conversations?: Conversation[] = [];

  constructor(data?: Partial<ChatbotWithRelations>) {
    super(data);
    if (data) {
      this.project = data.project;
      this.conversations = data.conversations || [];
    }
  }
}

export class ProjectWithRelations extends Project {
  chatbots: Chatbot[] = [];
  category?: Category;
  account?: Partial<Account>;

  constructor(data?: Partial<ProjectWithRelations>) {
    super(data);
    if (data) {
      this.chatbots = data.chatbots || [];
      this.category = data.category;
      this.account = data.account;
    }
  }
}

// ============================================
// DTOs
// ============================================

export interface CreateProjectDTO {
  name: string;
  categoryId: number;
  accountId: number;
  structure?: Record<string, any>;
}

export interface UpdateProjectDTO {
  name?: string;
  status?: ProjectStatus;
  structure?: Record<string, any>;
}

export interface UpdateChatbotDTO {
  name?: string | null;
}
