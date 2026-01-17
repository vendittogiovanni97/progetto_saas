/**
 * Componente per renderizzare il contenuto delle card nel dialog
 */

import { Box, Typography, List, ListItem, ListItemText, Chip, Button, Divider } from "@mui/material";

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
              <ListItemText primary={domain} secondary="Active Proxy" />
              <Chip label="SSL OK" color="success" size="small" variant="outlined" />
            </ListItem>
          ))}
        </List>
      );
    case "config":
      return (
        <Box sx={{ py: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Runtime Environment: Node.js 20.x
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Memory Limit: 1024MB
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button variant="outlined" size="small">
            Edit Configuration
          </Button>
        </Box>
      );
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
      return (
        <Box
          sx={{
            bgcolor: "black",
            p: 2,
            borderRadius: 1,
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "success.main",
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <div>[10:42:00] INITIALIZING DEPLOYMENT...</div>
          <div>[10:42:05] FETCHING REPOSITORY...</div>
          <div style={{ color: "red" }}>[10:42:10] ERR: CONNECTION RESET BY PEER</div>
          <div>[10:42:11] RETRYING (1/3)...</div>
        </Box>
      );
    default:
      return <Typography color="text.secondary">Detailed information for {cardId} will be displayed here.</Typography>;
  }
}

