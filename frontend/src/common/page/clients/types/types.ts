export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: "active" | "pending" | "inactive";
  plan: "basic" | "professional" | "enterprise";
  createdAt: string;
  lastContact?: string;
  projects: number;
  revenue: number;
}

export interface ClientsFilter {
  search?: string;
  status?: Client["status"] | "all";
  plan?: Client["plan"] | "all";
}

export interface ClientFormData {
  name: string;
  email: string;
  company: string;
  plan: Client["plan"];
}
