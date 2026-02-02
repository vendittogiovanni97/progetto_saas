export type TabValue = number;
export type ProjectStatus = "Active" | "Paused" | "Pending" | "Error";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  statusColor: "success" | "warning" | "default" | "error";
  progress: number;
  time: string;
}

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
  cpu?: string;
  mem?: string;
  keys?: string;
  hit?: string;
  uptime?: string;
  reqs?: string;
  lat?: string;
  icon: string;
}

export interface ProjectFormData {
  name: string;
  status: ProjectStatus;
  progress: number;
}
