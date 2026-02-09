import { ProjectStatus } from "@/features/projects/interfaces/Project.entity";

/**
 * Utility per ottenere il colore associato allo stato di un progetto
 */
export const getStatusColor = (status: ProjectStatus): "success" | "warning" | "error" | "default" => {
  switch (status) {
    case 'ATTIVO': return 'success';
    case 'DISATTIVATO': return 'warning';
    case 'ARCHIVIATO': return 'error';
    default: return 'default';
  }
};

/**
 * Utility per ottenere il colore associato alla categoria di un progetto
 */
export const getTypeColor = (categoryId: number): "primary" | "success" | "warning" | "error" => {
  switch (categoryId) {
    case 1: return 'primary';
    case 2: return 'success';
    default: return 'primary';
  }
};
