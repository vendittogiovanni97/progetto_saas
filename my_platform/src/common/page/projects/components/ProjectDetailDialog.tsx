/**
 * Dialog per mostrare i dettagli di una card selezionata
 */

import { Box, Button } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { UiDialog, UiDialogTitle, UiDialogContent, UiDialogActions } from "@/common/components/ui-mui/UiDialog";
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

  return (
    <UiDialog
      open={open}
      onClose={onClose}
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
    >
      <UiDialogTitle
        sx={{
          pb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 700,
        }}
      >
        <Box component="span" className="material-symbols-outlined" sx={{ color: "primary.main" }}>
          {selectedCard?.icon}
        </Box>
        {selectedCard?.title}
      </UiDialogTitle>
      <UiDialogContent dividers sx={{ borderColor: theme.palette.divider }}>
        <CardContentRenderer cardId={selectedCardId} />
      </UiDialogContent>
      <UiDialogActions sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
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
      </UiDialogActions>
    </UiDialog>
  );
}

