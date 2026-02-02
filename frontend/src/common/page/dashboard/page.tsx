"use client";

import { Box } from "@mui/material";
import { PageHeaderGeneric } from "@/common/components/header/PageHeaderGeneric";
import { StatsGrid } from "./components/StatsGrid";
import { ProjectsTable } from "./components/ProjectsTable";
import { ComponentRepository } from "./components/ComponentRepository";
import { SystemLog } from "./components/SystemLog";
import { stats, projects, componentLibrary, systemLogs } from "./services/mockData";
import { useRouter } from "next/navigation";

export function DashboardPage() {
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <Box sx={{ display: "flex", gap: 4, height: "100%" }}>
      {/* Left Column: Main Dashboard */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <PageHeaderGeneric title="Control Center // v.3.0" subtitle="OVERVIEW OF ACTIVE OPERATIONS AND RESOURCES" />

        <StatsGrid stats={stats} />

        <ProjectsTable projects={projects} onProjectClick={handleProjectClick} />
      </Box>

      {/* Right Column: Library & Log */}
      <Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
        <ComponentRepository items={componentLibrary} />

        <SystemLog logs={systemLogs} />
      </Box>
    </Box>
  );
}

