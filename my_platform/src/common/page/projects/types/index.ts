/**
 * Tipi per la pagina Projects
 */

export type ProjectStatus = "Active" | "Paused" | "Pending" | "Error";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  statusColor: "success" | "warning" | "default" | "error";
  progress: number;
  time: string;
}

export interface ProjectFormData {
  name: string;
  status: ProjectStatus;
  progress: number;
}

/**
 * Tipi per la pagina Project Detail (Legacy name: ProjectCard)
 */

export interface ProjectCard {
  id: string;
  title: string;
  status: string;
  icon: string;
  img: string;
  isActive?: boolean;
  isError?: boolean;
}

export interface Service {
  name: string;
  status: string;
  icon: string;
  cpu?: string;
  mem?: string;
  keys?: string;
  hit?: string;
  reqs?: string;
  lat?: string;
  uptime?: string;
}

export interface Domain {
  name: string;
  status: string;
  sslStatus?: string;
}

export interface ProjectUser {
  name: string;
  role: string;
}

export interface ProjectConfig {
  runtimeEnvironment: string;
  memoryLimit: string;
}

export type TabValue = 0 | 1 | 2 | 3;

export interface UseProjectPageReturn {
  activeTab: TabValue;
  selectedCardId: string | null;
  selectedCard: ProjectCard | undefined;
  handleTabChange: (event: React.SyntheticEvent, newValue: TabValue) => void;
  handleCardSelect: (cardId: string) => void;
  handleCardDeselect: () => void;
}
