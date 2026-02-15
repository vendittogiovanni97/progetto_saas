"use client";

import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ProjectConfigurator } from "@/features/projects/components/ProjectConfigurator";

export default function CreateProjectPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>}>
      <ProjectConfigurator showHeader={true} padding={0} />
    </Suspense>
  );
}
