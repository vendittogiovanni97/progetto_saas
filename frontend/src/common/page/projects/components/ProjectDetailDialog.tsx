/**
 * Dialog per mostrare i dettagli di una card selezionata
 */

import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ModalGeneric } from "@/common/components/modal/ModalGeneric";
import { ProjectCard } from "../types";
import { CardContentRenderer } from "./CardContentRenderer";

interface ProjectDetailDialogProps {
  open: boolean;
  selectedCard: ProjectCard | undefined;
  selectedCardId: string | null;
  onClose: () => void;
}

export function ProjectDetailDialog({ open, selectedCard, selectedCardId, onClose }: ProjectDetailDialogProps) {
  const theme = useTheme();

  const title = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
      <Box component="span" className="material-symbols-outlined" sx={{ color: "primary.main" }}>
        {selectedCard?.icon}
      </Box>
      {selectedCard?.title}
    </Box>
  );

  const content = (
    <Box sx={{ borderColor: theme.palette.divider }}>
      <CardContentRenderer cardId={selectedCardId} />
    </Box>
  );

  const actions = (
    <>
      <Button
        onClick={onClose}
        variant="outlined"
        size="small"
        sx={{ color: "text.secondary", borderColor: theme.palette.divider }}
      >
        Close
      </Button>
      <Button variant="contained" size="small" onClick={onClose}>
        Manage {selectedCard?.title}
      </Button>
    </>
  );

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={title}
      content={content}
      actions={actions}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          backgroundImage: "none",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        },
      }}
    />
  );
}

