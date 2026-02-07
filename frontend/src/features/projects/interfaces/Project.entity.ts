export type ProjectStatus = 'ATTIVO' | 'DISATTIVATO' | 'ARCHIVIATO';

/**
 * Entity class per Project
 * Rappresenta un progetto con valori di default e costruttore flessibile
 */
export class Project {
  id: number = 0;
  name: string = '';
  status: ProjectStatus = 'ATTIVO';
  categoryId: number = 0;
  structure: string | null = null; // JSON stringificato
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
   * Ottiene la struttura parsata come oggetto
   */
  getParsedStructure<T = any>(): T | null {
    if (!this.structure) return null;
    try {
      return JSON.parse(this.structure) as T;
    } catch {
      return null;
    }
  }

  /**
   * Imposta la struttura da un oggetto
   */
  setStructure(data: any): void {
    this.structure = JSON.stringify(data);
  }
}

/**
 * Project con relazioni incluse (chatbots, account, category)
 */
export class ProjectWithRelations extends Project {
  chatbots: any[] = [];
  category?: any = null;
  account?: {
    id: number;
    email: string;
  } = undefined;

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
// DTOs (Data Transfer Objects)
// ============================================

/**
 * DTO per creare un nuovo progetto
 */
export interface CreateProjectDTO {
  name: string;
  categoryId: number;
  accountId: number;
  structure?: Record<string, any>;
}

/**
 * DTO per aggiornare un progetto
 */
export interface UpdateProjectDTO {
  name?: string;
  status?: ProjectStatus;
  structure?: Record<string, any>;
}

/**
 * DTO per la risposta API
 */
export interface ProjectResponse {
  id: number;
  name: string;
  status: ProjectStatus;
  categoryId: number;
  structure: string | null;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  chatbots?: any[];
  category?: any;
  account?: {
    id: number;
    email: string;
  };
}
