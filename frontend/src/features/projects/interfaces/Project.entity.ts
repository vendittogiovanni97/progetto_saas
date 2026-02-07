import { Category } from './Category.entity';
import { Account } from './Account.entity';
import { Chatbot } from './Chatbot.entity';

export enum ProjectStatus {
  ATTIVO = 'ATTIVO',
  DISATTIVATO = 'DISATTIVATO',
  ARCHIVIATO = 'ARCHIVIATO',
}

/**
 * Entity class per Project
 * Funge sia da interfaccia dati che da classe con logic helper
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
 * Project con relazioni (Chatbots, Category, Account)
 */
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
