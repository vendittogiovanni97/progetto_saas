import { ProjectType } from '@/types/shared.types';


/**
 * Entity class per Project
 * Rappresenta un progetto con valori di default e costruttore flessibile
 */
export class Project {
  id: number = 0;
  name: string = '';
  description: string | null = null;
  type: ProjectType = ProjectType.CHATBOT;
  config: string | null = null; // JSON stringificato
  accountId: number = 0;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(data?: Partial<Project>) {
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
   * Ottiene la configurazione parsata come oggetto
   */
  getParsedConfig<T = any>(): T | null {
    if (!this.config) return null;
    try {
      return JSON.parse(this.config) as T;
    } catch {
      return null;
    }
  }

  /**
   * Imposta la configurazione da un oggetto
   */
  setConfig(config: any): void {
    this.config = JSON.stringify(config);
  }
}

/**
 * Project con relazioni incluse (chatbot, account)
 */
export class ProjectWithRelations extends Project {
  chatbot?: any = null;
  account?: {
    id: number;
    email: string;
  } = undefined;

  constructor(data?: Partial<ProjectWithRelations>) {
    super(data);
    if (data) {
      this.chatbot = data.chatbot;
      this.account = data.account;
    }
  }
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

/**
 * DTO per creare un nuovo progetto
 */
export interface CreateProjectDTO {
  name: string;
  description?: string;
  type: ProjectType;
  accountId: number;
  config?: Record<string, any>;
}

/**
 * DTO per aggiornare un progetto
 */
export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  config?: Record<string, any>;
}

/**
 * DTO per la risposta API
 */
export interface ProjectResponse {
  id: number;
  name: string;
  description: string | null;
  type: ProjectType;
  config: string | null;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  chatbot?: any;
  account?: {
    id: number;
    email: string;
  };
}
