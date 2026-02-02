/**
 * Componente Tabs per la navigazione delle sezioni del progetto
 */

import { Box, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TabValue } from "../../types/types";

interface ProjectTabsProps {
  activeTab: TabValue;
  onChange: (event: React.SyntheticEvent, newValue: TabValue) => void;
}

export function ProjectTabs({ activeTab, onChange }: ProjectTabsProps) {
  const theme = useTheme();

  return (
    <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={onChange}
        sx={{
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: "3px 3px 0 0",
          },
          "& .MuiTab-root": {
            textTransform: "uppercase",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            minWidth: 100,
            color: "text.secondary",
            "&.Mui-selected": {
              color: "primary.main",
            },
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Settings" />
        <Tab label="Deployments" />
        <Tab label="Analytics" />
      </Tabs>
    </Box>
  );
}

