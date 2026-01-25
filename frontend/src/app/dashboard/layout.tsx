import IndustrialSidebar from "@/common/components/layout/IndustrialSidebar";
import IndustrialHeader from "@/common/components/layout/IndustrialHeader";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { SidebarProvider } from "@/providers/SidebarProvider";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <IndustrialSidebar />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <IndustrialHeader />
          <Box component="main" sx={{ flex: 1, overflow: 'auto', p: { xs: 3, sm: 4 } }}>
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
}