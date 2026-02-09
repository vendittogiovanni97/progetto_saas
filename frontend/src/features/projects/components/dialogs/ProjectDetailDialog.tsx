import { Box } from "@mui/material";
import { EntityFormModal } from "@/components/modal/ModalGeneric";
import { ActionMode } from "@/types/modal";
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
  const renderForm = () => (
    <Box sx={{ width: "100%" }}>
      <CardContentRenderer cardId={selectedCardId} />
    </Box>
  );

  const title = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
      <DynamicIcon name={selectedCard?.icon || "folder"} sx={{ color: "primary.main" }} />
      {selectedCard?.title}
    </Box>
  );

  return (
    <EntityFormModal
      open={open}
      onClose={onClose}
      action={ActionMode.READ}
      onSave={() => {}} // Non necessario in READ mode
      renderForm={renderForm}
      maxWidth="sm"
      texts={{
        titleRead: title as any,
        cancelButtonLabel: "CLOSE_CONTROL"
      }}
    />
  );
}

