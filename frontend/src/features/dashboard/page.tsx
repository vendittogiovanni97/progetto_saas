"use client";

import { Box, Typography } from "@mui/material";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { StatsGrid } from "./components/StatsGrid";
import { ComponentRepository } from "./components/ComponentRepository";
import { SystemLog } from "./components/SystemLog";
import { stats, componentLibrary, systemLogs } from "./services/mockData";
import { useRouter } from "next/navigation";
// import { projects } from "../projects/types/projectMocks";
const projects: any[] = [];

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

        {/* <ProjectsTable projects={projects} onProjectClick={handleProjectClick} /> */}
        <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
           <Typography color="text.secondary">No projects to display</Typography>
        </Box>
      </Box>

      {/* Right Column: Library & Log */}
      <Box sx={{ width: 320, display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
        <ComponentRepository items={componentLibrary} />

        <SystemLog logs={systemLogs} />
      </Box>
    </Box>
  );
}

