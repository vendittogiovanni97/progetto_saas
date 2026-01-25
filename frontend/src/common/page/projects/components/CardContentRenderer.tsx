/**
 * Componente per renderizzare il contenuto delle card nel dialog
 */

import { Box, Typography, List, ListItem, ListItemText, Chip, Button, Divider } from "@mui/material";

import { ProjectLogViewer } from "./ProjectLogViewer";
import { ProjectEnvVariables } from "./ProjectEnvVariables";
import { ProjectDeploymentTimeline } from "./ProjectDeploymentTimeline";

interface CardContentRendererProps {
  cardId: string | null;
}

export function CardContentRenderer({ cardId }: CardContentRendererProps) {
  switch (cardId) {
    case "domains":
      return (
        <List>
          {["orbital.io", "api.orbital.io", "assets.orbital.io"].map((domain) => (
            <ListItem key={domain} sx={{ px: 0 }}>
              <ListItemText 
                primary={<Typography variant="subtitle2">{domain}</Typography>} 
                secondary="Active Proxy" 
              />
              <Chip label="SSL OK" color="success" size="small" variant="outlined" />
            </ListItem>
          ))}
        </List>
      );
    case "config":
      return <ProjectEnvVariables />;
    case "access":
      return (
        <List>
          {[
            { name: "John Doe", role: "Admin" },
            { name: "Jane Smith", role: "Editor" },
            { name: "Admin Bot", role: "System" },
          ].map((user) => (
            <ListItem key={user.name} sx={{ px: 0 }}>
              <ListItemText primary={user.name} secondary={user.role} />
            </ListItem>
          ))}
        </List>
      );
    case "logs":
      return <ProjectLogViewer />;
    case "deploy":
      return <ProjectDeploymentTimeline />;
    default:
      return (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            Informazioni dettagliate per {cardId} non disponibili.
          </Typography>
        </Box>
      );
  }
}

