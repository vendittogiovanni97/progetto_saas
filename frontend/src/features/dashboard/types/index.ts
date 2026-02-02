import { ProjectStatus } from "../../projects/types/types";

export interface Stat {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "error" | "info" | "warning";
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
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
