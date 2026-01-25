"use client";

import { Box } from "@mui/material";
import { useDashboardPage } from "./hooks/useDashboardPage";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsGrid } from "./components/StatsGrid";
import { ProjectsTable } from "./components/ProjectsTable";
import { ComponentRepository } from "./components/ComponentRepository";
import { SystemLog } from "./components/SystemLog";
import { stats, projects, componentLibrary, systemLogs } from "./services/mockData";

export function DashboardPage() {
  const { handleProjectClick, handleRefresh, handleNewProject } = useDashboardPage();

  return (
    <Box sx={{ display: "flex", gap: 4, height: "100%" }}>
      {/* Left Column: Main Dashboard */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <DashboardHeader onRefresh={handleRefresh} onNewProject={handleNewProject} />

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

