/**
 * Dialog per mostrare i dettagli di una card selezionata
 */

import { Box } from "@mui/material";
import { ButtonGeneric } from "@/components/ui/button";
import { useTheme } from "@mui/material/styles";
import { ModalGeneric } from "@/components/ui/modal";
import { ProjectCard } from "../../types/types";
import { CardContentRenderer } from "../details/CardContentRenderer";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

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
      <DynamicIcon name={selectedCard?.icon || "folder"} sx={{ color: "primary.main" }} />
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
      <ButtonGeneric.Secondary onClick={onClose} label="CLOSE_CONTROL" />
      <ButtonGeneric.Primary variant="contained" size="small" onClick={onClose}>
        Manage {selectedCard?.title}
      </ButtonGeneric.Primary>
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
    />
  );
}

