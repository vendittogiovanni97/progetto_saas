/**
 * Feature-specific types for Projects
 */

export type TabValue = number;

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
