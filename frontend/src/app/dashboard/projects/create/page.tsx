"use client";

import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { FormConfigurator } from "@/features/projects/components/FormConfigurator";

export default function CreateProjectPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>}>
      <FormConfigurator showHeader={true} padding={0} />
    </Suspense>
  );
}
