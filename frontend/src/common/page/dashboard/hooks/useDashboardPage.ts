/**
 * Hook custom per gestire lo stato della pagina Dashboard
 */

import { useRouter } from "next/navigation";

export function useDashboardPage() {
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  const handleRefresh = () => {
    // TODO: Implementare refresh dati
    window.location.reload();
  };

  const handleNewProject = () => {
    // TODO: Implementare creazione nuovo progetto
    console.log("Init new project");
  };

  return {
    handleProjectClick,
    handleRefresh,
    handleNewProject,
  };
}

