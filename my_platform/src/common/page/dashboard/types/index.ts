/**
 * Tipi per la pagina Dashboard
 */

export interface Stat {
  label: string;
  value: string;
  isPrimary?: boolean;
  isSuccess?: boolean;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  statusColor: "success" | "warning" | "default" | "error";
  progress: number;
  time: string;
}

export interface ComponentLibraryItem {
  icon: string;
  title: string;
  desc: string;
}

export interface SystemLog {
  text: string;
  time: string;
  isPrimary?: boolean;
  isWarning?: boolean;
}

