/**
 * Tipi per la pagina Clients Management
 */

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: "active" | "inactive" | "pending";
  plan: "basic" | "professional" | "enterprise";
  createdAt: string;
  lastContact?: string;
  projects: number;
  revenue?: number;
}

export interface ClientFormData {
  name: string;
  email: string;
  company?: string;
  plan: "basic" | "professional" | "enterprise";
}

export interface ClientsFilter {
  search?: string;
  status?: Client["status"];
  plan?: Client["plan"];
}

