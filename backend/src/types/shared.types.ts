/**
 * SHARED TYPES - Backend & Frontend
 * Questo file definisce i tipi condivisi tra backend e frontend
 * IMPORTANTE: Mantenere sincronizzato con il frontend
 */

// ============================================
// ENUMS
// ============================================

export enum ProjectType {
  CHATBOT = 'CHATBOT',
  FORM = 'FORM',
  WORKFLOW = 'WORKFLOW',
  API = 'API',
}

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

// ============================================
// PROJECT TYPES
// ============================================

/**
 * Configurazione base per un progetto
 * Il contenuto varia in base al ProjectType
 */
export type ProjectConfig = Record<string, any>;

/**
 * Configurazione specifica per progetti CHATBOT
 */
export interface ChatbotProjectConfig {
  welcomeMessage: string;
  type: ChatbotType;
  template: ChatbotTemplate;
  personality: ChatbotPersonality;
  primaryColor: string;
  encodedPrompt?: string | null;
}

/**
 * Entità Project dal database
 */
export interface Project {
  id: number;
  name: string;
  description: string | null;
  type: ProjectType;
  config: string | null; // JSON stringificato
  accountId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Project con relazioni incluse
 */
export interface ProjectWithRelations extends Project {
  chatbot?: Chatbot | null;
  account?: {
    id: number;
    email: string;
  };
}

/**
 * DTO per creare un nuovo progetto
 */
export interface CreateProjectDTO {
  name: string;
  description?: string;
  type: ProjectType;
  accountId: number;
  config?: ProjectConfig;
}

/**
 * DTO per aggiornare un progetto
 */
export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  config?: ProjectConfig;
}

// ============================================
// CHATBOT TYPES
// ============================================

/**
 * Entità Chatbot dal database
 */
export interface Chatbot {
  id: number;
  welcomeMessage: string;
  encodedPrompt: string | null;
  type: ChatbotType;
  template: ChatbotTemplate;
  personality: ChatbotPersonality;
  primaryColor: string;
  accountId: number;
  projectId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Chatbot con relazioni incluse
 */
export interface ChatbotWithRelations extends Chatbot {
  project?: Project;
  conversations?: Conversation[];
}

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

// ============================================
// CONVERSATION & MESSAGE TYPES
// ============================================

/**
 * Entità Conversation dal database
 */
export interface Conversation {
  id: number;
  visitorId: string;
  chatbotId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Conversation con relazioni
 */
export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

/**
 * Entità Message dal database
 */
export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  conversationId: number;
  createdAt: Date | string;
}

/**
 * DTO per inviare un messaggio
 */
export interface SendMessageDTO {
  chatbotId: number;
  visitorId: string;
  message: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Risposta API standard
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Risposta paginata
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
